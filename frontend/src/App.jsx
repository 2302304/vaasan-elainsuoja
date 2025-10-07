import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AnimalDetail from './pages/AnimalDetail';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animal/:id" element={<AnimalDetail />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
  },
};

export default App;