

const mongoose = require("mongoose");

const wishlistModel = mongoose.Schema({
    userId : {
        type:String,
        required:true
    },
    savedRecipies: [
        {
            recipeId:{type:String},
            title:{type:String},
            image:{type:String},
            category:{type:[String],default:[]},
            description:{type:String},
            vegetarian:{type:Boolean},
            cookingTime:{type:Number},
            isExternal:{type:Boolean}
        }
    ]
    },
    {
        timestamps: true
    }
)

const wishlistData = mongoose.model('wishlist',wishlistModel);

module.exports = wishlistData;