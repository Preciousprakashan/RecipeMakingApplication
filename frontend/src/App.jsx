// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const fetchRecipe = async () => {
//         const apiUrl = 'http://localhost:5000/chat';

//     const requestData = {
<<<<<<< HEAD
//       model: "gpt-3.5-turbo", // or "gpt-3.5-turbo"
=======
//       model: "gpt-4", // or "gpt-3.5-turbo"
>>>>>>> afd73af3206257d1928ba2af0b2cb13583cdf8c3
//       messages: [
//         { role: "system", content: "You are a recipe assistant." },
//         { role: "user", content: input }
//       ],
//       max_tokens: 300,
//       temperature: 0.7,
//     };

//     try {
//       const res = await axios.post(apiUrl, requestData);

//       setResponse(res.data.choices[0].message.content);
//     } catch (error) {
//       console.error('Error fetching recipe:', error);
//       setResponse('Failed to fetch recipe. Please try again.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>Recipe Assistant</h1>
//       <textarea
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter ingredients or recipe idea..."
//         rows="5"
//         style={{ width: '100%', marginBottom: '10px' }}
//       />
//       <button onClick={fetchRecipe} style={{ padding: '10px', fontSize: '16px' }}>
//         Get Recipe
//       </button>
//       <div style={{ marginTop: '20px' }}>
//         <h3>Recipe Result:</h3>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState("");
=======

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Heading from './components/Heading/Heading';
import HomePage from './pages/HomePage';
import Cards from './components/Card/Cards';
import EditorsChoiceCard from './components/EditorsChoiceCard/EditorsChoiceCard';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      return;
    }

    setLoading(true);
    setError('');
>>>>>>> afd73af3206257d1928ba2af0b2cb13583cdf8c3

  const handleGenerateRecipe = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.post("http://localhost:5000/api/get-recipe", {
        prompt: `Give me a recipe for ${prompt}`,
      });
      setRecipe(response.data); // Set the recipe from the backend response
    } catch (error) {
      console.error("Error generating recipe:", error.message);
=======
      // Make a request to the Node.js backend
      const response = await axios.get(`http://localhost:5000/recipes`, {
        params: { ingredients },
      });

      // Store the recipes data in the state
      console.log(response.data);
      setRecipes(response.data);
    } catch (err) {
      setError('Error fetching recipes');
      console.error(err);
    } finally {
      setLoading(false);
>>>>>>> afd73af3206257d1928ba2af0b2cb13583cdf8c3
    }
  };

  const handleViewRecipe = async(id) => {
    console.log(id);
    try{
      const response = await axios.get('http://localhost:5000/get-recipe-by-id/'+id);
      // if(response){
        console.log("hii")
        console.log(response)
        setRecipe(response.data);
      // }
    }catch(err){
        console.log(err);
      }
    }
   
  

  return (
<<<<<<< HEAD
    <div style={{ padding: "20px" }}>
      <h1>Recipe Generator</h1>
      <input
        type="text"
        placeholder="Enter dish (e.g., chocolate cake)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      <button onClick={handleGenerateRecipe} style={{ marginLeft: "10px" }}>
        Generate Recipe
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h2>Generated Recipe:</h2>
        <p>{recipe}</p>
=======
    <div className="App">

    <HomePage/>
    {/* <Cards/> */}
    {/* <EditorsChoiceCard/> */}
      {/* <h1>Recipe Finder</h1>
      <div>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., apples, flour)"
        />
        <button onClick={handleSearch}>Search</button>
>>>>>>> afd73af3206257d1928ba2af0b2cb13583cdf8c3
      </div>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <div>
        {recipes.length > 0 && (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id} style={{border:"1px solid gray", margin:"0.6rem", textDecoration:"none"}}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt="recipe" width={400} />
                <div style={{display:"flex",flexDirection:"row" }}>
                <ul>
                  <b>Available ingredients</b>
                  {recipe.usedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                </ul>
                <ul>
                  <b>Missing ingredients</b>
                  {recipe.missedIngredients.map((ingredient) => (
                    <li key={ingredient.id} style={{color:"red"}}>{ingredient.name}</li>
                  ))}
                </ul>
                </div>
                <button type="button" onClick={() => handleViewRecipe(recipe.id)}>View Recipe Details</button>
                <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}

export default App;