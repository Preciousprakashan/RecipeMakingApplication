const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeData');

// Add a new recipe
router.post('/add', async (req, res) => {
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
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Error adding recipe' });
  }
});
// Search recipes
router.post('/search', async (req, res) => {
  const { ingredients } = req.body; // Array of ingredient names

  try {
    // Find recipes that match all provided ingredients
    const matchingRecipes = await Recipe.find({
      'ingredients.name': { $all: ingredients },
    });

    // Suggest recipes that contain at least one of the provided ingredients
    const suggestedRecipes = await Recipe.find({
      'ingredients.name': { $in: ingredients },
    }).limit(5);

    res.json({ matchingRecipes, suggestedRecipes });
  } catch (error) {
    res.status(500).json({ error: 'Error searching for recipes' });
  }
});


module.exports = router;