import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SearchRecipes.css'; // Import the CSS file

const SearchRecipes = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/recipes/search', {
        ingredients: ingredients.split(',').map((ing) => ing.trim()),
      });
      setRecipes(data.matchingRecipes);
      setSuggestions(data.suggestedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-recipes-container">
      <h1 className="title">Search Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <h2 className="section-title">Matching Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.recipe}</h3>
            <p>{recipe.descriptions}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Suggested Recipes</h2>
      <div className="recipes-grid">
        {suggestions.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.recipe}</h3>
            <p>{recipe.descriptions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecipes;