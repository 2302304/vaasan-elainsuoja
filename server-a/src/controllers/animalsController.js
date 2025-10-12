const pool = require('../config/database');

// Hae kaikki eläimet (nyt hakutoiminnolla!)
const getAllAnimals = async (req, res) => {
  try {
    // Haetaan query parametrit
    const { search, type, status, sort } = req.query;
    
    // Rakennetaan SQL-kysely dynaamisesti
    let query = 'SELECT * FROM animals WHERE 1=1';
    const params = [];
    let paramCount = 0;

    // Tekstihaku (nimi tai kuvaus)
    if (search) {
      paramCount++;
      query += ` AND (LOWER(name) LIKE $${paramCount} OR LOWER(description) LIKE $${paramCount})`;
      params.push(`%${search.toLowerCase()}%`);
    }

    // Tyyppisuodatus
    if (type) {
      paramCount++;
      query += ` AND LOWER(type) = $${paramCount}`;
      params.push(type.toLowerCase());
    }

    // Status-suodatus
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    // Järjestys
    if (sort === 'age_asc') {
      query += ' ORDER BY age ASC';
    } else if (sort === 'age_desc') {
      query += ' ORDER BY age DESC';
    } else if (sort === 'name_asc') {
      query += ' ORDER BY name ASC';
    } else if (sort === 'name_desc') {
      query += ' ORDER BY name DESC';
    } else if (sort === 'likes_desc') {
      query += ' ORDER BY likes DESC';
    } else {
      query += ' ORDER BY id ASC'; // Oletusjärjestys
    }

    const result = await pool.query(query, params);
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