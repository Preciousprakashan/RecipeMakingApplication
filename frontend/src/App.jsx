import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Heading from './components/Heading/Heading';
import HomePage from './pages/HomePage';
import Cards from './components/Card/Cards';
import EditorsChoiceCard from './components/EditorsChoiceCard/EditorsChoiceCard';
import Footer from './components/Foooter/Footer';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import RecipeCard from './components/RecipeCard/RecipeCard';
import { Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Login';
import SignUppage from './pages/SignUp';
import Wishlist from './pages/Wishlist';
import RecipeByCategory from './pages/RecipeByCategory';
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

    try {
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
    <div className="App">
      {/* <RecipeTable /> */}
        <AdminPage />
      {/* <HomePage /> */}

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/recipe-details' element={<RecipeDetailsPage/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/sign-up' element={<SignUppage/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/recipe-by-category' element={<RecipeByCategory/>}/>
    </Routes>
    {/* <HomePage/> */}
    {/* <RecipeDetailsPage/> */}
    {/* <RecipeCard/> */}

    {/* <Cards/> */}
    {/* <EditorsChoiceCard/> */}
    {/* <Footer/> */}
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