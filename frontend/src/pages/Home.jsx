import { useState, useEffect } from 'react';
import { getAllAnimals } from '../services/api';
import AnimalCard from '../components/AnimalCard';

function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hakuparametrit
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async (params = {}) => {
    try {
      setLoading(true);
      const data = await getAllAnimals(params);
      setAnimals(data);
      setLoading(false);
    } catch (err) {
      setError('Virhe eläinten haussa');
      setLoading(false);
      console.error(err);
    }
  };

  const handleSearch = () => {
    const params = {};
    if (searchText) params.search = searchText;
    if (selectedType) params.type = selectedType;
    if (selectedStatus) params.status = selectedStatus;
    if (sortBy) params.sort = sortBy;
    
    fetchAnimals(params);
  };

  const handleReset = () => {
    setSearchText('');
    setSelectedType('');
    setSelectedStatus('');
    setSortBy('');
    fetchAnimals();
  };

  if (loading) return <div style={styles.center}>Ladataan...</div>;
  if (error) return <div style={styles.center}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vaasan Eläinsuoja</h1>
      <p style={styles.subtitle}>Adoptoitavat eläimet</p>
      
      {/* HAKUPALKIN ALUE */}
      <div style={styles.searchBar}>
        {/* Tekstihaku */}
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="🔍 Etsi eläintä (nimi tai kuvaus)..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Hae
          </button>
        </div>

        {/* Tyyppisuodatus */}
        <div style={styles.filterRow}>
          <span style={styles.filterLabel}>Tyyppi:</span>
          <button
            onClick={() => { setSelectedType(''); handleSearch(); }}
            style={selectedType === '' ? styles.filterButtonActive : styles.filterButton}
          >
            Kaikki
          </button>
          <button
            onClick={() => { setSelectedType('koira'); }}
            style={selectedType === 'koira' ? styles.filterButtonActive : styles.filterButton}
          >
            🐕 Koira
          </button>
          <button
            onClick={() => { setSelectedType('kissa'); }}
            style={selectedType === 'kissa' ? styles.filterButtonActive : styles.filterButton}
          >
            🐱 Kissa
          </button>
          <button
            onClick={() => { setSelectedType('kani'); }}
            style={selectedType === 'kani' ? styles.filterButtonActive : styles.filterButton}
          >
            🐰 Kani
          </button>
          <button
            onClick={() => { setSelectedType('lintu'); }}
            style={selectedType === 'lintu' ? styles.filterButtonActive : styles.filterButton}
          >
            🦜 Lintu
          </button>
        </div>

        {/* Status-suodatus */}
        <div style={styles.filterRow}>
          <span style={styles.filterLabel}>Status:</span>
          <button
            onClick={() => { setSelectedStatus(''); handleSearch(); }}
            style={selectedStatus === '' ? styles.filterButtonActive : styles.filterButton}
          >
            Kaikki
          </button>
          <button
            onClick={() => { setSelectedStatus('available'); }}
            style={selectedStatus === 'available' ? styles.filterButtonActive : styles.filterButton}
          >
            ✅ Saatavilla
          </button>
          <button
            onClick={() => { setSelectedStatus('adopted'); }}
            style={selectedStatus === 'adopted' ? styles.filterButtonActive : styles.filterButton}
          >
            ❌ Adoptoidut
          </button>
        </div>

        {/* Järjestys */}
        <div style={styles.filterRow}>
          <span style={styles.filterLabel}>Järjestä:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="">Oletus</option>
            <option value="age_asc">Ikä (nuorin ensin)</option>
            <option value="age_desc">Ikä (vanhin ensin)</option>
            <option value="name_asc">Nimi (A-Z)</option>
            <option value="name_desc">Nimi (Z-A)</option>
            <option value="likes_desc">Suosituimmat ensin</option>
          </select>
          <button onClick={handleReset} style={styles.resetButton}>
            Tyhjennä suodattimet
          </button>
        </div>
      </div>

      {/* Tuloslaskuri */}
      <div style={styles.resultsInfo}>
        Löytyi <strong>{animals.length}</strong> eläintä
      </div>

      {/* Eläinkortit */}
      {animals.length === 0 ? (
        <div style={styles.noResults}>
          <h3>😞 Ei löytynyt yhtään eläintä</h3>
          <p>Kokeile muuttaa hakuehtoja tai tyhjennä suodattimet.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
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
    marginBottom: '10px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  searchBar: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  searchRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  searchInput: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
  },
  searchButton: {
    padding: '12px 30px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  filterLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: '80px',
  },
  filterButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    border: '2px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: '2px solid #3498db',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  select: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: 'auto',
  },
  resultsInfo: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  noResults: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginTop: '20px',
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