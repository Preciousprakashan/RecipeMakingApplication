import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Heading from '../components/Heading/Heading'
import Cards from '../components/Card/Cards'
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard'
import Footer from '../components/Foooter/Footer'
import '../styles/style.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../context/UserProvider';

const HomePage = () => {
  // const [likes, setLikes] = useState([]);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { userId, role, token } = useContext(UserContext); // Accessing user data from UserContext
  const handleLikeToggle = async(id,apiId, currentLikeStatus) => {
    const Token = localStorage.getItem('accessToken');
    if(!Token){
      alert('Login First to like recipies');
      return
    }  
    console.log(token);
    console.log(userId, role);
    console.log(currentLikeStatus, !currentLikeStatus);
    let recipeId = id;
    if(!id) 
      recipeId = apiId
    console.log(recipeId)
    try{
        await axios.post(`${baseUrl}/add-wishlist`,
          {recipeId},
        // Pass headers as the third argument
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
            recipe._id === recipeId ? { ...recipe, isLiked: !currentLikeStatus } : recipe
        )
    );
    // setRecipeData(recipeData.map((recipe) => (recipe.id === id ? { ...recipe, liked: !like } : { ...recipe })))
    // console.log(recipeData)
  }
  const [recipes, setRecipes] = useState([]);
  
  //manual data for categories 
  const categories = [
    {categoryName:'Main Course',image:'../../assets/main-course.svg'},
    // {categoryName:'Side Dish',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    {categoryName:'Dessert',image:'../../assets/dessert.svg'},
    // {categoryName:'Appetizer',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Salad',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Bread',image:'/assets/c_bread.png'},
    // {categoryName:'Breakfast',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Soup',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Beverage',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Sauce',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Marinade',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Fingerfood',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    // {categoryName:'Brsnackead',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctW6VehR_7hZs1Otw73v-3P_SyJ5S0yzGug&s'},
    {categoryName:'Drink',image:'../../assets/drinks.svg'},
  ]
  useEffect( () => {
      try {
        const getPopularRecipes = async () => {
              const token = localStorage.getItem('accessToken');
                  let user = "";
                  if (token) 
                     user = jwtDecode(token);
                  const userId = user ? user.user._id : null;
              console.log(userId)
              const response = await axios.get(`${baseUrl}/popular-recipies`,{
                params:{userId}
              });
              setRecipes(response.data.recipeDetails)
              console.log(response.data.recipeDetails)
      }
      getPopularRecipes();
      }catch(err) {
        console.log(err)
      }
  },[])
  return (
    <>
      <div className='home-page'>
        <NavBar />
        <Heading />

        <div className="grp-cards1">
          {/* <h2>Categories</h2>
          <div className="card-collection">
          {categories.map((category, index) => 
              <Cards key={index} name={category.categoryName} image={category.image} />
          )}
          </div> */}

          <h2>Editor's Choice</h2>
          <div className='card-collection'>
            {recipes.map((recipe, index) =>
              <EditorsChoiceCard
                    key={index} id={recipe._id}
                    title={recipe.title} readyInMinutes={recipe.readyInMinutes}
                    vegetarian={recipe.vegetarian} image={recipe.image}
                    description={recipe.descriptions} isLiked={recipe.isLiked}
                    onLikeToggle={() => handleLikeToggle(recipe._id,recipe.id, recipe.isLiked)}
              />
            )}
          </div>
          {/* <div className='card-collection'>
            {recipeData.map((recipe, index) =>
              <EditorsChoiceCard
              key={index} id={recipe.id} isLiked={recipe.liked} onLikeToggle={() => handleLikeToggle(recipe.id, recipe.liked)} />
            )}
          </div> */}
          
        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomePage;