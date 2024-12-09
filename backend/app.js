const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
require('./db/connection.js');

let SPOONACULAR_API_KEY = '39be80ffc28747debcb2daf663fe6aac';
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const userRoute = require('./routes/routes.js');
app.use('/recipe',userRoute);


app.get('/get-recipe-by-id/:id',async(req,res)=>{
  try{
    const { id } = req.params;
    console.log(id)
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{
      
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY
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
