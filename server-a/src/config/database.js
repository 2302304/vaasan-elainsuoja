const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://elainsuoja:salasana123@localhost:5432/elainsuoja_db'
});

pool.on('connect', () => {
  console.log('Tietokantayhteys muodostettu');
});

pool.on('error', (err) => {
  console.error('Odottamaton virhe tietokantayhteydessä', err);
  process.exit(-1);
});

module.exports = pool;