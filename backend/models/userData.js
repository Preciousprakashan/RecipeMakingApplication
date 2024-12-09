
const mongoose = require('mongoose');

const userData = mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    emailId: {
        type:String,
        required: true
    },
    userName: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
    
}
,{
    timestamps:true
})

const userModel = mongoose.model('user',userData);

module.exports = userModel;