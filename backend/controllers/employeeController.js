const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Tüm çalışanları veritabanından al
    res.json(employees); // JSON olarak geri gönder
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// ID'ye göre çalışan getir
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch employee' });
  }
};

// Çalışan güncelle
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update employee' });
  }
};

// Çalışan sil
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete employee' });
  }
};

// Çalışanları filtrele
exports.searchEmployees = async (req, res) => {
  const filters = {};
  if (req.query.department) filters.department = req.query.department;
  if (req.query.position) filters.position = req.query.position;

  try {
    const employees = await Employee.find(filters);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to search employees' });
  }
};
