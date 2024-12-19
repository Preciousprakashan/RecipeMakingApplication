import React, { useState } from 'react'
import { Button, Card, Image, Text } from "@chakra-ui/react"
import './EditorsChoiceCard.css'
import { IoTimerSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import HeartAnimation from '../HeartAnimation/HeartAnimation'
import { useNavigate } from 'react-router-dom';
const EditorsChoiceCard = ({ id, isLiked, onLikeToggle, title, readyInMinutes, vegetarian, description, image }) => {
  const navigate = useNavigate();
  return (
    <div className='editors-card'>
      <Card.Root maxW="sm" overflow="hidden" border={'none'} width={'17rem'} backgroundColor={"transparent"} >
        <div className="image-container">
          <Image
            src={image}
            alt="recipe image"
            borderRadius={'20px'}
            width={'100%'}
            height={'14rem'}
          />
          
          <div className="like-icon">
            <HeartAnimation className='like-icon' id={id} liked={isLiked} onLikeToggle={onLikeToggle} />
          </div>
        </div>
        <Card.Body marginTop={'16px'}>
          <Card.Title fontSize={'medium'} onClick={()=>navigate('/recipe',{state:id})} style={{cursor:'pointer'}}>{title}</Card.Title>
          <Card.Description>
          {description}
        </Card.Description>
          
        </Card.Body>
        <Card.Footer marginTop={'20px'}>
          <div className='recipe-info'>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection:'row'}}>
              <IoTimerSharp className="custom-icon" style={{ fontSize: '24px' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>{readyInMinutes} minutes</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection:'row'}}>
              <PiForkKnifeFill className="custom-icon" style={{ fontSize: '24px' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>{vegetarian ? 'Vegetarian' : 'Non-Veg'}</p>
            </div>
          </div>
        </Card.Footer>

      </Card.Root>
    </div>
  )
}

export default EditorsChoiceCard