import React from "react";
import { useEffect } from 'react';
import { FaSearch, FaClipboardList, FaLightbulb, FaUtensils } from 'react-icons/fa';
import "../styles/AboutUs.css";
import Team from "../components/Team/Team";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Foooter/Footer";


const AboutUs = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="about-us-container">
        <NavBar/>


        {/* Header Section */}
        <section className="about-header">
          <div className="content-wrapper">
            <h1>About Us</h1>
            <p className="welcome-text">Welcome to Delizia!</p>
            <p className="description">
              At Delizia, we believe that cooking should be fun, simple, and accessible to everyone—whether
              you’re a seasoned chef or just starting out in the kitchen. Our app is designed to make finding
              recipes a breeze, no matter how you like to search.
            </p>

            {/* Scroll Down Button */}
            <p style={{ textAlign: 'center' }} onClick={scrollToNextSection}>
              <span className="scrolldown-button" data-scrolldown="true">
                <span className="scroll-mouse">
                  <span className="scroll-mouse-point"> </span>
                </span>
              </span>
            </p>


          </div>
        </section>



        {/* What Makes Us Unique? */}
        <section className="our-story next-section" id="next-section">

          {/* Left Section for Text */}
          <div className="story-left">
            <h2>What Makes Us <span className="love">Unique?</span></h2>
            <div className="story-content">
              <div className="story-item">
                <span className="number">1</span>
                <div className="text">
                  <h3>Search by Recipe Name</h3>
                  <p>
                    Know exactly what you want to cook? Simply type the recipe name, and we’ll show you step-by-step instructions along with the ingredients you need. Whether it’s a Classic Chicken Curry or Homemade Chocolate Cake, your favorite dishes are just a search away!
                  </p>
                </div>
              </div>
              <div className="story-item">
                <span className="number">2</span>
                <div className="text">
                  <h3>Search by Ingredients</h3>
                  <p>
                    Don’t know what to cook, but have ingredients sitting in your kitchen? Use our Ingredient Search feature! Just select the ingredients you have, and we’ll suggest recipes that you can whip up right now. No more food waste, and no more guessing what to make!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section for Image */}
          <div className="story-right">
            <img
              src="./assets/3.jpg" // Replace with your image path
              alt="Our Story"
            />
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="our-mission">
          <div className="mission-header">
            <h2>Our Mission</h2>
            <p>
              Our mission is to inspire everyone to cook delicious meals without the stress.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="mission-cards">
            <div className="mission-card">
              <h3>Discover New Recipes</h3>
              <p>Find exciting and diverse recipes that match your taste and preferences.</p>
            </div>
            <div className="mission-card">
              <h3>Save Time with Easy-to-Find Dishes</h3>
              <p>Quick and simple recipes that are easy to follow for any skill level.</p>
            </div>
            <div className="mission-card">
              <h3>Reduce Food Waste</h3>
              <p>Make use of ingredients you already have and create delicious meals.</p>
            </div>
          </div>
        </section>

        {/* Why we love delizia  */}
        <section className="why-love-delizia">
          <h2>Why You’ll <span className="love">Love</span> Delizia</h2>
          <div className="features-grid">
            <div className="feature-card" data-scroll>
              <div className="icon-aboutus">
                <FaSearch />
              </div>
              <h3>Easy-to-Use Search</h3>
              <p>Find the perfect recipe, your way.</p>
            </div>

            <div className="feature-card" data-scroll>
              <div className="icon-aboutus">
                <FaClipboardList />
              </div>
              <h3>Step-by-Step Instructions</h3>
              <p>Clear, easy-to-follow recipes for all skill levels.</p>
            </div>

            <div className="feature-card" data-scroll>
              <div className="icon-aboutus">
                <FaLightbulb />
              </div>
              <h3>Smart Suggestions</h3>
              <p>Recipes tailored to the ingredients you have.</p>
            </div>

            <div className="feature-card" data-scroll>
              <div className="icon-aboutus">
                <FaUtensils />
              </div>
              <h3>Endless Options</h3>
              <p>From quick weekday meals to indulgent weekend treats.</p>
            </div>
          </div>
        </section>

      </div>



      <Team />




      <section className="newsletter">
      {/* Logo Section */}
      <div className="newsletter-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 35 35" fill="none">
              <path d="M25.833 16.8831C26.5283 16.8917 27.2183 16.7602 27.8623 16.4961C28.5063 16.2321 29.0912 15.8409 29.5826 15.3457L34.4952 10.4017C34.8185 10.0744 35 9.63164 35 9.17011C35 8.70858 34.8185 8.26581 34.4952 7.93848C34.3338 7.77474 34.1418 7.64477 33.9303 7.55608C33.7188 7.46739 33.4919 7.42173 33.2627 7.42173C33.0336 7.42173 32.8067 7.46739 32.5951 7.55608C32.3836 7.64477 32.1916 7.77474 32.0302 7.93848L27.0655 12.865C26.9041 13.0287 26.7121 13.1587 26.5006 13.2474C26.2891 13.3361 26.0622 13.3818 25.833 13.3818C25.6038 13.3818 25.3769 13.3361 25.1654 13.2474C24.9539 13.1587 24.7619 13.0287 24.6005 12.865L30.7456 6.69812C30.9075 6.53523 31.0359 6.34186 31.1235 6.12904C31.2111 5.91622 31.2562 5.68811 31.2562 5.45776C31.2562 5.2274 31.2111 4.9993 31.1235 4.78648C31.0359 4.57366 30.9075 4.38028 30.7456 4.21739C30.5838 4.05451 30.3916 3.9253 30.1802 3.83714C29.9687 3.74899 29.742 3.70362 29.5131 3.70362C29.2842 3.70362 29.0576 3.74899 28.8461 3.83714C28.6346 3.9253 28.4425 4.05451 28.2806 4.21739L22.1529 10.4017C21.8295 10.0744 21.6481 9.63164 21.6481 9.17011C21.6481 8.70858 21.8295 8.26581 22.1529 7.93848L27.0655 2.9945C27.2274 2.83161 27.3557 2.63824 27.4433 2.42542C27.5309 2.2126 27.576 1.9845 27.576 1.75414C27.576 1.52378 27.5309 1.29568 27.4433 1.08286C27.3557 0.870037 27.2274 0.676662 27.0655 0.513775C26.9036 0.350889 26.7115 0.22168 26.5 0.133526C26.2885 0.0453722 26.0619 -4.54088e-09 25.833 0C25.6041 4.54088e-09 25.3774 0.0453722 25.166 0.133526C24.9545 0.22168 24.7624 0.350889 24.6005 0.513775L19.6879 5.45776C18.7126 6.44044 18.1648 7.77252 18.1648 9.16138C18.1648 10.5502 18.7126 11.8823 19.6879 12.865L17.4312 15.1186L3.07516 0.618595L2.90157 0.513775C2.81283 0.435859 2.71345 0.371145 2.60646 0.321607L2.294 0.199317L2.08569 0.0595579H1.96417H1.61699C1.51349 0.042903 1.40802 0.042903 1.30452 0.0595579C1.19944 0.0980515 1.10013 0.15096 1.00942 0.216787L0.731673 0.391486H0.610159L0.506004 0.566185C0.432533 0.658424 0.368555 0.75793 0.315054 0.863173C0.264214 0.969702 0.223527 1.08084 0.193539 1.1951C0.193539 1.1951 0.193539 1.31739 0.193539 1.38727C-0.227706 4.34215 0.0408658 7.35516 0.977959 10.1874C1.91505 13.0197 3.4949 15.5933 5.59223 17.7042L10.175 22.2987L0.783751 31.7325C0.621046 31.8949 0.491904 32.0881 0.403774 32.301C0.315644 32.5139 0.27027 32.7422 0.27027 32.9729C0.27027 33.2035 0.315644 33.4318 0.403774 33.6447C0.491904 33.8576 0.621046 34.0508 0.783751 34.2132C0.945955 34.3751 1.13832 34.5032 1.34982 34.5902C1.56132 34.6771 1.78779 34.7212 2.01625 34.7198C2.24471 34.7212 2.47118 34.6771 2.68268 34.5902C2.89418 34.5032 3.08654 34.3751 3.24875 34.2132L13.7858 23.7662L18.6984 18.8222L22.1702 15.3283C23.1388 16.3136 24.4558 16.8726 25.833 16.8831ZM12.5533 20.0626L7.9878 15.4505C5.4854 12.8977 3.91855 9.56539 3.54385 5.99932L15.0182 17.5295L12.5533 20.0626ZM23.3854 21.0584C23.0585 20.7271 22.6142 20.5401 22.1503 20.5384C21.6864 20.5368 21.2409 20.7207 20.9117 21.0496C20.5825 21.3786 20.3967 21.8257 20.395 22.2926C20.3934 22.7594 20.5761 23.2078 20.903 23.5391L31.8393 34.5451C32.1708 34.8488 32.6063 35.0115 33.0544 34.9994C33.2829 35.0007 33.5093 34.9566 33.7208 34.8697C33.9323 34.7827 34.1247 34.6546 34.2869 34.4927C34.4496 34.3303 34.5787 34.1371 34.6669 33.9242C34.755 33.7113 34.8004 33.483 34.8004 33.2524C34.8004 33.0217 34.755 32.7934 34.6669 32.5805C34.5787 32.3676 34.4496 32.1744 34.2869 32.012L23.3854 21.0584Z" fill="black" />
            </svg>
      </div>

      {/* Header Section */}
      <div className="newsletter-header">
        <h2>Join Our <span className="love">Food-Loving</span> Community</h2>
        <p>Thousands of users have already joined our community to discover and share their favorite recipes.</p>
      </div>

      {/* Sign-in Button */}
      <div className="newsletter-button">
        <button className="sign-in-btn">Join Now</button>
      </div>
    </section>


<Footer/>
    </>
  );
};

export default AboutUs;
