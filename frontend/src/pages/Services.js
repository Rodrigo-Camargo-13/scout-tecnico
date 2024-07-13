import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/services.css';
import logo from '../assets/images/logo.png';
import fundoServices from '../assets/images/fundo_services.png';
import iconeScoutJogador from '../assets/images/icone_scout_jogador.png';
import iconeScoutTime from '../assets/images/icone_scout_time.png';
import iconeScoutTreinador from '../assets/images/icone_scout_treinador.png';

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="services-page" style={{ backgroundImage: `url(${fundoServices})` }}>
      <header className="services-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="services-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={true} />
      </header>
      <main className="services-main">
        <h1 className="services-title">Por que utilizar nossos serviços</h1>
        <p className="services-text text-center">
          Bem-vindo à nossa página de Serviços, onde transformamos potencial em desempenho! <p></p>Na nossa empresa, estamos comprometidos em fornecer soluções de ponta que impulsionam o sucesso dos seus atletas e equipes.
        </p>
        <div className="services-boxes">
          <div className="services-box" onClick={() => navigate('/scout-jogadores')}>
            <img 
              src={iconeScoutJogador} 
              alt="Scout Jogadores" 
              className="services-icon" 
            />
            <h3 className="services-box-title">Scout Jogadores</h3>
            <button className="services-button">Know more</button>
          </div>
          <div className="services-box" onClick={() => navigate('/scout-equipes')}>
            <img 
              src={iconeScoutTime} 
              alt="Scout Times" 
              className="services-icon" 
            />
            <h3 className="services-box-title">Scout Equipes</h3>
            <button className="services-button">Know more</button>
          </div>
          <div className="services-box" onClick={() => navigate('/scout-treinadores')}>
            <img 
              src={iconeScoutTreinador} 
              alt="Scout Treinadores" 
              className="services-icon" 
            />
            <h3 className="services-box-title">Scout Treinadores</h3>
            <button className="services-button">Know more</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
