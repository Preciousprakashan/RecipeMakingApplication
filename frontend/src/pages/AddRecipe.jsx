import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddRecipe.css'; // Import the CSS file

const AddRecipe = () => {
    const [recipeData, setRecipeData] = useState({
        recipe: '',
        category: '',
        descriptions: '',
        instructions: '',
        analyzedInstructions: [{ number: 1, step: '' }],
        vegetarian: false,
        ingredients: [{ name: '', unit: '', amount: 0, image: '' }],
        cookingTime: 0,
        servings: 0,
    });

    const [message, setMessage] = useState('');

    const handleRecipeChange = (field, value) => {
        setRecipeData({ ...recipeData, [field]: value });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = recipeData.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setRecipeData({ ...recipeData, ingredients: updatedIngredients });
    };

    const addIngredient = () => {
        setRecipeData({
            ...recipeData,
            ingredients: [...recipeData.ingredients, { name: '', unit: '', amount: 0, image: '' }],
        });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = recipeData.ingredients.filter((_, i) => i !== index);
        setRecipeData({ ...recipeData, ingredients: updatedIngredients });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5001/api/recipes/add', recipeData);
            setMessage(data.message);
            setRecipeData({
                recipe: '',
                category: '',
                descriptions: '',
                instructions: '',
                analyzedInstructions: [{ number: 1, step: '' }],
                vegetarian: false,
                ingredients: [{ name: '', unit: '', amount: 0, image: '' }],
                cookingTime: 0,
                servings: 0,
            });
        } catch (error) {
            console.error(error);
            setMessage('Error adding recipe.');
        }
    };

    return (
        <div className="add-recipe-container">
            <h1>Add Recipe</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe Name:</label>
                    <input
                        type="text"
                        value={recipeData.recipe}
                        onChange={(e) => handleRecipeChange('recipe', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={recipeData.category}
                        onChange={(e) => handleRecipeChange('category', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Descriptions:</label>
                    <textarea
                        value={recipeData.descriptions}
                        onChange={(e) => handleRecipeChange('descriptions', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Instructions:</label>
                    <textarea
                        value={recipeData.instructions}
                        onChange={(e) => handleRecipeChange('instructions', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Cooking Time (minutes):</label>
                    <input
                        type="number"
                        value={recipeData.cookingTime}
                        onChange={(e) => handleRecipeChange('cookingTime', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Servings:</label>
                    <input
                        type="number"
                        value={recipeData.servings}
                        onChange={(e) => handleRecipeChange('servings', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Vegetarian:</label>
                    <input
                        type="checkbox"
                        checked={recipeData.vegetarian}
                        onChange={(e) => handleRecipeChange('vegetarian', e.target.checked)}
                    />
                </div>

                <div className="ingredients-section">
                    <h3>Ingredients</h3>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-row">
                            <input
                                type="text"
                                placeholder="Ingredient Name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Unit (e.g., grams, cups)"
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL (optional)"
                                value={ingredient.image}
                                onChange={(e) => handleIngredientChange(index, 'image', e.target.value)}
                            />
                            <button
                                type="button"
                                className="remove-ingredient-button"
                                onClick={() => removeIngredient(index)}
                            >
                                Remove Ingredient
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>
                        Add Ingredient
                    </button>
                </div>

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;