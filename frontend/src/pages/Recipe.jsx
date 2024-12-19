import React, { useState, useEffect, useContext } from 'react';
import "../styles/Recipe.css";
import "../styles/Style.css";
import HeartAnimation from "../components/HeartAnimation/HeartAnimation";
import TextToSpeech from '../components/TextToSpeech/TextToSpeech';
import CopyToClipboard from '../components/CopytoClipboard/CopyToClipboard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserProvider';
import { jwtDecode } from 'jwt-decode';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import Footer from '../components/Foooter/Footer';

const Ingredient = ({ name, count, image }) => {
    return (
        <div className="ingredient">
            <img src={image} alt={name} />
            <div>
                <p>{name}</p>
            </div>
            <div>
                <p>{count}</p>
            </div>
        </div>
    );
};

const Recipe = () => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial screen size
    // Update isMobile state on window resize
    const location = useLocation();
    console.log(location.state);
    const id = location.state;
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [relatedRecipes, setRelatedRecipes] = useState([]);
    const [extendedIngredients, setExtendedIngredients] = useState([]);
    const {userId, token} = useContext(UserContext);
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        //get recipe  by id
        const getRecipeById = async () => {
            let userId = null;
            if (token) {
                userId = jwtDecode(localStorage.getItem('accessToken')).user._id;
            }
            const response = await axios.get(`${baseUrl}/recipe-details/${id}`,{params:{userId}});
            if(response.data.recipeData.recipe.ingredients){
                setIngredients(response.data.recipeData.recipe.ingredients)
            }else {
                setExtendedIngredients(response.data.recipeData.recipe.extendedIngredients)
            }
            
            setInstructions(response.data.recipeData.recipe.analyzedInstructions)
            setRecipe(response.data.recipeData.recipe)
            setRelatedRecipes(response.data.recipeData.relatedRecipes)
        }
        getRecipeById();
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLikeToggle = async (id, currentLikeStatus) => {
        const Token = localStorage.getItem('accessToken');
        if (!Token) {
            alert('Login First to like recipies');
            return
        }
        
        try {
            await axios.post(`${baseUrl}/add-wishlist`,
                // Pass headers as the third argument
                { recipeId: id },
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
        setRecipe((recipe) =>
            recipe._id === id ? { ...recipe, isLiked: !currentLikeStatus } : recipe
        )


    }
    const handleToggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const handleToggleIngredients = () => {
        setIsIngredientsExpanded(!isIngredientsExpanded);
    };



    return (
        <>
            <div id="recipe-main-conatiner">
                <div className="recipe-main-conatiner-image">
                    <img src={recipe.image} alt="Recipe" />

                    {/* Container for Close button and Favorite Button */}
                    <div className="button-container">
                        <a className="close-button" href="/">Close</a>
                        <HeartAnimation id={recipe._id} liked={recipe.isLiked} onLikeToggle={() => handleLikeToggle(recipe._id, recipe.isLiked)} />
                    </div>
                </div>
                <div className="recipe-main-conatiner-description">
                    <div className="recipe-main-description-title">
                        <p>{recipe.title}</p>
                    </div>

                <div className="recipe-main-description">
                    <p>
                        {recipe.descriptions ? recipe.descriptions : recipe.summary  }
                        {isDescriptionExpanded ? (
                            <>
                                {""}
                                {/* crisp greens, juicy tomatoes, creamy avocado, and zesty taco-seasoned protein for a wholesome and flavorful meal. Perfect for lunch or dinner, it's topped with a light dressing to keep things guilt-free. Quick, delicious, and packed with nutrients—this salad will be your go-to for taco night or any time you crave bold flavors! */}
                            </>
                        ) : (
                            <span>
                                {"..."}
                                <button onClick={handleToggleDescription} className='recipe-main-description-button' style={{ color: 'var(--Dark)' }}>
                                    More
                                </button>
                            </span>
                        )}
                        {isDescriptionExpanded && (
                            <button onClick={handleToggleDescription} className='recipe-main-description-button' style={{ color: 'var(--Dark)', }}>
                                Less
                            </button>
                        )}
                    </p>
                </div>
               
                {/* Ingredients Section */}
                <div className='recipe-main-description-ingredients'>
                    <div className='recipe-main-description-ingredients-title'>
                        Instructions
                    </div>

                    <div className="container-recipe">
                        { ingredients && ingredients.map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                name={ingredient.name}
                                count={ingredient.amount}
                                image={ingredient.image}
                            />
                        ))}
                        { extendedIngredients && extendedIngredients.map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                name={ingredient.name}
                                count={ingredient.amount}
                                image={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            />
                        ))}
                    </div>

                    <TextToSpeech targetSelector="#instructions"/>
                    <div className="recipe-main-description-instructions" id="instructions">
                        <p style={{ marginTop: '20px', marginBottom: '20px' }}>{recipe.instructions}</p>

                        {/* if detailed instructions are available for the recipe */}
                        {instructions &&
                            <>{console.log(instructions)}
                                <p className="typography-instructions-heading">Step By Step Instructions</p>
                                {instructions.map((instruction, index) => {
                                    return <ol key={index} >
                                        <li><b>Step{instruction.number}.</b></li>
                                        <li>{instruction.step}</li>

                                    </ol>
                                })}
                            </>
                        }
                        {/* <p className="typography-instructions-subh">Cook the Meat:</p>
                    <ul>
                        <li>In a skillet, cook the ground turkey or beef over medium heat until fully browned.</li>
                        <li>
                            Add taco seasoning and 1/4 cup of water. Stir well and simmer for 3-5 minutes. Set aside to cool slightly.
                        </li>
                    </ul>

                    <p className="typography-instructions-subh">Prepare the Salad Base:</p>
                    <ul>
                        <li>In a large salad bowl, arrange the chopped romaine lettuce as the base.</li>
                    </ul>

                    <p className="typography-instructions-subh">Add Toppings:</p>
                    <ul>
                        <li>Layer the salad with cherry tomatoes, black beans, corn, avocado, shredded cheese, and black olives.</li>
                    </ul>

                    <p className="typography-instructions-subh">Assemble the Protein:</p>
                    <ul>
                        <li>Add the cooked taco-seasoned meat to the salad.</li>
                    </ul>

                    <p className="typography-instructions-subh">Garnish and Serve:</p>
                    <ul>
                        <li>Sprinkle chopped cilantro over the top.</li>
                        <li>
                            Serve with lime wedges, Greek yogurt or sour cream, and salsa or your preferred dressing.
                        </li>
                    </ul> */}
                    </div>
                </div>
            </div>
            <div className='similar-h2'>Similar Recipies</div>
            <div className="recipies">
                {relatedRecipes && relatedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} id={recipe._id} title={recipe.title}
                        image={recipe.image} vegetarian={recipe.vegetarian}
                        readyInMinutes={recipe.readyInMinutes} liked={recipe.isLiked}
                        onLikeToggle={() => handleLikeToggle(recipe._id, recipe.isLiked)} />
                ))}
            </div>
            <Footer />
            </div>
        </>
    );
};

export default Recipe;