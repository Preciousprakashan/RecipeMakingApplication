
// add recipe
const RecipeModel = require('../models/recipeData')
const addRecipe = async (req, res) => {
    try {
      const recipeData = req.body;
      console.log(recipeData)
      // Validate required fields
      if (
        !recipeData.recipe ||
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


// edit a recipe


// get all recipies



// get recipies by id 


// get recipies by category 


// get recipies by incredients
//???get recipies closer to avaibale ingredients
const getRecipeByIngredients = async (req, res) => {
    const { ingredients } = req.body; // Array of ingredient names
    
    try {
      // Find recipes that match all provided ingredients
      // const matchingRecipes = await RecipeModel.find({
      //   'ingredients.name': { $all: ingredients },
      // });
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
            recipe: 1,
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
      
  
      // Suggest recipes that contain at least one of the provided ingredients
      // const suggestedRecipes = await RecipeModel.find({
      //   'ingredients.name': { $in: ingredients },
      // }).limit(5);
  
      res.json({ recipes });
    } catch (error) {
      res.status(500).json({ error: 'Error searching for recipes' });
    }
  }


// get popular recipies


module.exports = {addRecipe, getRecipeByIngredients}