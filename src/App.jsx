import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import AvailableHomes from './pages/AvailableHomes';
import PastProjects from './pages/PastProjects';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/available-homes" element={<AvailableHomes />} />
        <Route path="/past-projects" element={<PastProjects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
