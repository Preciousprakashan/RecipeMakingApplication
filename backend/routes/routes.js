
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const { userRegistration, login, viewProfile, updateProfile} = require('../controller/userController.js')
const userModel = require('../models/userData.js');
const {addRecipe, dbRecipe,deleteRecipe,updateRecipe, getRecipeByIngredients, listRecipies, getRecipeById, getRecipeByCategory, getRecipesPopular, getRecipeByName} = require('../controller/recipeController.js');
const {addWishlistRecipe, listWishlistRecipe} = require('../controller/wishlistController.js');
const uploadFields = require('../middleware/uploadFields.js');

router.post('/register', userRegistration);
router.post('/login', login);
router.post('/add',addRecipe);


router.get('/search-recipies', getRecipeByIngredients);
router.get('/list-recipies', listRecipies);
router.get('/recipe-details/:id', getRecipeById);
router.get('/recipe-by-category', getRecipeByCategory);
router.get('/popular-recipies', getRecipesPopular);
router.get('/recipe-by-name', getRecipeByName);

router.post('/add-wishlist', authMiddleware('user'), addWishlistRecipe);
router.get('/wishlist-recipies', authMiddleware('user'), listWishlistRecipe);
router.get('/view-profile', authMiddleware('user'), viewProfile);
router.put('/update-profile', authMiddleware('user'), updateProfile);

router.post('/add-recipe', uploadFields, addRecipe);
router.get('/dbRecipe', authMiddleware('admin'), dbRecipe);
router.delete('/delete/:id', authMiddleware('admin'), deleteRecipe);
router.put("/update/:id",authMiddleware('admin'), updateRecipe);

module.exports = router;