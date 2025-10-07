import { useNavigate } from 'react-router-dom';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h1 style={styles.title}>Kiitos adoptiohakemuksestasi!</h1>
        <p style={styles.text}>
          Adoptiohakemuksesi on vastaanotettu ja tallennettu järjestelmäämme.
        </p>
        <p style={styles.text}>
          Otamme sinuun yhteyttä pian ja sovimme tapaamisen eläimen kanssa.
        </p>
        <button onClick={() => navigate('/')} style={styles.button}>
          Palaa etusivulle
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '600px',
  },
  icon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px',
  },
  text: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    marginBottom: '15px',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
    marginTop: '20px',
  },
};

export default ThankYou;