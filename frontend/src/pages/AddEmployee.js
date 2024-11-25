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
} from '@mui/material';

function AddEmployee() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/employees', {
        name,
        department,
        position,
        salary,
      });
      alert('Employee added successfully!');
      navigate('/employees'); // Çalışan listesine yönlendirme
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Department"
              variant="outlined"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Position"
              variant="outlined"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Salary"
              variant="outlined"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
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
              Add Employee
            </Button>
            {/* Back to Employee List Button */}
            <Button
              variant="contained" // Outlined yerine contained kullandık
              size="large"
              fullWidth
              onClick={() => navigate('/employees')}
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#000', // Arka plan siyah
                color: '#fff', // Yazı rengi beyaz
                '&:hover': {
                  backgroundColor: '#333', // Hover durumunda biraz daha açık siyah
                },
              }}
            >
              Back to Employee List
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default AddEmployee;
