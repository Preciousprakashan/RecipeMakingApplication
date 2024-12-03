import React from 'react'
import { Button, Card, Image, Text } from "@chakra-ui/react"
import '../EditorsChoiceCard/EditorsChoiceCard.css'
import { IoTimerSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import './RecipeCard.css'
const RecipeCard = () => {
  return (
    <div className='editors-card recipe-card'>
        <Card.Root maxW="sm" overflow="hidden" border={'none'} boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"  width={'20rem'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
     <div className="image-container">
            <Image
              src="/assets/food.png"
              alt="Green double couch with wooden legs"
              borderRadius={'1rem'}
              width={'18rem'}
              paddingTop={'1rem'}
              />
              {/* <MdOutlineFavoriteBorder className='like-icon' size={'1.8rem'} /> */}
              <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='red'/>
              <MdOutlineFavorite className='like-icon' size={'1.8rem'} color='#EFEFEF'/>
     </div>
      <Card.Body>
        <Card.Title fontSize={'medium'}>Fruit Salad </Card.Title>
        {/* <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description> */}
        {/* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text> */}
      </Card.Body>
      <Card.Footer>
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

export default RecipeCard