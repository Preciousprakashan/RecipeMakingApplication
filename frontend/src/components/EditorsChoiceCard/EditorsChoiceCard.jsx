import React, { useState } from 'react'
import { Button, Card, Image, Text } from "@chakra-ui/react"
import './EditorsChoiceCard.css'
import { IoTimerSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import HeartAnimation from '../HeartAnimation/HeartAnimation'
const EditorsChoiceCard = ({ id, isLiked, onLikeToggle }) => {
  return (
    <div className='editors-card'>
      <Card.Root maxW="sm" overflow="hidden" border={'none'} width={'17rem'} backgroundColor={"transparent"}>
        <div className="image-container">
          <Image
            src="/assets/food.png"
            alt="Green double couch with wooden legs"
            borderRadius={'20px'}
          />
          {/* <MdOutlineFavoriteBorder className='like-icon' size={'1.8rem'} /> */}
          {/* <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='red'/>
              <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='#EFEFEF'/> */}
          <div className="like-icon">
            <HeartAnimation className='like-icon' id={id} liked={isLiked} onLikeToggle={onLikeToggle} />
          </div>
        </div>
        <Card.Body marginTop={'16px'}>
          <Card.Title fontSize={'medium'}>Mixed Tropical Fruit Salad with Superfood Boosts </Card.Title>
          {/* <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description> */}
          {/* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text> */}
        </Card.Body>
        <Card.Footer marginTop={'20px'}>
          <div className='recipe-info'>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection:'row'}}>
              <IoTimerSharp className="custom-icon" style={{ fontSize: '24px' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>30 minutes</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection:'row'}}>
              <PiForkKnifeFill className="custom-icon" style={{ fontSize: '24px' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>Vegetarian</p>
            </div>
          </div>
        </Card.Footer>

      </Card.Root>
    </div>
  )
}

export default EditorsChoiceCard