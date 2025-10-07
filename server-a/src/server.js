const express = require('express');
const cors = require('cors');
require('dotenv').config();

const animalsRoutes = require('./routes/animalsRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Tervehdys
app.get('/', (req, res) => {
  res.json({ message: 'Vaasan Eläinsuoja API - Server A' });
});

// Reitit
app.use('/api/animals', animalsRoutes);

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Server A käynnissä portissa ${PORT}`);
});