import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Provider component to wrap around your app
const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    // const [token, setToken] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null); // Retrieve token from localStorage
    // On initial load, try to get the user data from localStorage
    useEffect(() => {
        // On initial load, try to get the user data from localStorage
       
        if (token) {
           
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user._id); // Set the user ID in state
                setRole(decodedToken.user.role); // Set the user role in state
              } catch (error) {
                console.error('Error decoding token:', error);
                logout(); // Clear data if token is invalid
              }
        }
    }, [token]);

    const logout = () => {
        localStorage.removeItem('accessToken'); // Remove user data from localStorage
        setToken(null);
        setUserId(null); // Clear user data in state
        setRole(null);
    };

    return (
        <UserContext.Provider value={{ token, userId, role, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
