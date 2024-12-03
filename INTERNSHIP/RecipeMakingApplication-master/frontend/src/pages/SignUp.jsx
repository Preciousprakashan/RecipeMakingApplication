import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link

const SignUppage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
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
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: '50%', md: 'calc(90%)' },
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px',
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
            src="/assets/image1.svg" // Replace with actual image URL
            alt="Salad"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
        }}
      >
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            width: '80%',
            maxWidth: 400,
            padding: '2rem',
            backgroundColor: '#ebe8c0',
            borderRadius: '16px',
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

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
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
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
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

          <Button
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
          </Button>

          <Typography sx={{ fontSize: '14px', color: '#666', mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="none" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Login for free!
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUppage;

