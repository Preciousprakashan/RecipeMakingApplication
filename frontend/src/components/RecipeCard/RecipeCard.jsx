import React from 'react'
import { Button, Card, Image, Text } from "@chakra-ui/react"
import '../EditorsChoiceCard/EditorsChoiceCard.css'
import { IoTimerSharp } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import './RecipeCard.css'
import HeartAnimation from '../HeartAnimation/HeartAnimation';
import { useNavigate } from 'react-router-dom';
const RecipeCard = ({id, title, readyInMinutes, vegetarian,isExternal, image, liked, onLikeToggle }) => {
  const navigate = useNavigate();
  console.log(isExternal);
  return (
    <div className='editors-card recipe-card'>
        <Card.Root maxW="sm" overflow="hidden" border={'none'} boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"  width={'18rem'}>
     <div className="image-container">
            <Image
              src={image}
              alt="Green double couch with wooden legs"
              borderRadius={'20px'}
              width={'100%'}
              height={'14rem'}
              padding={'1rem'}
              />
            
              <div className='like-icon' style={{margin:'1rem'}}>
                    <HeartAnimation className='like-icon' id={id} liked={liked} onLikeToggle={onLikeToggle} />
              </div>  
     </div>
      <Card.Body>
        <Card.Title fontSize={'medium'} onClick={()=>navigate('/recipe',{state:id})}>{title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <div className='recipe-info'>
            {readyInMinutes && <div>
                <IoTimerSharp/>
                <p>{readyInMinutes} minutes</p>
            </div>}
            <div>
                <PiForkKnifeFill/>
                <p>{vegetarian ? 'Vegetarian' : 'Non-Veg'}</p>
            </div>
        </div>
      </Card.Footer>
    </Card.Root>
    </div>
  )
}

export default RecipeCard