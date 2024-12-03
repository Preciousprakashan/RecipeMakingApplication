import React from 'react'
import './Footer.css'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
       <footer className="footer">
      {/* Quote Section */}
      <div className="quote-section">
        <p className="quote-text">
            "People who love to eat are always the best people."
         </p>
        <p className="quote-author">- Julia Child</p>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <a href="#" className="category-link">About</a>
        <a href="#" className="category-link">Recipies</a>
        <a href="#" className="category-link">Contact</a>
        
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Logo and Social Media Section */}
      <div className="footer-bottom">
        {/* Logo */}
        <div className="logo">
          <img src="/assets/recipe-logo.png" alt="logo" />
        </div>

        {/* Social Media Icons */}
        <div className="social-media">
          <a href="#" className="social-icon"><FaFacebookF/></a>
          <a href="#" className="social-icon"><FaInstagram/></a>
        </div>
      </div>
    </footer>
        
    </div>
  )
}

export default Footer