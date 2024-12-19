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
    const [loading, setLoading] = useState(false); // For managing loading state during API call
    const [error, setError] = useState(null); // For managing errors during login
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    // On initial load, try to get the user data from localStorage
    useEffect(() => {
        // On initial load, try to get the user data from localStorage
        //  setToken(localStorage.getItem('accessToken'));
        console.log(token);
        
        if (token) {
            // setUserId(jwtDecode(localStorage.getItem('accessToken')).user._id); // Set the user id in state if found in localStorage
            // setRole(jwtDecode(localStorage.getItem('accessToken')).user.role); // Set the user id in state if found in localStorage
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

    // const login = (userData) => {
    //     localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    //     setUser(userData); // Set the user data in state
    // };
    // Login function to authenticate the user using API
//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null); // Reset previous errors

//     try {
//       // Make API call for login
//       const response = await axios.post(`${baseUrl}/login`, { emailId:email, password });

//       if (response.data.access_token) {
//         // Store the token in localStorage
//         localStorage.setItem('accessToken', response.data.access_token);
//         setToken(response.data.access_token); // Update token state

//         // Decode the token to get user details
//         const decodedToken = jwtDecode(response.data.access_token);
//         setUserId(decodedToken.user._id); // Set the user ID
//         setRole(decodedToken.user.role); // Set the user role

//         setLoading(false); // End loading
//       } else {
//         setError('Invalid credentials, please try again.'); // Handle failed login
//         setLoading(false); // End loading
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Something went wrong, please try again.'); // Handle error
//       setLoading(false); // End loading
//     }
//   };
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
