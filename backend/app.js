// // server.js
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = '5000';
// const OPENAI_API_KEY = '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';

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
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send('Error with OpenAI API');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your API key
const API_KEY = "AIzaSyBZ-kSBfB39N_jztCk_szBgtxuFYoft2W8";

// Route to handle recipe requests
app.post("/api/get-recipe", async (req, res) => {
  const { prompt } = req.body; // Get the prompt from the frontend

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt, // Pass the user prompt, e.g., "Give me a recipe for chocolate cake"
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send the generated recipe back to the frontend
    res.json(response.data.results[0].generatedText);
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe" });
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
  console.log(`Server running on http://localhost:${PORT}`);
});
