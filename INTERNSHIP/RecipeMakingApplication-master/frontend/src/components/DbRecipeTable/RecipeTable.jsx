import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import icons
import './RecipeTable.css'

const RecipeTable = () => {
  const recipes = [
    { name: 'Salad', image: 'salad.jpg', time: '10 min', likes: 60 },
    { name: 'Soup', image: 'soup.jpg', time: '30 min', likes: 50 },
    { name: 'Ice cream', image: 'icecream.jpg', time: '60 min', likes: 100 },
    { name: 'Biriyani', image: 'biriyani.jpg', time: '90 min', likes: 150 },
    { name: 'Noodles', image: 'noodles.jpg', time: '15 min', likes: 250 },
    { name: 'Pizza', image: 'pizza.jpg', time: '20 min', likes: 30 },
    { name: 'Burger', image: 'burger.jpg', time: '15 min', likes: 100 },
    { name: 'Ice cream', image: 'icecream.jpg', time: '60 min', likes: 100 },
    { name: 'Biriyani', image: 'biriyani.jpg', time: '90 min', likes: 150 },
    { name: 'Noodles', image: 'noodles.jpg', time: '15 min', likes: 250 },
  ];

  return (
    
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Cooking time</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.name}</td>
                <td>
                  <img src={`images/${recipe.image}`} alt={recipe.name} />
                </td>
                <td>{recipe.time}</td>
                <td>{recipe.likes}</td>
                <td>
                  <button className="edit-btn"> <FaEdit /></button>
                  <button className="delete-btn"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  );
};

export default RecipeTable;