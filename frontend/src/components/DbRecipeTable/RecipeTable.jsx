import React, { useState, useEffect } from "react";
import axios from "axios";
import AddRecipeForm from "../../pages/AddRecipe"; // Assuming AddRecipeForm is the form component
import "./RecipeTable.css";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null); // Track the recipe being edited
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    // Fetch recipes when the component is mounted
    const fetchRecipes = async () => {
      const Token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`${baseUrl}/dbRecipe`,   {
          headers: {
              'Authorization': `Bearer ${Token}`, // Attach Bearer token
              'Content-Type': 'application/json' // Optional, for POST/PUT requests
                   }
        });
        if (response.data.success) {
          setRecipes(response.data.data);
        } else {
          console.error("Error fetching recipes:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const Token = localStorage.getItem('accessToken');
      // Send DELETE request to backend to delete the recipe
      const response = await axios.delete(`${baseUrl}/delete/${id}`,{
        headers: {
          'Authorization': `Bearer ${Token}`, // Attach Bearer token
          'Content-Type': 'application/json' // Optional, for POST/PUT requests
               }
      });
      
      if (response.status === 200) {
        // Remove deleted recipe from the state
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        alert("Recipe deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  // Function to handle editing a recipe
  const handleEdit = (recipe) => {
    setEditingRecipe(recipe); // Set the recipe to be edited
    navigate('/admin-page')
  };

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      
      {/* Show the AddRecipeForm for editing if editingRecipe is set */}
      {editingRecipe ? (
        <AddRecipeForm
          initialRecipe={editingRecipe} // Pass the initial recipe data
          setEditingRecipe={setEditingRecipe} // Allow the form to clear the editing state
          setRecipes={setRecipes} // Update the recipes list after editing
        />
      ) : (
        <div>
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            <table className="recipe-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Recipe</th>
                  <th>Category</th>
                  <th>Ingredients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe._id}>
                    <td>
                      <img src={recipe.image} alt={recipe.title} />
                    </td>
                    <td>{recipe.title}</td>
                    <td>{recipe.category.join(", ")}</td>
                    <td>{recipe.ingredients.map((ingredient) => ingredient.name).join(", ")}</td>
                    <td>
                      <div className="button-group">
                        <button onClick={() => handleEdit(recipe)}>Update</button>
                        <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeList;