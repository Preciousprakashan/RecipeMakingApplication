import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/style.css'
// import { Input, Button, InputLeftElement, Icon } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
import { IoSearch } from "react-icons/io5";
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Foooter/Footer';
import { FcLike } from "react-icons/fc";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const Wishlist = () => {
    const [recipes, setRecipes] = useState([]);
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const Token = localStorage.getItem('accessToken');
    
    const fetchAllRecipies = async() => {
        const data = await axios.get(`${baseUrl}/wishlist-recipies`,
            {
            // params:{userId},
            headers: {
                'Authorization': `Bearer ${Token}`, // Attach Bearer token
                'Content-Type': 'application/json' // Optional, for POST/PUT requests
                     }
          });
        console.log(data.data.recipies.savedRecipies);
        setRecipes(data.data.recipies.savedRecipies);
    }
    fetchAllRecipies();
},[]);

const handleLikeToggle = async(id) => {
  const Token = localStorage.getItem('accessToken');
    if(!Token){
      alert('Login First to like recipies');
      return
    }  
    console.log(Token);
    let recipeId = id;
    // if(!id) 
    //   recipeId = apiId
    // console.log(recipeId)
    try{
        const data = await axios.post(`${baseUrl}/add-wishlist`,
          {recipeId},
        // Pass headers as the third argument
        {
              headers: {
                  'Authorization': `Bearer ${Token}`, // Attach Bearer token
                  'Content-Type': 'application/json' // Optional, for POST/PUT requests
         }
    
        } );
        console.log(data)
        if(data){
          const response = await axios.get(`${baseUrl}/wishlist-recipies`,
            {
            // params:{userId},
            headers: {
                'Authorization': `Bearer ${Token}`, // Attach Bearer token
                'Content-Type': 'application/json' // Optional, for POST/PUT requests
                     }
          });
        console.log(response.data.recipies.savedRecipies);
        setRecipes(response.data.recipies.savedRecipies);
        }
        // Update the state
        // console.log(data.data.wishlistRecipes)

        // setRecipes(data.data.wishlistRecipes)
      }catch(err) {
        console.log(err);
      }
    
}
  return (
    <div>
        <div className="wishlist-page">
            <NavBar/>
            
    
       <div className="wishlist">
       <FcLike size={'1.8rem'} color='#EFEFEF'/>
            <h1>Wishlist</h1>
       </div>
        </div>
        <h2>Your Favourites</h2>
        <div className="recipies">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} id={recipe._id} title={recipe.title}
                          image={recipe.image} vegetarian={recipe.vegetarian}
                          readyInMinutes={recipe.readyInMinutes} liked={true} 
                          onLikeToggle={() => handleLikeToggle(recipe.recipeId)} />
                ))}
                </div>
        <Footer/>
    </div>
  )
}

export default Wishlist