import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  return (
    <header className="universal-header-section">
      <div className="universal-header-container">
        <div className="universal-header-hamburger">
          <div id="hamburger" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span id="hamburger-line-1" className={`hamburger-span ${showMobileMenu ? 'active' : ''}`} />
            <span id="hamburger-line-2" className={`hamburger-span ${showMobileMenu ? 'active' : ''}`} />
          </div>
        </div>
        <div className="universal-header-logo">
          <Link to="/">GOLOC.</Link>
        </div>
        <div className="universal-header-basket">
          <button onClick={() => ()=>{}}>Search</button>
          <button onClick={() => ()=>{}}>Cart</button>
          {cartCount && <span>{cartCount}</span>}
        </div>
      </div>
      <div id="hamburger-nav-list" className={showMobileMenu ? 'active' : ''}>
        <div className="hamburger-container">
          <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
          <Link to="/about" onClick={() => setShowMobileMenu(false)}>About</Link>
          <Link to="/login" onClick={() => setShowMobileMenu(false)}>Login</Link>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;   