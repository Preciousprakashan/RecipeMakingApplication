
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const { userRegistration, login} = require('../controller/userController.js')
const userModel = require('../models/userData.js');
const {addRecipe, getRecipeByIngredients, editRecipe, listRecipies, getRecipeById, getRecipeByCategory, getRecipesPopular, getRecipeByName} = require('../controller/recipeController.js');
const {addWishlistRecipe, listWishlistRecipe} = require('../controller/wishlistController.js');

router.post('/register', userRegistration);
router.post('/login', login);
router.post('/add',addRecipe);

// router.get('/logout', logout);

// router.put('/update-profile', updateProfile);
router.put('/edit-recipe/:id', editRecipe);

router.get('/search-recipies', getRecipeByIngredients);
router.get('/list-recipies', listRecipies);
router.get('/recipe-details/:id', getRecipeById);
router.get('/recipe-by-category', getRecipeByCategory);
router.get('/popular-recipies', getRecipesPopular);
router.get('/recipe-by-name', getRecipeByName);
// router.get('/search-recipies',authMiddleware('user'), getRecipeByIngredients);

router.post('/add-wishlist', authMiddleware('user'), addWishlistRecipe);
router.get('/wishlist-recipies', authMiddleware('user'), listWishlistRecipe);

module.exports = router;