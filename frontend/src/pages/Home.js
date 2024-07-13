import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/home.css';
import logo from '../assets/images/logo.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="home-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="home-main">
        <div className="home-content">
          <h1 className="home-title">Digitalize a sua gestão de atletas...</h1>
          <p className="home-text">
            "Capture cada detalhe de seus atletas com nossa avançada ferramenta de banco de dados digital.
            <br />
            Ideal para observação técnica, avaliação de desempenho e desenvolvimento individual e Intuitiva.
            <br />
            Eleve o potencial dos seus jogadores e domine o campo com insights precisos e análises detalhadas."
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
