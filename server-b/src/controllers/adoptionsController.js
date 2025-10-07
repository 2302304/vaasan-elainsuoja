const pool = require('../config/database');

// Käsittele adoptiohakemus
const createAdoption = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { animal_id, applicant_name, email, phone, message } = req.body;

    // Validoi tiedot
    if (!animal_id || !applicant_name || !email || !phone) {
      return res.status(400).json({ error: 'Kaikki kentät ovat pakollisia' });
    }

    // Aloita transaktio
    await client.query('BEGIN');

    // Tarkista että eläin on vielä saatavilla
    const animalCheck = await client.query(
      'SELECT * FROM animals WHERE id = $1 FOR UPDATE',
      [animal_id]
    );

    if (animalCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Eläintä ei löytynyt' });
    }

    if (animalCheck.rows[0].status !== 'available') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Eläin on jo adoptoitu' });
    }

    // Tallenna adoptiohakemus
    const adoptionResult = await client.query(
      'INSERT INTO adoptions (animal_id, applicant_name, email, phone, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [animal_id, applicant_name, email, phone, message || '']
    );

    // Päivitä eläimen status
    await client.query(
      'UPDATE animals SET status = $1 WHERE id = $2',
      ['adopted', animal_id]
    );

    // Vahvista transaktio
    await client.query('COMMIT');

    res.status(201).json({
      message: 'Adoptiohakemus käsitelty onnistuneesti',
      adoption: adoptionResult.rows[0],
      animal: animalCheck.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Virhe adoptiohakemuksen käsittelyssä:', error);
    res.status(500).json({ error: 'Virhe adoptiohakemuksen käsittelyssä' });
  } finally {
    client.release();
  }
};

module.exports = {
  createAdoption
};