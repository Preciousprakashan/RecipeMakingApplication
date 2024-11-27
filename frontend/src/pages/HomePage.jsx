import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Heading from '../components/Heading/Heading'
import Cards from '../components/Card/Cards'
import EditorsChoiceCard from '../components/EditorsChoiceCard/EditorsChoiceCard'

const HomePage = () => {
  return (
    <div className='home-page'>
        <NavBar/>
        <Heading/>
        <h2>Categories</h2>
        <div className="card-collection">
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>

        </div>
        <h2>Editor Choice</h2>
        <div className='card-collection'>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
            <EditorsChoiceCard/>
        </div>
        <div>kjwefhkeslhesjn</div>
    </div>
  )
}

export default HomePage;