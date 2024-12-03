import React, { useState } from 'react'
import { Button, Card, Image, Text } from "@chakra-ui/react"
import './EditorsChoiceCard.css'
import { IoTimerSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import HeartAnimation from '../HeartAnimation/HeartAnimation'
const EditorsChoiceCard = ({ id, isLiked, onLikeToggle}) => {
  return (
    <div className='editors-card'>
        <Card.Root maxW="sm" overflow="hidden" border={'none'} width={'17rem'}>
     <div className="image-container">
            <Image
              src="/assets/food.png"
              alt="Green double couch with wooden legs"
              borderRadius={'1rem'}
              />
              {/* <MdOutlineFavoriteBorder className='like-icon' size={'1.8rem'} /> */}
              {/* <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='red'/>
              <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='#EFEFEF'/> */}
             <div className="like-icon">
                    <HeartAnimation className='like-icon' id={id} liked={isLiked} onLikeToggle={onLikeToggle}/>
             </div>
     </div>
      <Card.Body gap="2">
        <Card.Title fontSize={'medium'}>Mixed Tropical Fruit Salad with Superfood Boosts </Card.Title>
        {/* <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description> */}
        {/* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text> */}
      </Card.Body>
      <Card.Footer gap="2">
        <div className='recipe-info'>
            <div>
                <IoTimerSharp/>
                <p>30 minutes</p>
            </div>
            <div>
                <PiForkKnifeFill/>
                <p>Vegitarian</p>
            </div>
        </div>
      </Card.Footer>
    </Card.Root>
    </div>
  )
}

export default EditorsChoiceCard