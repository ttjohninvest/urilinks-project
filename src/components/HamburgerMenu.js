import React, { useState } from 'react';
import './HamburgerMenu.css'; // Make sure to create this CSS file

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      {/* Hamburger Icon/Button */}
      <button className="hamburger-icon" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={isOpen ? 'line line1 open' : 'line line1'}></div>
        <div className={isOpen ? 'line line2 open' : 'line line2'}></div>
        <div className={isOpen ? 'line line3 open' : 'line line3'}></div>
      </button>

      {/* Menu Links */}
      <nav className={isOpen ? 'menu-links open' : 'menu-links'}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;