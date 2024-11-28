import React, { useState } from 'react'
import './NavBar.css'
import { IoSearch, IoClose } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  return (
     <div className='outer-nav'>
        {/* <div className='cap'></div> */}
        <div className='navbar'>
              <div className='navbar-contents'>
                    <div className='logo'><img src="/assets/recipe-logo.png" alt="logo"/></div>
                          <div >
                            <ul className='ul-list'>
                              <li><a href="#" className='link'>Home</a></li>
                              <li><a href="#" className='link'>Recipies</a></li>
                              <li><a href="#" className='link'>About Us</a></li>
                            </ul>
                          </div>

                          <div className='search-icon'>
                            {/* <p>search</p> */}
                            <IoSearch />
                            {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}
                          </div>

                          <div className='menu-bar'>
                            { isMenuOpen ? <IoClose onClick={toggleMenu} /> : <FiAlignJustify onClick={toggleMenu} />}
                            {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}
                          </div>
              </div>
        </div>
       {
        isMenuOpen &&  
        <div className='ul-list-hidden'>
          <hr />
            <ul>
                <li><a href="#" className='link'>Home</a></li>
                <li><a href="#" className='link'>Recipies</a></li>
                <li><a href="#" className='link'>About Us</a></li>
            </ul>
        </div>
       }
      {/* <div>wioedjewo</div> */}
     </div> 
  )
}

export default NavBar