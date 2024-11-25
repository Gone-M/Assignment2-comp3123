const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // Kullanıcı rotaları
const employeeRoutes = require('./routes/employeeRoutes'); // Çalışan rotaları

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON body'leri parse etmek için

// Rotaları bağlayın
app.use('/api/users', userRoutes); // '/api/users' için kullanıcı rotaları
app.use('/api/employees', employeeRoutes); // '/api/employees' için çalışan rotaları

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server başlatma
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
