import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const SignUppage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const handleSignUp = async(e) => {
    e.preventDefault();
    console.log('Fullname:', fullName,'Username:', username, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
// Validate that all fields are filled
    if (!fullName || !username || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Reset error and show success message
    setError('');
    setSuccess('Registration successful!');

    // You can send the form data to an API or do additional handling here
    try {
      // Send the registration data to the backend API
      const response = await axios.post(`${baseUrl}/register`, {
        fullName,
        userName:username,
        emailId:email,
        password
      });
      
      // Success response
      if (response.data) {
        setSuccess('Registration successful! You can now log in.');
        setError('');
      }
    } catch (err) {
      // Handle error response
      if (err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('Something went wrong, please try again later');
      }
      setSuccess('');
    }

    // Clear the form fields
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100%' }}>
      {/* Left Side - Image Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#ebe8c0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: { xs: '200px', sm: '300px', md: '320px' },
            height: { xs: '200px', sm: '300px', md: '320px' },
            backgroundColor: '#fff',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/image1.svg"
            alt="Salad"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Grid>

      {/* Right Side - Form Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f8e9',
          padding: { xs: '2rem', md: '0' },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            width: { xs: '100%', sm: '90%', md: '80%' },
            maxWidth: 446,
            padding: '2rem',
            backgroundColor: '#ebe8c0',
            borderRadius: '18px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              mb: 3,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            SIGN UP
          </Typography>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <TextField
            label="Fullname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            sx={{
              backgroundColor: '#E7E4AB',
              borderRadius: '8px',
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: '#E7E4AB',
              borderRadius: '8px',
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: '#E7E4AB',
              borderRadius: '8px',
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: '#E7E4AB',
              borderRadius: '8px',
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              backgroundColor: '#E7E4AB',
              borderRadius: '8px',
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#000',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Sign up
          </Button>

          {/* <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              mb: 2,
              padding: '10px',
              color: '#333',
              borderRadius: '8px',
              fontWeight: 'bold',
              borderColor: '#ccc',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            Sign in with Google
          </Button> */}

          <Typography
            sx={{
              fontSize: '14px',
              color: '#666',
              mt: 2,
            }}
          >
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={{ color: '#1976d2', fontWeight: 'bold' }}
            >
              Login for free!
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUppage;


