const pool = require('../config/database');
const axios = require('axios');

const SERVER_B_URL = process.env.SERVER_B_URL || 'http://localhost:3002';

// Käsittele adoptiohakemus
const adoptAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicant_name, email, phone, message } = req.body;

    // Tarkista että eläin on olemassa ja available
    const animalCheck = await pool.query(
      'SELECT * FROM animals WHERE id = $1',
      [id]
    );

    if (animalCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Eläintä ei löytynyt' });
    }

    if (animalCheck.rows[0].status !== 'available') {
      return res.status(400).json({ error: 'Eläin on jo adoptoitu' });
    }

    // Validoi lomakkeen tiedot
    if (!applicant_name || !email || !phone) {
      return res.status(400).json({ error: 'Kaikki kentät ovat pakollisia' });
    }

    // Lähetä adoptiohakemus Server B:lle
    const adoptionData = {
      animal_id: id,
      applicant_name,
      email,
      phone,
      message: message || ''
    };

    const response = await axios.post(`${SERVER_B_URL}/api/adoptions`, adoptionData);

    res.json({
      message: 'Adoptiohakemus lähetetty onnistuneesti!',
      adoption: response.data
    });

  } catch (error) {
    console.error('Virhe adoptiohakemuksessa:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Adoptiopalvelu ei ole käytettävissä' });
    }
    
    res.status(500).json({ error: 'Virhe adoptiohakemuksessa' });
  }
};

module.exports = {
  adoptAnimal
};