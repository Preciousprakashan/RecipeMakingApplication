// server.js


// import fs from "fs";
// import path from "path";
// import OpenAI from "openai";
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const PORT=process.env.PORT
// const OPENAI_API_KEY=process.env.OPENAI_API_KEY

const app = express();
app.use(cors());
app.use(express.json());


const SPOONACULAR_API_KEY = '39be80ffc28747debcb2daf663fe6aac';
console.log(SPOONACULAR_API_KEY)
// app.post('/chat', async (req, res) => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       req.body,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );
//     console.error('OpenAI API Error:', error.response?.data || error.message);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send('Error with OpenAI API');
//     console.error('OpenAI API Error:', error.response?.data || error.message);
//   }
// });


// const openai = new OpenAI();

// const speechFile = path.resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await fs.promises.writeFile(speechFile, buffer);
// }
// main();

// Endpoint to get recipes by ingredients
app.get('/recipes', async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ error: 'Please provide ingredients' });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredients,
         // number: 10, // Number of recipes to return
          apiKey: SPOONACULAR_API_KEY,
        },
      }
    );

    // Return the recipes to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with the API request' });
  }
});

//
app.get('/get-recipe-by-id/:id',async(req,res)=>{
  try{
    const { id } = req.params;
    console.log(id)
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{
      
        params: {
          // ingredients: ingredients,
         // number: 10, // Number of recipes to return
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
  console.log(`Server running on port ${PORT}`);
});
