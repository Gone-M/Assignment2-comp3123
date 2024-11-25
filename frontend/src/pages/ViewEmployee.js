import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Failed to fetch employee details');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employee) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
        Employee not found
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: '600px',
          width: '100%',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Employee Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Name:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            {employee.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Department:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            {employee.department}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Position:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            {employee.position}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Salary:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            ${employee.salary}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '10px',
            fontWeight: 'bold',
            backgroundColor: '#007bff',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
          onClick={() => navigate('/employees')}
        >
          Back to Employee List
        </Button>
      </Paper>
    </Box>
  );
}

export default ViewEmployee;
