import React, { useState, useEffect } from 'react';
import "./Recipe.css";
import HeartAnimation from "../HeartAnimation/HeartAnimation";
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import CopyToClipboard from '../CopytoClipboard/CopyToClipboard';

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const handleToggleIngredients = () => {
        setIsIngredientsExpanded(!isIngredientsExpanded);
    };

    const ingredients = [
        { name: 'Tortilla Chips', count: 2, image: 'trotilla-chips.jpg' },
        { name: 'Avocado', count: 1, image: 'Avocado.jpg' },
        { name: 'Red Cabbage', count: 1, image: 'RedCabbage.jpg' },
        { name: 'Peanuts', count: 1, image: 'peanut.jpg' },
        { name: 'Red Onions', count: 1, image: 'Red Onions.jpg' },
        { name: 'Ground Beef or Chicken', count: 200, image: 'ground_beef.jpg' },
        { name: 'Lettuce', count: 1, image: 'Lettuce.jpg' },
        { name: 'Tomatoes', count: 2, image: 'tomatos.jpg' },
        { name: 'Cheddar Cheese', count: 50, image: 'CheddarCheese.jpg' },
        { name: 'Sour Cream', count: 1, image: 'SourCream.jpg' },
        { name: 'Lime', count: 1, image: 'Lime.jpg' },
        { name: 'Taco Seasoning', count: 1, image: 'Taco_Seasoning.jpg' },
        { name: 'Olives', count: 1, image: 'Olives.jpg' },
        { name: 'Cilantro', count: 1, image: 'Cilantro.jpg' }
    ];

    const columns = 3;

    const ingredientsToShow = isIngredientsExpanded ? ingredients : ingredients.slice(0, isMobile ? 7 : ingredients.length); // Show only 5 ingredients initially

    return (
        <div id="recipe-main-conatiner">
            <div className="recipe-main-conatiner-image">
                <img src="1.png" alt="Recipe" />

                {/* Container for Close button and Favorite Button */}
                <div className="button-container">
                    <a className="close-button" href="/">Close</a>
                    <HeartAnimation />
                </div>
            </div>
            <div className="recipe-main-conatiner-description">
                <div className="recipe-main-description-title">
                    <p>Healthy Taco Salad</p>
                </div>

                <div className="recipe-main-description">
                    <p>
                        A refreshing twist on a classic favorite! This Healthy Taco Salad combines
                        {isDescriptionExpanded ? (
                            <>
                                {""}
                                crisp greens, juicy tomatoes, creamy avocado, and zesty taco-seasoned protein for a wholesome and flavorful meal. Perfect for lunch or dinner, it's topped with a light dressing to keep things guilt-free. Quick, delicious, and packed with nutrients—this salad will be your go-to for taco night or any time you crave bold flavors!
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
                <div className="recipe-main-description-spec">
                    <div className="grid">

                        {/* Carbs */}
                        <div className="flex gap-4">
                            <div className="recipe-box-ds">
                                <i className="fas fa-bread-slice"></i> {/* Icon for Carbs */}
                            </div>
                            <span>100g Carbs</span>
                        </div>

                        {/* Protein */}
                        <div className="flex gap-4">
                            <div className="recipe-box-ds">
                                <i className="fas fa-dumbbell"></i> {/* Icon for Protein */}
                            </div>
                            <span>20g Protein</span>
                        </div>

                        {/* Calories */}
                        <div className="flex gap-4">
                            <div className="recipe-box-ds">
                                <i className="fas fa-fire"></i> {/* Icon for Calories */}
                            </div>
                            <span>20g Cal</span>
                        </div>

                        {/* Fats */}
                        <div className="flex gap-4">
                            <div className="recipe-box-ds">
                                <i className="fas fa-pizza-slice"></i> {/* Icon for Fats */}
                            </div>
                            <span>10g Fats</span>
                        </div>

                        {/* Fiber */}
                        <div className="flex gap-4">
                            <div className="recipe-box-ds">
                                <i className="fas fa-leaf"></i> {/* Icon for Fiber */}
                            </div>
                            <span>5g Fiber</span>
                        </div>

                    </div>
                </div>
                {/* Ingredients Section */}
                <div className='recipe-main-description-ingredients'>
                    <div className='recipe-main-description-ingredients-title'>
                        Ingredients
                    </div>

                    <div className="container-recipe">
                        {ingredientsToShow.map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                name={ingredient.name}
                                count={ingredient.count}
                                image={ingredient.image}
                            />
                        ))}
                    </div>

                    {isMobile && (
                        <button onClick={handleToggleIngredients} className='recipe-main-description-button' style={{ color: 'var(--Dark)' }}>
                            {isIngredientsExpanded ? 'Show Less Ingredients' : 'Show All Ingredients'}
                        </button>
                    )}
                </div>

                {/* Instructions Section */}
                <div className='recipe-main-description-ingredients-title'>
                    Instructions
                </div>
                <TextToSpeech targetSelector="#instructions" />

                <p className="typography-instructions-heading">For main dish</p>
                <div className="recipe-main-description-instructions" id="instructions">
                    <p className="typography-instructions-subh">Cook the Meat:</p>
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
