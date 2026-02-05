import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapaNemovitosti from './pages/MapaNemovitosti';
import AnalyzaUzemi from './pages/AnalyzaUzemi';
import HledacLokaci from './pages/HledacLokaci';
import ONas from './pages/ONas';
import Kontakt from './pages/Kontakt';
import Pricing from './components/Pricing';

function PricingPage() {
  return (
    <div className="py-24">
      <Pricing />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mapa-nemovitosti" element={<MapaNemovitosti />} />
          <Route path="analyza-uzemi" element={<AnalyzaUzemi />} />
          <Route path="hledac-lokaci" element={<HledacLokaci />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="o-nas" element={<ONas />} />
          <Route path="kontakt" element={<Kontakt />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
