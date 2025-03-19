import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../index.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="nav-brand">
        <NavLink to="/" className="nav-logo">
          🚢 Battleship
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/rules" 
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          Rules
        </NavLink>
        <NavLink 
          to="/highscores" 
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          High Scores
        </NavLink>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navbar;