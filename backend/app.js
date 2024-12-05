const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
let SPOONACULAR_API_KEY = '39be80ffc28747debcb2daf663fe6aac';
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your API key
const API_KEY = "AIzaSyBZ-kSBfB39N_jztCk_szBgtxuFYoft2W8";

const recipeRoute = require('./routes/addRecipe');
require('./db/connection')
app.use('/api/recipes', recipeRoute);
app.get('/get-recipe-by-id/:id',async(req,res)=>{
  try{
    const { id } = req.params;
    console.log(id)
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{
      
        params: {
          apiKey: SPOONACULAR_API_KEY
        },
    });
    res.send(response.data);
  }catch(err){
    console.log(err);
    res.send("Error in fetching recipe details")
  }
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
