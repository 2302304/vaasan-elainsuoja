const express = require('express');
const router = express.Router();
const { createAdoption } = require('../controllers/adoptionsController');

// POST /api/adoptions - Luo uusi adoptiohakemus
router.post('/', createAdoption);

module.exports = router;