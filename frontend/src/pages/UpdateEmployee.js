import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
  });

  // Çalışan bilgilerini backend'den al
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to fetch employee');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Update Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              variant="outlined"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Department"
              variant="outlined"
              value={employee.department}
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Position"
              variant="outlined"
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Salary"
              variant="outlined"
              type="number"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
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
              Update Employee
            </Button>
            {/* Back to Employee List Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/employees')}
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#000', // Siyah arka plan
                color: '#fff', // Beyaz yazı rengi
                '&:hover': {
                  backgroundColor: '#333', // Hover durumunda gri ton
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

export default UpdateEmployee;
