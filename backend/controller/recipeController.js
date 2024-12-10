
const RecipeModel = require('../models/recipeData')
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
        !recipeData.cookingTime ||
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
      const recipies = await RecipeModel.find();
      res.status(200).send({message:"successfull", recipies});
  }catch(err) {
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
        // recipe.push(relatedRecipes);
        Object.assign(recipe, { relatedRecipes: relatedRecipes});
      if(!recipe) {
        return res.status(403).send({message:"Recipe does not exist"});
      } 
       
      res.status(200).send({message:"successfull",recipe});
  }catch(err) {
      res.status(404).send({message:"error in getting recipe details"});
  }
}


// get recipies by incredients
//???get recipies closer to avaibale ingredients
const getRecipeByIngredients = async (req, res) => {
    const { ingredients } = req.body; // Array of ingredient names
    
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
            number: 10, // Number of recipes to return
            apiKey: process.env.SPOONACULAR_API_KEY,
          },
        }
      );
      const recipeFromAPI = response.data;
      res.json({ recipes, recipeFromAPI });
    } catch (error) {
      res.status(500).json({ error: 'Error searching for recipes' });
    }
  }


// get recipies by category 

const getRecipeByCategory = async(req, res) => {
  try {
      const category = req.body.category;
      const recipeDetails = await RecipeModel.find({category :category});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"})
      }
      res.status(200).send({message:"successfull", recipeDetails});
  }catch(err) {
      res.status(404).send({message:"error in getting recipies"});
  }
}

// get popular recipies

const getRecipesPopular = async(req, res) => {
  try {
      const recipeDetails = await RecipeModel.find({veryPopular : true});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"})
      }
      res.status(200).send({message:"successfull", recipeDetails});
  }catch(err) {
      res.status(404).send({message:"error in getting recipies"});
  }
}

//get recipe by name

const getRecipeByName = async(req, res) => {
  try {
      
      const recipeDetails = await RecipeModel.find({title : req.body.title});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"})
      }
      res.status(200).send({message:"successfull", recipeDetails});
  }catch(err) {
      res.status(404).send({message:"error in getting recipies"});
  }
}



module.exports = {addRecipe, getRecipeByIngredients, editRecipe, listRecipies,
                   getRecipeById, getRecipeByCategory, getRecipesPopular,
                    getRecipeByName}