import React, { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/style.css'
// import { Input, Button, InputLeftElement, Icon } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
import { IoSearch } from "react-icons/io5";
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Foooter/Footer';
const RecipeDetailsPage = () => {
  const [recipe, setRecipe] = useState([
    {
      id:1,
      name:'biriyani'
    },
    {
      id:2,
      name:'biriyani'
    },
    {
      id:3,
      name:'biriyani'
    },
    {
      id:4,
      name:'biriyani'
    },
    {
      id:5,
      name:'biriyani'
    },
    {
      id:6,
      name:'biriyani'
    }
  ])
  return (
    <div>
        <div className="search-page">
            <NavBar/>
            <div className='searchbar-contents'>
                <h1>Unlock Recipes with Your Ingredients!</h1>
                <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            // value={query}
                            // onChange={handleInputChange}
                        />
                        <button className="search-button">
                            <IoSearch/>
                        </button>
                 </div>
    </div>
    
        </div>
        <div className="ingredients">
        <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
          <Button variant="outline" color={'#EA6A12'} border={'1px solid #EA6A12'} borderRadius={'2rem'} >
            coffee powder
          </Button>
        </div>

        <div className="recipies">
          {
            recipe.map((recipe, index)=>{
              return  <RecipeCard key={index} id={recipe.id}/>
            })
          }
           

        </div>
        <Footer/>
    </div>
  )
}

export default RecipeDetailsPage