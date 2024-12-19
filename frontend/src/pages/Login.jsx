import React, { useState } from 'react';
import { TextField, Button, Checkbox, Typography, Box, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    try{

      const response = await axios.post(`${baseUrl}/login`,{
        emailId:email,
        password
      });
      // If login is successful, save the token and navigate
      if (response.data.access_token) {
        const access_token = response.data.access_token;
        localStorage.clear();  // Clears all items in localStorage
        localStorage.setItem('accessToken', encodeURIComponent(String(access_token)));
        alert("Login Successfull")
        
        console.log(response.data.role)
        if(response.data.role === 'admin') {
            navigate('/admin-page'); // Redirect to protected route after login
            window.location.reload();
        } else {
            navigate('/')
            window.location.reload();

        }
      }
      localStorage.setItem('access_token',response.access_token);

    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }

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
          onSubmit={handleLogin}
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
            LOGIN
          </Typography>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{ padding: '0', color: '#333' }}
              />
              <Typography sx={{ ml: 1, fontSize: '14px', color: '#555' }}>
                Remember me
              </Typography>
            </Box> */}
            {/* <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '14px',
                color: '#7a7a7a',
              }}
            >
              Forgot password?
            </Link> */}
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
            Don’t have an account?{' '}
            <Link
              component={RouterLink}
              to="/sign-up"
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
