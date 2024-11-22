// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const PORT=process.env.PORT
const OPENAI_API_KEY=process.env.OPENAI_API_KEY

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    console.error('OpenAI API Error:', error.response?.data || error.message);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error with OpenAI API');
    console.error('OpenAI API Error:', error.response?.data || error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
