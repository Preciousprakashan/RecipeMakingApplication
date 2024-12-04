import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import '../styles/style.css';
import { IoSearch } from "react-icons/io5";
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Foooter/Footer';

const RecipeDetailsPage = () => {
  const [query, setQuery] = useState(''); // State for the search bar value
  const [searchType, setSearchType] = useState('ingredients'); // State for the filter type ('ingredients' or 'recipes')
  const [ingredients, setIngredients] = useState([
    'Coffee Powder',
    'Milk',
    'Sugar',
    'Cocoa',
    'Flour',
    'Butter',
    'Eggs',
    'Salt',
  ]);
  const [relatedIngredients, setRelatedIngredients] = useState([
    'Cinnamon',
    'Coffee Powder',
    'Honey',
    'Vanilla Extract',
    'Almonds',
    'Chocolate Chips',
    'Whipped Cream',
  ]);
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Fruit Salad', time: '30 minutes', type: 'Vegetarian', ingredients: ['Cinnamon', 'Honey'] },
    { id: 2, name: 'Chocolate Cake', time: '1 hour', type: 'Dessert', ingredients: ['Cocoa', 'Butter', 'Sugar'] },
    { id: 3, name: 'Pasta', time: '45 minutes', type: 'Vegetarian', ingredients: ['Milk', 'Flour', 'Butter'] },
    { id: 4, name: 'Pancakes', time: '20 minutes', type: 'Breakfast', ingredients: ['Flour', 'Eggs', 'Milk'] },
    { id: 5, name: 'Pancakes', time: '20 minutes', type: 'Breakfast', ingredients: ['Flour', 'Eggs', 'Milk'] },
    { id: 6, name: 'Pancakes', time: '20 minutes', type: 'Breakfast', ingredients: ['Flour', 'Eggs', 'Milk'] },
    { id: 7, name: 'Pancakes', time: '20 minutes', type: 'Breakfast', ingredients: ['Flour', 'Eggs', 'Milk'] },
  ]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
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

  // Filter related ingredients or recipes based on the searchType
  const filteredResults =
    searchType === 'ingredients'
      ? relatedIngredients.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      : recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(query.toLowerCase())
        );

  // Filter recipes that match selected ingredients
  const filteredRecipesByIngredients = recipes.filter((recipe) =>
    recipe.ingredients.every((ingredient) =>
      ingredients.includes(ingredient)
    )
  );

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
            <button className="search-button">
              <IoSearch />
            </button>
          </div>

          {/* Related Ingredients or Filtered Recipes */}
          {searchType === 'ingredients' && query.trim() && (
            <div className="related-ingredients">
              <ul>
                {filteredResults.map((ingredient, index) => (
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

      {/* Recipe cards when searching by ingredients */}
      {searchType === 'ingredients' && (
        <div className="recipies">
          {filteredRecipesByIngredients.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Recipe cards when searching by recipe name */}
      {searchType === 'recipes' && (
        <div className="recipies">
          {filteredResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;





