const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'elainsuoja_db',
  user: process.env.DB_USER || 'elainsuoja',
  password: process.env.DB_PASSWORD || 'salasana123'
});

pool.on('connect', () => {
  console.log('Server B: Tietokantayhteys muodostettu');
});

pool.on('error', (err) => {
  console.error('Server B: Odottamaton virhe tietokantayhteydessä', err);
  process.exit(-1);
});

module.exports = pool;