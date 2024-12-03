import React, { useState } from 'react';
import axios from 'axios';

const SearchRecipes = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/recipes/search', {
        ingredients: ingredients.split(',').map((ing) => ing.trim()),
      });
      setRecipes(data.matchingRecipes);
      setSuggestions(data.suggestedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Recipes</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Matching Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.recipe}</h3>
          <p>{recipe.descriptions}</p>
        </div>
      ))}

      <h2>Suggested Recipes</h2>
      {suggestions.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.recipe}</h3>
          <p>{recipe.descriptions}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchRecipes;