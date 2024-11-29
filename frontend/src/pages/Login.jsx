import React, { useState } from 'react';
import { TextField, Button, Checkbox, Typography, Box, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom'; // Import React Router Link

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember Me:', rememberMe);
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
    flexDirection: { xs: 'column', md: 'row' }, // Stacks vertically on small screens, horizontal on medium and larger
    backgroundColor: '#f9f8e9',
    padding: { xs: '2rem', md: '0' }, // Adds padding for smaller screens
  }}
>
  <Box
    component="form"
    onSubmit={handleLogin}
    sx={{
      width: '80%',
      maxWidth: 400,
      padding: '2rem',
      backgroundColor: '#ebe8c0',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      margin: { xs: '1rem 0', md: '0 2rem' }, // Adds vertical margin on small screens and horizontal margin on larger
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
      LOGIN
    </Typography>

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

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          sx={{ padding: '0', color: '#333' }}
        />
        <Typography sx={{ ml: 1, fontSize: '14px', color: '#555' }}>Remember me</Typography>
      </Box>
      <Link
        href="#"
        underline="none"
        sx={{
          fontSize: '14px',
          color: '#7a7a7a',
        }}
      >
        Forgot password?
      </Link>
    </Box>

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
      Login
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

    <Typography
      sx={{
        fontSize: '14px',
        color: '#666',
        mt: 2,
      }}
    >
      Don’t have an account?{' '}
      <Link
        component={RouterLink} // Use React Router Link for navigation
        to="/sign-up" // Route to the SignUp page
        underline="none"
        sx={{ color: '#1976d2', fontWeight: 'bold' }}
      >
        Sign up for free!
      </Link>
    </Typography>
  </Box>
</Grid>

    </Grid>
  );
};

export default Loginpage;

