
const mongoose = require('mongoose');
const recipeModel = require('../models/recipeData');
const WishlistModel = require('../models/wishlistData');
const axios = require('axios');

// add recipe to wishlist
const addWishlistRecipe = async(req, res) => {
    try {
        const user = req.user.user;
        const id = req.body.recipeId;
        let recipeId,recipe;
        if (Number.isInteger(id)) {
            // If the ID is an integer, use it as is
            recipeId = id;
            const responseData = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`,{
      
              params: {
                apiKey: process.env.SPOONACULAR_API_KEY
              },
          });
          recipe = {
            userId:user._id,
            savedRecipies:[
              {
                recipeId:responseData.data.id.toString(),
                title:responseData.data.title,
                image:responseData.data.image,
                category:responseData.data.dishTypes,
                description:responseData.data.summary,
                vegetarian:responseData.data.vegetarian,
                cookingTime:responseData.data.cookingMinutes,
                isExternal:true
              }
            ]

          };
          } else {
            // Otherwise, convert the string to an ObjectId
            recipeId = new mongoose.Types.ObjectId(id);  // This works only if it's a valid ObjectId
            responseData = await recipeModel.findById(recipeId);
            recipe = {
              userId:user._id,
              savedRecipies:[
              {
                recipeId:responseData._id,
                title:responseData.title,
                image:responseData.image,
                category:responseData.category,
                description:responseData.descriptions,
                vegetarian:responseData.vegetarian,
                cookingTime:responseData.cookingTime,
                isExternal:false
              }
              ]
            };
          }
          
          if(!recipe) {
             return res.status(404).send({message:"No recipe found"})
          }
        
        const wishlist = await WishlistModel.findOne({userId:user._id.toString()});
        if (wishlist){//if user has an entry in wishlist 
          // Assuming recipe._id is the ID of the recipe you want to remove
        const recipeIdToRemove = recipe.savedRecipies[0].recipeId;

        // Check if the recipe exists in the savedRecipies array before attempting to remove it
        const recipeExists = wishlist.savedRecipies.some(rec => rec.recipeId === recipeIdToRemove);
        let updatedWishlist;
        if (recipeExists) {
          // Recipe exists, now remove it
           updatedWishlist = await WishlistModel.updateOne(
            { userId: user._id },  // Find the user document by _id
            { 
              $pull: { 
                savedRecipies: { recipeId: recipeIdToRemove }  // Remove the recipe with the given _id
              }
            }
          );
        }else {
          updatedWishlist = await WishlistModel.updateOne(
            { userId: user._id },  // Find the user document by _id
            { 
              $push: { 
                savedRecipies: { $each: recipe.savedRecipies }  // Add all recipes in newRecipes array to savedRecipies
              }
            }
          );
        }
          
          res.status(200).send({message:"successfull", updatedWishlist});
        }else{
              const wishlistingRecipe = new WishlistModel(recipe);
              const savedData =  await wishlistingRecipe.save();
              res.status(200).send({message:"successfull", savedData});
        }

        
    }catch (err) {
        res.status(404).send({message:"error in saving"});
    }
} 

// list all items in wishlist (only if user logged in)

const listWishlistRecipe = async(req, res) => {
  try {
    const user = req.user.user;
    const recipies = await WishlistModel.find({userId:user._id});
    if(!recipies){
      return res.status(403).send({message:"No saved recipies"});
    }
    res.status(200).send({message:"successfull",recipies});
  }catch(err) {
    res.status(404).send({message:"error in getting recipies"});
  }
}

module.exports = {addWishlistRecipe, listWishlistRecipe};