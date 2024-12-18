import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import '../styles/style.css';
import { IoSearch } from "react-icons/io5";
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Foooter/Footer';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const RecipeDetailsPage = () => {
  
  const [query, setQuery] = useState(''); // State for the search bar value
  const [searchType, setSearchType] = useState('ingredients'); // State for the filter type ('ingredients' or 'recipes')
  const [ingredients, setIngredients] = useState([]);
  const [relatedIngredients, setRelatedIngredients] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  useEffect(() => {
      const fetchAllRecipies = async() => {
          const data = await axios.get(`${baseUrl}/list-recipies`);
          console.log(data.data.recipes);
          setRecipes(data.data.recipes);
      }
      fetchAllRecipies();
  },[]);

  const handleInputChange = async (event) => {
    setQuery(event.target.value);
    const val = event.target.value;
    try{
      //fetching ingredients from the spoonacular api
      const data = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${val}&number=2`);//10
      const ingredientName = data.data.results.map((item) => item.name);
      setRelatedIngredients(ingredientName);
      console.log(ingredientName);
    }catch(err) {
      console.log(err);
    }

  };

  const handleAddIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }
    setQuery(''); // Clear search bar after adding
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };
  const handleLikeToggle = async(id, currentLikeStatus) => {
    const Token = localStorage.getItem('accessToken');
    if(!Token){
      alert('Login First to like recipies');
      return
    }  
    console.log(Token);
    console.log(currentLikeStatus, !currentLikeStatus)
    console.log(id)
    // let recipeId = id;
    // if(!id) 
    //   recipeId = apiId
    // console.log(recipeId)
    try{
        await axios.post(`${baseUrl}/add-wishlist`,
          // Pass headers as the third argument
          {recipeId:id},
          {
              headers: {
                  'Authorization': `Bearer ${Token}`, // Attach Bearer token
                  'Content-Type': 'application/json' // Optional, for POST/PUT requests
         }
    
        } );
      }catch(err) {
        console.log(err);
      }
    
    // Update the state
    setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
            recipe._id === id ? { ...recipe, isLiked: !currentLikeStatus } : recipe
        )
    );
   
  }
  const handleSearch = async() => {
    const token = localStorage.getItem('accessToken');
    // const decoded = jwt.verify(token, '4acd3d37df8639623b63dccd21024ee2c10d9f5b426be11457109a90063b0f10');
    let user = "";
    if (token) 
       user = jwtDecode(token);

    const userId = user ? user.user._id : null;
    if(searchType === 'ingredients'){ 
      console.log(ingredients);
      const data = await axios.get(`${baseUrl}/search-recipies`,{
          params:{
            ingredients,
            userId:userId
          },
        
      })
      console.log(data.data.recipes);
      setRecipes(data.data.recipes);
    }
    else{
      console.log(query);
      const data = await axios.get(`${baseUrl}/recipe-by-name`,{
        params:{
          title:query,
          userId:userId
        }
    })
    setRecipes(data.data.recipeDetails);
    }
    
  }



  return (
    <div>
      <div className="search-page">
        <NavBar />
        <div className="searchbar-contents">
          <h1>Unlock Recipes with Your Ingredients!</h1>

          {/* Filter Toggle (Dropdown) */}
          <div className="filter-container">
            <select
              className="filter-dropdown"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="ingredients">Search by Ingredients</option>
              <option value="recipes">Search by Recipes</option>
            </select>
          </div>

          {/* Single Search Bar */}
          <div className="search-container">
          {/* List of selected ingredients */}
          {searchType === 'ingredients' && (
        <div className="ingredients">

          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              {ingredient}
              <span
                className="remove-ingredient"
                onClick={() => handleRemoveIngredient(ingredient)}
              >   
                ×
              </span>
            </div>
          ))}

        </div>
      )}
            <div className='searching-details'>
                <input
                  type="text"
                  className="search-input"
                  placeholder={
                    searchType === 'ingredients'
                      ? 'Search or add an ingredient...'
                      : 'Search recipes by name...'
                  }
                  value={query}
                  onChange={handleInputChange}
                />
                <button className="search-button" onClick={handleSearch}>
                  <IoSearch />
                </button>
            </div>
          </div>

          {/* Related Ingredients or Filtered Recipes */}
          {searchType === 'ingredients' && query.trim() && (
            <div className="related-ingredients">
              <ul>
                {relatedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                    <Button
                      colorScheme="green"
                      className="add-ingredient-button"
                      onClick={() => handleAddIngredient(ingredient)}
                    >
                      + Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      
        <div className="recipies">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} id={recipe.id} title={recipe.title}
                  image={recipe.image} vegetarian={recipe.vegetarian}
                  readyInMinutes={recipe.readyInMinutes} liked={recipe.isLiked} 
                  onLikeToggle={() => handleLikeToggle(recipe.id, recipe.isLiked)} />
        ))}
        </div>
      


      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;





