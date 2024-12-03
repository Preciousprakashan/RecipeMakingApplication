import React, { useState } from 'react';
import axios from 'axios';

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

    // Update fields of the recipe
    const handleRecipeChange = (field, value) => {
        setRecipeData({ ...recipeData, [field]: value });
    };

    // Update specific ingredient
    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = recipeData.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setRecipeData({ ...recipeData, ingredients: updatedIngredients });
    };

    // Add new ingredient
    const addIngredient = () => {
        setRecipeData({
            ...recipeData,
            ingredients: [...recipeData.ingredients, { name: '', unit: '', amount: 0, image: '' }],
        });
    };

    // Remove an ingredient
    const removeIngredient = (index) => {
        const updatedIngredients = recipeData.ingredients.filter((_, i) => i !== index);
        setRecipeData({ ...recipeData, ingredients: updatedIngredients });
    };

    // Submit the recipe form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5000/api/recipes/add', recipeData);
            setMessage(data.message);
            // Reset form
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
        <div>
            <h1>Add Recipe</h1>
            {message && <p>{message}</p>}
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

                <h3>Ingredients</h3>
                {recipeData.ingredients.map((ingredient, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
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
                        <button type="button" onClick={() => removeIngredient(index)}>
                            Remove Ingredient
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addIngredient}>
                    Add Ingredient
                </button>

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
