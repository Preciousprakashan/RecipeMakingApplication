import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Heading from '../components/Heading/Heading'
import Cards from '../components/Card/Cards'
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard'
import Footer from '../components/Foooter/Footer'
import '../styles/style.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const HomePage = () => {
  // const [likes, setLikes] = useState([]);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const handleLikeToggle = async (id, apiId, currentLikeStatus) => {
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      alert('Login First to like recipies');
      return
    }

    let recipeId = id;
    if (!id)
      recipeId = apiId
    console.log(recipeId)
    try {
      await axios.post(`${baseUrl}/add-wishlist`,
        { recipeId },
        // Pass headers as the third argument
        {
          headers: {
            'Authorization': `Bearer ${Token}`, // Attach Bearer token
            'Content-Type': 'application/json' // Optional, for POST/PUT requests
          }

        });
    } catch (err) {
      console.log(err);
    }

    // Update the state
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === recipeId ? { ...recipe, isLiked: !currentLikeStatus } : recipe
      )
    );

  }
  const [recipes, setRecipes] = useState([]);

  //manual data for categories 
  const categories = [
    {
      categoryName: 'Main Course',
      image: '../../assets/main-course.svg',
      description: 'The main dish of a meal, typically consisting of meat, fish, or vegetarian options.'
    },
    {
      categoryName: 'Dessert',
      image: '../../assets/des.svg',
      description: 'A sweet course served at the end of a meal, including cakes, pastries, and puddings.'
    },
    {
      categoryName: 'Drink',
      image: '../../assets/drinks.svg',
      description: 'Beverages served alongside meals, including juices, cocktails, and soft drinks.'
    }
  ];


  useEffect(() => {
    try {
      const getPopularRecipes = async () => {
        const token = localStorage.getItem('accessToken');
        let user = "";
        if (token)
          user = jwtDecode(token);
        const userId = user ? user.user._id : null;
        console.log(userId)
        const response = await axios.get(`${baseUrl}/popular-recipies`, {
          params: { userId }
        });
        setRecipes(response.data.recipeDetails)
        console.log(response.data.recipeDetails)
      }
      getPopularRecipes();
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <>
      <div className='home-page'>
        <NavBar />
        <Heading />

        <div className="grp-cards1">
          <h2>Categories</h2>
          <div className="card-collection2">
            {categories.map((category, index) =>
              <Cards
                key={index}
                name={category.categoryName}
                image={category.image}
                description={category.description}
              />
            )}
          </div>

          <h2>Editor's Choice</h2>
          <div className='card-collection'>
            {recipes.map((recipe, index) =>
              <EditorsChoiceCard
                key={index} id={recipe._id}
                title={recipe.title} readyInMinutes={recipe.readyInMinutes}
                vegetarian={recipe.vegetarian} image={recipe.image}
                description={recipe.descriptions} isLiked={recipe.isLiked}
                onLikeToggle={() => handleLikeToggle(recipe._id, recipe.id, recipe.isLiked)}
              />
            )}
          </div>

        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomePage;