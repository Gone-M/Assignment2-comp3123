import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleSearch = () => {
    let filtered = employees;
    if (searchDepartment) {
      filtered = filtered.filter((employee) =>
        employee.department.toLowerCase().includes(searchDepartment.toLowerCase())
      );
    }
    if (searchPosition) {
      filtered = filtered.filter((employee) =>
        employee.position.toLowerCase().includes(searchPosition.toLowerCase())
      );
    }
    setFilteredEmployees(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/');
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Employee List
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/employees/add')}
            sx={{ fontWeight: 'bold', padding: '10px 20px' }}
          >
            Add Employee
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ fontWeight: 'bold', padding: '10px 20px' }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          gap: 2,
        }}
      >
        <TextField
          label="Search by Department"
          variant="outlined"
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
          fullWidth
        />
        <TextField
          label="Search by Position"
          variant="outlined"
          value={searchPosition}
          onChange={(e) => setSearchPosition(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearch}
          sx={{ fontWeight: 'bold', padding: '10px 20px' }}
        >
          Search
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Position</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5',
                }}
              >
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                    sx={{ marginRight: '10px' }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/employees/update/${employee._id}`)}
                    sx={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EmployeeList;
