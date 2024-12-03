
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
    password: {
        type:String,
        required: true
    }
    
})
module.exports = mongoose.model('User', userData);
