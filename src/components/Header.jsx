import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/jmaren.png';
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="left-section">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <span className="location-text">
          HOUSTON, TX | info@jmaren.com
        </span>
      </div>

      {/* Hamburger OR X */}
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/available-homes" onClick={() => setMenuOpen(false)}>Available Homes</Link>
        <Link to="/past-projects" onClick={() => setMenuOpen(false)}>Past Projects</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
