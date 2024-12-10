import React from 'react'
import { Card } from "@chakra-ui/react"
// import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { AvatarRoot, AvatarImage, AvatarFallback } from '@chakra-ui/react';
import './Cards.css'
import { Button } from "@chakra-ui/react"
const Cards = () => {
  return (
    <div className='card-layout'>
        <Card.Root 
        padding={"1.5rem"}
              width="14rem"
              height="20rem"
              backgroundColor={'#EFEFEF'} 
              _hover={{ bg: "#FFAD65", 
                        // transform: "scale(1.05)", // Slightly scale the card
                        // boxShadow: "lg",  // Apply a larger shadow
                     }} 
              transition="all 0.3s ease-in-out" // Smooth transition for all properties
              cursor="pointer"
              borderTopLeftRadius={"4rem"} 
              borderBottomRightRadius={"4rem"}>
      <Card.Body gap="2">


      <img className="cardImage" src="/assets/breakfast.png" alt="food image" />
        {/* <AvatarRoot size="2xl" borderRadius="full">
            <AvatarImage src="/assets/image.png" alt="Nue Camp" />
            <AvatarFallback>NC</AvatarFallback>
        </AvatarRoot> */}

        <Card.Title mt="2" marginTop={"11rem"}>Nue Camp</Card.Title>
        <Card.Description
        >
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="center">{/* flex-end */}
        {/* <Button>View Recipies</Button> */}
      </Card.Footer>
    </Card.Root>
    </div>
  )
}

export default Cards;