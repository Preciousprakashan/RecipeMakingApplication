
const RecipeModel = require('../models/recipeData')
const Wishlist = require('../models/wishlistData');
const axios = require('axios');
const { v2: cloudinary } = require("cloudinary");
require('dotenv').config();
//for admin
// add recipe

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const addRecipe = async (req, res) => {

  try {
    const { title, category, descriptions, instructions, vegetarian, readyInMinutes, servings, veryPopular } =
      req.body;
   
    // Validate and parse ingredients
    let ingredients = [];
    try {
      ingredients = JSON.parse(req.body.ingredients || "[]"); // Safely parse JSON
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid ingredients JSON format" });
    }

    // Upload recipe image to Cloudinary
    const recipeImage = req.files["recipeImage"]?.[0];
    const recipeImageResult = await cloudinary.uploader.upload(recipeImage.path, {
      folder: "recipes",
    });

    // Upload ingredient images to Cloudinary
    const ingredientImages = req.files["ingredientImages"] || [];
    const ingredientImageResults = await Promise.all(
      ingredientImages.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "ingredients" })
      )
    );

    // Map uploaded ingredient images to ingredient data
    ingredients = ingredients.map((ingredient, index) => ({
      ...ingredient,
      image: ingredientImageResults[index]?.secure_url || "",
    }));

    // Create a new recipe object
    const newRecipe = new RecipeModel({
      title,
      category: category.split(","),
      descriptions,
      instructions,
      vegetarian: vegetarian === "true", // Handle boolean input
      readyInMinutes,
      servings,
      image: recipeImageResult.secure_url, // Recipe image URL
      ingredients, // Array of ingredients with image URLs
      veryPopular: veryPopular === "true",
    });

    // Save to MongoDB
    await newRecipe.save();

    res.status(200).json({ success: true, data: newRecipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ success: false, message: "Failed to add recipe." });
  }
}

// Delete Recipe Function
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the recipe in the database by ID
    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    // Delete the recipe image from Cloudinary
    if (recipe.image) {
      const publicId = recipe.image.split("/").pop().split(".")[0]; // Extract public_id
      await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
    }

    // Delete all ingredient images from Cloudinary
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      for (let ingredient of recipe.ingredients) {
        if (ingredient.image) {
          const ingredientPublicId = ingredient.image.split("/").pop().split(".")[0]; // Extract public_id
          await cloudinary.uploader.destroy(ingredientPublicId); // Delete ingredient image from Cloudinary
        }
      }
    }

    // Delete the recipe from MongoDB
    await RecipeModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ success: false, message: "Failed to delete recipe." });
  }
};

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

const getRecipeById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.query.userId;
    let recipe, response, relatedRecipes;

    // MongoDB ObjectId: 24-character hexadecimal string
    if (!/^[a-fA-F0-9]{24}$/.test(id)) { // Checks if it's a valid MongoDB ObjectId
      response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY
        },
      });
      recipe = response.data;
    } else {
      recipe = await RecipeModel.findById(id);
      // If no recipe is found in MongoDB, return an error
      if (!recipe) {
        return res.status(403).send({ message: "Recipe does not exist" });
      }

      // Find other related recipes in the same category
      relatedRecipes = await RecipeModel.find({
        category: recipe.category,  // Same category as the current recipe
        _id: { $ne: id }      // Exclude the current recipe
      }).limit(5);  // Limit to 5 related recipes

      // Convert Mongoose document to a plain JavaScript object if necessary
      recipe = recipe.toObject ? recipe.toObject() : recipe;
    }

    // Add related recipes to the recipe object
    Object.assign(recipe, { relatedRecipes: relatedRecipes });

    // If a user is logged in, check if the recipe is liked
    if (userId) {
      const isLiked = await Wishlist.exists({
        userId,
        savedRecipies: { $elemMatch: { recipeId: recipe._id } } // Match recipeId in the array of objects
      });

      // Add `isLiked` field to recipe object
      recipe.isLiked = isLiked ? true : false;
    }

    res.status(200).send({ message: "success", recipeData: { recipe, relatedRecipes } });

  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Error in getting recipe details" });
  }
};



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
            // Add 'id' field with the same value as '_id' (converted to string)
            $addFields: {
              id: { $toString: "$_id" },
              // isExternal: false
            }
        },
        {
          // Project to include the list of matched ingredients and calculate missed ingredients
          $project: {
            title: 1,
            ingredients: 1,
            image:1,
            id:1,
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
      console.log(error)
      res.status(500).json({ error: 'Error searching for recipes' });
    }
  }


// get recipies by category 

const getRecipeByCategory = async(req, res) => {
  try {
      const category = req.query.category;
      const recipeDetails = await RecipeModel.find({category :{ $elemMatch: { $regex: new RegExp('^' + category + '$', 'i') }}});
      
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"});
      }
      res.status(200).send({message:"successfull", recipeDetails });
  }catch(err) {
      res.status(404).send({message:"error in getting recipies"});
  }
}

// get popular recipies

const getRecipesPopular = async(req, res) => {
  try {
    const userId = req.query.userId;
      if(userId){
          let recipeDetails = await RecipeModel.find({veryPopular : true});
          if(!recipeDetails) {
            return res.status(403).send({message:"No recipies available"});
          }
          // For each recipe, check if it is liked by the user
          const recipesWithLikeStatus = await Promise.all(
            recipeDetails.map(async (recipe) => {
                // Check if the recipe is in the wishlist
                const isLiked = await Wishlist.exists({ userId, savedRecipies: { $elemMatch: { recipeId: recipe._id } } });// Match recipeId in the array of objects
                return {
                    ...recipe.toObject(),
                    isLiked: !!isLiked, // Add a boolean flag to show if it's liked
                };
            })
        );
          recipeDetails = recipesWithLikeStatus;
          return res.status(200).send({message:"successfull", recipeDetails});
  }else{
      const recipeDetails = await RecipeModel.find({veryPopular : true});
      if(!recipeDetails) {
        return res.status(403).send({message:"No recipies available"});
      }
      return res.status(200).send({message:"successfull", recipeDetails});
  }
  }catch(err) {
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
      // For each recipe, check if it is liked by the user
      const recipesWithLikeStatus = await Promise.all(
        recipeDetails.map(async (recipe) => {
            // Check if the recipe is in the wishlist
            const isLiked = await Wishlist.exists({ userId, savedRecipies: { $elemMatch: { recipeId: recipe._id } } });// Match recipeId in the array of objects
            return {
                ...recipe.toObject(),
                id: recipe._id.toString(),
                isLiked: !!isLiked, // Add a boolean flag to show if it's liked
            };
        })
    );
      
      recipeDetails = recipesWithLikeStatus;
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



const dbRecipe= async(req,res)=>{
  try {
    const recipes = await RecipeModel.find(); // Fetch all recipes from the database
    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes. Please try again later.",
    });
  }
}

//To Edit the recipe
const updateRecipe = async (req, res) => {
  try {
    console.log(req.body)
    const recipeId = req.params.id;  // Get recipe ID from URL parameters
    const { title, category, descriptions, instructions, vegetarian, readyInMinutes, servings, veryPopular, ingredients } = req.body;

    // Validate and parse ingredients
    let parsedIngredients = [];
    try {
      parsedIngredients = JSON.parse(ingredients || "[]");  // Safely parse ingredients JSON
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid ingredients JSON format" });
    }

    // Find the existing recipe
    const existingRecipe = await RecipeModel.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    // Handle the recipe image update (if a new image is uploaded)
    let recipeImageUrl = existingRecipe.image;  // Keep the old image if no new one is uploaded
    if (req.files && req.files.recipeImage) {
      const recipeImage = req.files["recipeImage"][0];
      const result = await cloudinary.uploader.upload(recipeImage.path, { folder: "recipes" });
      recipeImageUrl = result.secure_url;  // Update the recipe image URL
    }

    // Handle the ingredient image updates (if new ingredient images are uploaded)
    let updatedIngredientImages = existingRecipe.ingredients;
    if (req.files && req.files.ingredientImages) {
      const ingredientImages = req.files["ingredientImages"] || [];
      updatedIngredientImages = parsedIngredients.map((ingredient, index) => ({
        ...ingredient,
        image: ingredientImages[index]?.secure_url || ingredient.image,  // Update with new image URL
      }));
    }

    // Update the existing recipe fields with the provided data (or keep the old ones if not provided)
    existingRecipe.title = title || existingRecipe.title;
    existingRecipe.category = category ? category.split(",") : existingRecipe.category;
    existingRecipe.descriptions = descriptions || existingRecipe.descriptions;
    existingRecipe.instructions = instructions || existingRecipe.instructions;
    existingRecipe.vegetarian = vegetarian === "true" ? true : false;
    existingRecipe.readyInMinutes = readyInMinutes || existingRecipe.readyInMinutes;
    existingRecipe.servings = servings || existingRecipe.servings;
    existingRecipe.veryPopular = veryPopular === "true" ? true : false;
    existingRecipe.image = recipeImageUrl;
    existingRecipe.ingredients = updatedIngredientImages;

    // Save the updated recipe
    await existingRecipe.save();

    res.status(200).json({ success: true, data: existingRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ success: false, message: "Failed to update recipe." });
  }
};

module.exports = {addRecipe, getRecipeByIngredients, listRecipies,deleteRecipe,updateRecipe,
  getRecipeById, getRecipeByCategory, getRecipesPopular,
   getRecipeByName, dbRecipe}
   