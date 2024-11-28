import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Heading from './components/Heading/Heading';
import HomePage from './pages/HomePage';
import Cards from './components/Card/Cards';
import EditorsChoiceCard from './components/EditorsChoiceCard/EditorsChoiceCard';
import AdminPage from './pages/AdminPage';
import RecipeTable from './components/DbRecipeTable/RecipeTable';

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

  }

  return (
    <div className="App">
      {/* <RecipeTable /> */}
        <AdminPage />
      {/* <HomePage /> */}

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