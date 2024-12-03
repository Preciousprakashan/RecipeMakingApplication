import React from 'react'
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
const Wishlist = () => {
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
           <RecipeCard/>
           <RecipeCard/>
           <RecipeCard/>
           <RecipeCard/>
           <RecipeCard/>
           <RecipeCard/>

        </div>
        <Footer/>
    </div>
  )
}

export default Wishlist