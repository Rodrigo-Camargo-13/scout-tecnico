import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/navbar.css';

const Navbar = ({ showServices }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        {showServices && (
          <li>
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''}
            >
              Services
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/login"
            className={location.pathname === '/login' ? 'active' : ''}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/news"
            className={location.pathname === '/news' ? 'active' : ''}
          >
            News
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
