import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const fetchRecipe = async () => {
        const apiUrl = 'http://localhost:5000/chat';

    const requestData = {
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a recipe assistant." },
        { role: "user", content: input }
      ],
      max_tokens: 300,
      temperature: 0.7,
    };

    try {
      const res = await axios.post(apiUrl, requestData);

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setResponse('Failed to fetch recipe. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Recipe Assistant</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ingredients or recipe idea..."
        rows="5"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={fetchRecipe} style={{ padding: '10px', fontSize: '16px' }}>
        Get Recipe
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Recipe Result:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
