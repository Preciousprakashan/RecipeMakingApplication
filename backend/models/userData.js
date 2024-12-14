
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
        required: function() {
            return !this.googleId; // Password is only required if the Google ID is not set
          }
    },
    googleToken: {
        type: String, // Stores the Google OAuth token, if necessary (you can use it to make requests to Google APIs)
      },
      name: {
        type: String, // Store user's name (from Google or normal signup)
      },
      profileImage: {
        type: String, // Optional field for storing the profile image (Google may provide it)
      }
    
}
,{
    timestamps:true
})

const userModel = mongoose.model('user',userData);

module.exports = userModel;