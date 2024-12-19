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
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import SearchRecipe from './pages/SearchRecipe';
import AboutUs from './pages/AboutUs';
import { UserProvider } from './context/UserProvider';
import PrivateRoute from './components/PrivateRoutes/PrivateRoutes';

function App() {
  // const [ingredients, setIngredients] = useState('');
  // const [recipes, setRecipes] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  // const handleSearch = async () => {
  //   if (!ingredients.trim()) {
  //     return;
  //   }

  //   setLoading(true);
  //   setError('');

  //   try {
  //     // Make a request to the Node.js backend
  //     const response = await axios.get(`http://localhost:5001/recipes`, {
  //       params: { ingredients },
  //     });

  //     // Store the recipes data in the state
  //     console.log(response.data);
  //     setRecipes(response.data);
  //   } catch (err) {
  //     setError('Error fetching recipes');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleViewRecipe = async(id) => {
  //   console.log(id);
  //   try{
  //     const response = await axios.get('http://localhost:5001/get-recipe-by-id/'+id);
  //     // if(response){
  //       console.log("hii")
  //       console.log(response)
  //       setRecipe(response.data);
  //     // }
  //   }catch(err){
  //       console.log(err);
  //     }
  //   }
   
  return (
    <UserProvider>
        <div className="App">

        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/recipe-details' element={<RecipeDetailsPage/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/sign-up' element={<SignUppage/>}/>
          <Route path='/recipe-by-category' element={<RecipeByCategory/>}/>
          <Route path='/recipe' element={<Recipe/>}/>
          {/* <Route path="/searchRecipe" element={<SearchRecipe />} /> */}
          <Route path="/aboutus" element={<AboutUs/>} />

           {/* Private Routes (Protected) */}

            {/* user */}
            <Route 
            path="/wishlist" 
            element={<PrivateRoute roleRequired="user" element={Wishlist} />} 
          />
          {/* settings page */}


          {/* admin */}
          <Route 
            path="/admin-page" 
            element={<PrivateRoute roleRequired="admin" element={AdminPage} />} 
          />
          <Route 
            path="/add" 
            element={<PrivateRoute roleRequired="admin" element={AddRecipe} />} 
          />
          

        </Routes>
        </div>
    </UserProvider>
  );
}

export default App;