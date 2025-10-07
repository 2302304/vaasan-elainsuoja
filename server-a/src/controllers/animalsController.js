const pool = require('../config/database');

// Hae kaikki eläimet
const getAllAnimals = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM animals ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Virhe eläinten haussa:', error);
    res.status(500).json({ error: 'Virhe eläinten haussa' });
  }
};

// Hae yksittäinen eläin
const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM animals WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Eläintä ei löytynyt' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Virhe eläimen haussa:', error);
    res.status(500).json({ error: 'Virhe eläimen haussa' });
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById
};