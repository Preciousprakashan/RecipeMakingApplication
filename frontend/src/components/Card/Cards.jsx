import React from 'react'
import { Card } from "@chakra-ui/react"
// import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { AvatarRoot, AvatarImage, AvatarFallback } from '@chakra-ui/react';
import './Cards.css'
import { Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
const Cards = ({ name, image, description }) => {
  const navigate = useNavigate();
  const handleCategory = () => {
    // alert('hii');
    navigate('/recipe-by-category', { state: { name, image, description } });
  }
  return (
    <>
      <div className='card-layout' onClick={handleCategory}>
        <div className="category-card">
          <div className="category-card-body">
            <img className="category-card-image" src={image} alt="food image" />

            <h2 className="category-card-title">{name}</h2>

            <p className="category-card-description">{description}</p>
          </div>

          <div className="category-card-footer">
            {/* Uncomment if you want a button in the footer */}
            {/* <button className="category-card-button">View Recipes</button> */}
          </div>
        </div>

      </div>
    </>
  )
}

export default Cards;