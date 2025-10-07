const express = require('express');
const router = express.Router();
const { getAllAnimals, getAnimalById } = require('../controllers/animalsController');
const { adoptAnimal } = require('../controllers/adoptController');

// GET /api/animals - Hae kaikki eläimet
router.get('/', getAllAnimals);

// GET /api/animals/:id - Hae yksittäinen eläin
router.get('/:id', getAnimalById);

// POST /api/animals/:id/adopt - Adoptoi eläin
router.post('/:id/adopt', adoptAnimal);

module.exports = router;