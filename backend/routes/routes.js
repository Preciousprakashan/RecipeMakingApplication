
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const { userRegistration, login} = require('../controller/userController.js')
const userModel = require('../models/userData.js');
const {addRecipe, getRecipeByIngredients} = require('../controller/recipeController.js');

router.post('/register', userRegistration);
router.post('/login', login);
router.post('/add',addRecipe);

// router.get('/logout', logout);

// router.put('/update-profile', updateProfile);

router.get('/search-recipies', getRecipeByIngredients);
// router.get('/search-recipies',authMiddleware('user'), getRecipeByIngredients);

module.exports = router;