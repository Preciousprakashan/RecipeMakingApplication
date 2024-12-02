

const mongoose = require("mongoose");

const whishlistModel = mongoose.Schema({
    recipeID : {
        type:Number,
        required:true
    },
    userId: {
        type:Number,
        required:true
    },
    isExternal: {
        type:Boolean,
        required:true
    }
    },
    {
        timestamps: true
    }
)