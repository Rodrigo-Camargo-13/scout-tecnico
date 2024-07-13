import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/news.css';
import logo from '../assets/images/logo.png';
import vasco from '../assets/images/vasco.png';
import saoPaulo from '../assets/images/sao_paulo.png';
import corinthians from '../assets/images/corinthias.png';

const News = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'News', path: '/news' },
  ];

  return (
    <div className="news-page">
      <header className="news-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="news-logo" 
          onClick={() => navigate('/')} 
        />
        <nav className="navbar-container">
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="news-main">
        <div className="news-item vasco">
          <img src={vasco} alt="Vasco" />
          <p className="news-title vasco-title">Vasco derrota internacional por 2x1 em pleno estádio do Beira Rio</p>
          <a href="https://ge.globo.com/futebol/times/vasco/noticia/2024/07/09/bastidores-tem-homenagem-de-pedrinho-a-vegetti-a-gente-esta-mudando-a-energia-do-vasco.ghtml" className="news-link">Read More</a>
        </div>
        <div className="news-item sao-paulo">
          <img src={saoPaulo} alt="São Paulo" />
          <p className="news-title sao-paulo-title">Casares diz que James pode ser reintegrado ao São Paulo: "Decisão é técnica"</p>
          <a href="https://ge.globo.com/futebol/times/sao-paulo/noticia/2024/07/09/casares-diz-que-james-pode-ser-reintegrado-ao-sao-paulo-decisao-e-tecnica.ghtml" className="news-link">Read More</a>
        </div>
        <div className="news-item corinthians">
          <img src={corinthians} alt="Corinthians" />
          <p className="news-title corinthians-title">António se despede do Corinthians e dá recado: "Devíamos querer, cumprir e fazer todos"</p>
          <a href="https://ge.globo.com/futebol/times/corinthians/noticia/2024/07/09/antonio-se-despede-do-corinthians-e-da-recado-deviamos-querer-cumprir-e-fazer-todos.ghtml" className="news-link">Read More</a>
        </div>
      </main>
    </div>
  );
};

export default News;
