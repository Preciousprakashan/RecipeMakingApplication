import React from 'react'
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
const RecipeByCategory = () => {
  return (
    <div>
        <div className="category-page">
            <NavBar/>
            {/* <div className='category-contents'> */}
                
                <div className="category-container">
                      <img src="/assets/1.png" alt="1.png" />
                 </div>
    {/* </div> */}
    
        </div>
       

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

export default RecipeByCategory;