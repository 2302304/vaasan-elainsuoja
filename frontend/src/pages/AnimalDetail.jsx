import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimalById, adoptAnimal } from '../services/api';

function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    try {
      const data = await getAnimalById(id);
      setAnimal(data);
      setLoading(false);
    } catch (err) {
      setError('Virhe eläimen haussa');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adoptAnimal(id, formData);
      navigate('/thank-you');
    } catch (err) {
      alert('Virhe adoptiohakemuksessa: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div style={styles.center}>Ladataan...</div>;
  if (error) return <div style={styles.center}>{error}</div>;
  if (!animal) return <div style={styles.center}>Eläintä ei löytynyt</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Takaisin
      </button>
      
      <div style={styles.content}>
        <div style={styles.imageSection}>
          <img 
            src={animal.image_url || 'https://via.placeholder.com/400x400?text=Ei+kuvaa'} 
            alt={animal.name}
            style={styles.image}
          />
        </div>
        
        <div style={styles.infoSection}>
          <h1>{animal.name}</h1>
          <p><strong>Tyyppi:</strong> {animal.type}</p>
          <p><strong>Ikä:</strong> {animal.age} vuotta</p>
          <p><strong>Rotu:</strong> {animal.breed}</p>
          <p><strong>Kuvaus:</strong> {animal.description}</p>
          <p style={animal.status === 'available' ? styles.available : styles.adopted}>
            {animal.status === 'available' ? '✅ Saatavilla adoptointiin' : '❌ Jo adoptoitu'}
          </p>
        </div>
      </div>

      {animal.status === 'available' && (
        <div style={styles.formSection}>
          <h2>Adoptiolomake</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Nimi *</label>
              <input
                type="text"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Sähköposti *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Puhelin *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Viesti</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Adoptoi minut!
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  backButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    gap: '40px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  imageSection: {
    flex: '1',
    minWidth: '300px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  infoSection: {
    flex: '1',
    minWidth: '300px',
  },
  available: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  adopted: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '5px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '5px',
    fontFamily: 'inherit',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5rem',
  },
};

export default AnimalDetail;