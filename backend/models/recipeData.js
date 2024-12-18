
const mongoose = require("mongoose");

const recipeData = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    category: {
        type:[String],
        default:[],
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
    readyInMinutes: {
        type:Number,
        required:true
    },
    servings:  {
        type:Number,
        required:true
    },
    veryPopular:  {
        type:Boolean,
        // required:true
    },
    image:{
        type:String
    }
}
,{
    timestamps:true
})

const recipeModel = mongoose.model('recipe', recipeData);

module.exports = recipeModel;