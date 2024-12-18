import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/style.css'
import '../styles/Recipe.css'
// import { Input, Button, InputLeftElement, Icon } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
import { IoSearch } from "react-icons/io5";
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Foooter/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const RecipeByCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState(location.state.name);
  const [image, setImage] = useState(location.state.image);
  const [recipes, setRecipes] = useState([]);
  // console.log(location.state)
  useEffect(() => {
    try {
      const fetchRecipeByCategory = async () => {
        console.log(category)
        const response = await axios.get('http://localhost:5001/recipe/recipe-by-category',
          { params: { category } });
        console.log(response.data.recipeDetails);
        setRecipes(response.data.recipeDetails);
      }
      fetchRecipeByCategory();
    } catch (err) {
      console.log(err);
    }
  }, [])
  return (
    <>
      <div className="category-page">
        {/* <div className='category-contents'> */}
        <div className='nav-heading-container'>
          <NavBar />

          <div className='category-name'>
            <h1>{category}</h1>
          </div>
        </div>
        <div className="category-container">
          <img className='img-center' src={image} alt="1.jpg" />
        </div>
        {/* </div> */}

      </div>

      <div className="recipies">
        {recipes.map((recipe, index) => {
          return <RecipeCard key={index} title={recipe.title} readyInMinutes={recipe.readyInMinutes} vegetarian={recipe.vegetarian} image={recipe.image} />
        }, [])}


      </div>
      <Footer />
    </>
  )
}

export default RecipeByCategory;