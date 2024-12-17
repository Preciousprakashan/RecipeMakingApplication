import React, { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Heading from '../components/Heading/Heading'
import Cards from '../components/Card/Cards'
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard'
import Footer from '../components/Foooter/Footer'
import '../styles/style.css'
const HomePage = () => {
  // const [likes, setLikes] = useState([]);
  const handleLikeToggle = (id, like) => {
    console.log(like, !like)
    console.log(id)
    setRecipeData(recipeData.map((recipe) => (recipe.id === id ? { ...recipe, liked: !like } : { ...recipe })))
    console.log(recipeData)
  }

  const [recipeData, setRecipeData] = useState([
    {
      id: 1,
      name: "laddoo",
      liked: true
    },
    {
      id: 2,
      name: "laddoo",
      liked: true
    },
    {
      id: 3,
      name: "laddoo",
      liked: false
    },
    {
      id: 4,
      name: "laddoo",
      liked: true
    }
  ])

  return (
    <>
      <div className='home-page'>
        <NavBar />
        <Heading />

        <div className="grp-cards1">
          <h2>Categories</h2>
          <div className="card-collection">
            <Cards />
            <Cards />
            <Cards />
            <Cards />

          </div>

          <h2>Editor's Choice</h2>
          <div className='card-collection'>
            {recipeData.map((recipe, index) =>
              <EditorsChoiceCard
              key={index} id={recipe.id} isLiked={recipe.liked} onLikeToggle={() => handleLikeToggle(recipe.id, recipe.liked)} />
            )}
            {/* <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomePage;