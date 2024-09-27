import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/navbar.css'; // Importando o CSS da Navbar

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
        <li>
          <Link
            to="/register-team"
            className={location.pathname === '/register-team' ? 'active' : ''}
          >
            Cadastro de Time
          </Link>
        </li>
        <li>
          <Link
            to="/register-coach"
            className={location.pathname === '/register-coach' ? 'active' : ''}
          >
            Cadastro de Treinador
          </Link>
        </li>
        <li>
          <Link
            to="/register-player"
            className={location.pathname === '/register-player' ? 'active' : ''}
          >
            Cadastro de Jogador
          </Link>
        </li>
        <li>
          <Link
            to="/matches"
            className={location.pathname === '/matches' ? 'active' : ''}
          >
            Partidas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
