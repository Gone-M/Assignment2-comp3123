import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/employees');
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ fontWeight: 'bold' }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3 }}
        >
          Don't have an account?{' '}
          <Link
            onClick={() => navigate('/signup')}
            underline="hover"
            sx={{
              color: 'blue',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
