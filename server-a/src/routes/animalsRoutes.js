const express = require('express');
const router = express.Router();
const { getAllAnimals, getAnimalById } = require('../controllers/animalsController');

// GET /api/animals - Hae kaikki eläimet
router.get('/', getAllAnimals);

// GET /api/animals/:id - Hae yksittäinen eläin
router.get('/:id', getAnimalById);

module.exports = router;