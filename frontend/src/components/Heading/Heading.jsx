import React from 'react'
import './Heading.css'
import { Button } from "@chakra-ui/react"
import { IoIosPlayCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const Heading = () => {
  const navigate = useNavigate();
  return (
    <div className="outer-head">
        <div className='heading'>
            <div className='details'>
                    <h1>Delicious <br/><span>Recipes</span></h1>
                    <p>Find quick, flavorful recipes that bring joy to your kitchen. Simple, tasty, and perfect for any occasion!</p>
                    <Button className='recipe-button' onClick={()=>{navigate('/recipe-details')}}>View Recipies <IoIosPlayCircle/></Button>
                </div>
            <div className='home-image'>
                <img src="/assets/homepage-image.png" alt="dish" />
            </div>
        </div>
    </div>
    
  )
}

export default Heading