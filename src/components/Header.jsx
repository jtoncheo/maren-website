import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/jmaren.png';
import "./Header.css"


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">

      <div class = "left-section">
          <div className="navbar-logo">
            <img src= {logo} alt="Logo" />
          </div>
          <span class = "location-text">HOUSTON,TX | info@jmaren.com</span>
      </div>
      {/* <div className="navbar-logo">
        <img src= {logo} alt="Logo" />
      </div> */}


      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`bar ${menuOpen ? 'rotate1' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'fade' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'rotate2' : ''}`}></span>
      </div>

      <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href="/available-homes">Available Homes</a>
        <a href="/past-projects">Past Projects</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
