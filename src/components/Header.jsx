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
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/available-homes">Available Homes</Link>
        <Link to="/past-projects">Past Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
