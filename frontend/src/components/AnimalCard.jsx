import { Link } from 'react-router-dom';

function AnimalCard({ animal }) {
  return (
    <div style={styles.card}>
      <img 
        src={animal.image_url || 'https://via.placeholder.com/300x200?text=Ei+kuvaa'} 
        alt={animal.name}
        style={styles.image}
      />
      <div style={styles.content}>
        <h3>{animal.name}</h3>
        <p><strong>Tyyppi:</strong> {animal.type}</p>
        <p><strong>Ikä:</strong> {animal.age} vuotta</p>
        <p><strong>Rotu:</strong> {animal.breed}</p>
        <p style={styles.status}>
          {animal.status === 'available' ? '✅ Saatavilla' : '❌ Adoptoitu'}
        </p>
        <Link to={`/animal/${animal.id}`}>
          <button style={styles.button}>Katso lisää</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  content: {
    marginTop: '12px',
  },
  status: {
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '8px',
  },
};

export default AnimalCard;