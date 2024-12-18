
const RecipeModel = require('../models/recipeData')
const Wishlist = require('../models/wishlistData');
const axios = require('axios');
//for admin
// add recipe
const addRecipe = async (req, res) => {
    try {
      const recipeData = req.body;
      // Validate required fields
      if (
        !recipeData.title ||
        !recipeData.category ||
        !recipeData.descriptions ||
        !recipeData.instructions ||
        !recipeData.ingredients ||
        !recipeData.readyInMinutes ||
        !recipeData.servings
      ) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Create and save the recipe
      const newRecipe = new RecipeModel(recipeData);
      await newRecipe.save();
      res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
    } catch (error) {
      res.status(500).json({ error: 'Error adding recipe' });
    }
  }

//for admin
// edit a recipe
const editRecipe = async(req, res) => {
  try {
    const requestData = req.body;
    const id = req.params.id;
    const recipe = await RecipeModel.findById(id);
    if(!recipe) {
      return res.status(403).send({message:"Recipe does not exist"});
    } 
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, requestData);
    res.status(200).send({message:"Recipe successfully updated"});
  }catch (err) {
    res.status(404).send({message:"error in updation"});
  }
  }

//admin, user
// get all recipies

const listRecipies = async (req, res) => {
  try {
      const recipes = await RecipeModel.find();
      const recipeFromApi = await axios.get(`https://api.spoonacular.com/recipes/random`,{
      
        params: {
          number:2,
          apiKey: process.env.SPOONACULAR_API_KEY
        },
    });
    // Normalize the DB recipes (MongoDB _id to id)
    const normalizedDbRecipes = recipes.map(recipe => ({
      id: recipe._id.toString(),  // Ensure the _id is converted to `id`
      ...recipe.toObject(),  // Spread the rest of the fields
    }));
    normalizedDbRecipes.push(...recipeFromApi.data.recipes);
      res.status(200).send({message:"successfull", recipes:normalizedDbRecipes });
  }catch(err) {
    console.log(err)
      res.status(404).send({message:"Error in getting recipies"});
  }
}


// get recipies by id 

const getRecipeById = async(req, res) => {
  try {
      const id = req.params.id;
      let recipe, response, relatedRecipes;
        // MongoDB ObjectId: 24-character hexadecimal string
      if(!/^[a-fA-F0-9]{24}$/.test(id)) {// Checks if it's a valid MongoDB ObjectId
          response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{
      
          params: {
            apiKey: process.env.SPOONACULAR_API_KEY
          },
      });
      recipe = response.data;
      }else{
         recipe = await RecipeModel.findById(id);
         // Find other related recipes in the same category
         console.log(recipe)
         relatedRecipes = await RecipeModel.find({
          category: recipe.category,  // Same category as the current recipe
          _id: { $ne: id }      // Exclude the current recipe
        }).limit(5);  // Limit to 5 related recipes
        }
        // recipe['relatedRecipies'] = relatedRecipes ;
        // console.log(relatedRecipes);
        Object.assign(recipe, { relatedRecipes: relatedRecipes});
      if(!recipe) {
        return res.status(403).send({message:"Recipe does not exist"});
      }
       
      res.status(200).send({message:"successfull", recipeData:{recipe,relatedRecipes}});
  }catch(err) {
      res.status(404).send({message:"error in getting recipe details"});
  }
}


// get recipies by incredients
//???get recipies closer to avaibale ingredients
const getRecipeByIngredients = async (req, res) => {
    const { ingredients } = req.query; // Array of ingredient names
    
    try {
     
      const recipes = await RecipeModel.aggregate([
        {
          // Match recipes where the ingredients array contains at least one of the input ingredients
          $match: {
            ingredients: {
              $elemMatch: {
                name: { $in: ingredients }
              }
            }
          }
        },
        {
          // Project to include the list of matched ingredients and calculate missed ingredients
          $project: {
            title: 1,
            ingredients: 1,
            image:1,
            usedIngredients: {
              $filter: {
                input: "$ingredients",
                as: "ingredient",
                cond: { $in: ["$$ingredient.name", ingredients] }
              }
            },
            missedIngredients: {
              $let: {
                vars: {
                  inputIngredientsArray: ingredients, // Pass the input ingredients here
                  recipeIngredientsArray: {
                    $map: {
                      input: "$ingredients",
                      as: "ingredient",
                      in: "$$ingredient.name" // Extract only ingredient names
                    }
                  }
                },
                in: {
                  // Check if the arrays are not empty before applying $setDifference
                  $cond: {
                    if: {
                      $or: [
                        { $eq: [{ $size: "$$inputIngredientsArray" }, 0] }, // Check if inputIngredientsArray is empty
                        { $eq: [{ $size: "$$recipeIngredientsArray" }, 0] } // Check if recipeIngredientsArray is empty
                      ]
                    },
                    then: "Empty Ingredients Array", // Return a message if either array is empty
                    else: {
                      $setDifference: [
                        "$$recipeIngredientsArray", // Ingredients from the recipe
                        "$$inputIngredientsArray", // User-provided ingredients
                      ]
                    }
                  }
                }
              }
            },
            unusedIngredients: {
              $let: {
                vars: {
                  inputIngredientsArray: ingredients, // User-provided ingredients
                  recipeIngredientsArray: {
                    $map: {
                      input: "$ingredients",
                      as: "ingredient",
                      in: "$$ingredient.name" // Extract names of ingredients
                    }
                  }
                },
                in: {
                  // Calculate unused ingredients (ingredients provided by user but not in the recipe)
                  $setDifference: [
                    "$$inputIngredientsArray", // User-provided ingredients
                    "$$recipeIngredientsArray" // Ingredients in the recipe
                  ]
                }
              }
          }
        }
        }
      ]);
      // Convert the array to a comma-separated string
      const ingredients_ = ingredients.join(',');
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredients_,
            number: 4, // Number of recipes to return
            apiKey: process.env.SPOONACULAR_API_KEY,
          },
        }
      );
      const recipeFromAPI = response.data;
      recipes.push(...recipeFromAPI);
      res.json({ message:'successfull', recipes });
    } catch (error) {
      res.status(500).json({ error: 'Error searching for recipes' });
    }
  }


// get recipies by category 

const getRecipeByCategory = async(req, res) => {
  try {
      const category = req.query.category;
      const recipeDetails = await RecipeModel.find({category :{ $elemMatch: { $regex: new RegExp('^' + category + '$', 'i') }}});
      // const recipesFromApi = await axios.get(
      //   `https://api.spoonacular.com/recipes/complexSearch/`,
      //   {
      //     params: {
      //       type:category,
      //       addRecipeInformation:true,
      //       number: 5, // Number of recipes to return
      //       apiKey: process.env.SPOONACULAR_API_KEY,
      //     },
      //   }
      // );
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"});
      }
      // recipeDetails.push(...recipesFromApi.data.results);
      res.status(200).send({message:"successfull", recipeDetails });
  }catch(err) {
    console.log(err)
      res.status(404).send({message:"error in getting recipies"});
  }
}

// get popular recipies

const getRecipesPopular = async(req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId)
      if(userId){
          let recipeDetails = await RecipeModel.find({veryPopular : true});
          if(!recipeDetails) {
            return res.status(403).send({message:"No recipies available"});
          }
          // For each recipe, check if it is liked by the user
          const recipesWithLikeStatus = await Promise.all(
            recipeDetails.map(async (recipe) => {
                // Check if the recipe is in the wishlist
                console.log(recipe)
                const isLiked = await Wishlist.exists({ userId, savedRecipies: { $elemMatch: { recipeId: recipe._id } } });// Match recipeId in the array of objects
                return {
                    ...recipe.toObject(),
                    isLiked: !!isLiked, // Add a boolean flag to show if it's liked
                };
            })
        );
          recipeDetails = recipesWithLikeStatus;
          console.log(recipeDetails)
          return res.status(200).send({message:"successfull", recipeDetails});
  }else{
      const recipeDetails = await RecipeModel.find({veryPopular : true});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"});
      }
      return res.status(200).send({message:"successfull", recipeDetails});
  }
  }catch(err) {
    console.log(err)
      res.status(404).send({message:"error in getting recipies"});
  }
}

//get recipe by name

const getRecipeByName = async(req, res) => {
  try {
      // const userId = req.user.user._id;
      const {userId, title} = req.query;
      if(userId){
      let recipeDetails = await RecipeModel.find({title : { $regex: new RegExp('.*' + title + '.*', 'i') }});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"});
      }
      console.log(recipeDetails)
      // For each recipe, check if it is liked by the user
      const recipesWithLikeStatus = await Promise.all(
        recipeDetails.map(async (recipe) => {
            // Check if the recipe is in the wishlist
            console.log(recipe)
            const isLiked = await Wishlist.exists({ userId, savedRecipies: { $elemMatch: { recipeId: recipe._id } } });// Match recipeId in the array of objects
            return {
                ...recipe.toObject(),
                isLiked: !!isLiked, // Add a boolean flag to show if it's liked
            };
        })
    );
      recipeDetails = recipesWithLikeStatus;
      console.log(recipeDetails)
      return res.status(200).send({message:"successfull", recipeDetails});
  }else {
    const recipeDetails = await RecipeModel.find({title : { $regex: new RegExp('.*' + title + '.*', 'i') }});
    if(!recipeDetails) {
      return res.status(403).send({message:"No recipies available"});
    }
    return res.status(200).send({message:"successfull", recipeDetails});
  }
  }catch(err) {
      res.status(404).send({message:"error in getting recipies"});
  }
}


module.exports = {addRecipe, getRecipeByIngredients, editRecipe, listRecipies,
                   getRecipeById, getRecipeByCategory, getRecipesPopular,
                    getRecipeByName}