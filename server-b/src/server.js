const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adoptionsRoutes = require('./routes/adoptionsRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Tervehdys
app.get('/', (req, res) => {
  res.json({ message: 'Vaasan Eläinsuoja API - Server B (Adoptiopalvelin)' });
});

// Reitit
app.use('/api/adoptions', adoptionsRoutes);

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Server B käynnissä portissa ${PORT}`);
});