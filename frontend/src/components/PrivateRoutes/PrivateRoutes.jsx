// src/components/PrivateRoute.js
import React, { useContext, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../../context/UserProvider';  // Import UserContext to check authentication
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element: Element, roleRequired, ...rest }) => {
  // const { userId, role } = useContext(UserProvider);  // Get userId from context
  const token = localStorage.getItem('accessToken');
  const userId = jwtDecode(localStorage.getItem('accessToken')).user._id;
  const role = jwtDecode(localStorage.getItem('accessToken')).user.role;

  console.log(token)
  console.log(userId)
console.log(userId)
  if (!userId) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" />;
  }
  if (roleRequired && role !== roleRequired) {
    // If user doesn't have the required role, redirect to unauthorized page
    return <Navigate to="/" />;
  }

  
  // Otherwise, render the protected component
  return <Element {...rest} />;
};

export default PrivateRoute;