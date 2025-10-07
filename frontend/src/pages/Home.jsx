import { useState, useEffect } from 'react';
import { getAllAnimals } from '../services/api';
import AnimalCard from '../components/AnimalCard';

function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const data = await getAllAnimals();
      setAnimals(data);
      setLoading(false);
    } catch (err) {
      setError('Virhe eläinten haussa');
      setLoading(false);
      console.error(err);
    }
  };

  if (loading) return <div style={styles.center}>Ladataan...</div>;
  if (error) return <div style={styles.center}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vaasan Eläinsuoja</h1>
      <p style={styles.subtitle}>Adoptoitavat eläimet</p>
      <div style={styles.grid}>
        {animals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2.5rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5rem',
  },
};

export default Home;