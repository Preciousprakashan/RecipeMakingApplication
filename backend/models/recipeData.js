
const mongoose = require("mongoose");

const recipeData = mongoose.Schema({
    recipe: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    descriptions: {
        type:String,
        required:true
    },
    instructions: {
        type:String,
        required:true
    },
    analyzedInstructions: [{
        number: {type:Number},
        step:{type:String}
    }],
    vegetarian: {
        type:Boolean,
        required:true
    },
    ingredients: [
        {
            // IngredientId:{type:Number,re},
            name:String,
            unit:String,
            amount:Number,
            image:String
        }
    ],
    cookingTime: {
        type:Number,
        required:true
    },
    servings:  {
        type:Number,
        required:true
    },
    veryPopular:  {
        type:Number,
        required:true
    }

})