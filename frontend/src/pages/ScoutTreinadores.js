import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/scout-treinadores.css';
import logo from '../assets/images/logo.png';
import fundoScout from '../assets/images/fundo_scout.png';
import lupa from '../assets/images/lupa.png';
import filtro from '../assets/images/filtro.png';
import sinalMais from '../assets/images/sinal_mais.png';

const ScoutTreinadores = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [coachData, setCoachData] = useState(null);
  const [message, setMessage] = useState('Você não possui nenhum treinador na sua lista de monitoramento ainda. Adicione seu primeiro treinador clicando no botão acima.');

  const handleSearchClick = () => {
    if (searchText === 'Procurar por nome') {
      setSearchText('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterClick = () => {
    const normalizedSearchText = searchText.trim().toLowerCase();
    if (normalizedSearchText === 'abel' || normalizedSearchText === 'abel ferreira') {
      const data = {
        nome: 'Abel Ferreira',
        idade: 45,
        equipe: 'Palmeiras',
        tatica: '3-4-3',
        substituicoes: 'Estratégica',
        lideranca: '98%',
        jogadasEnsaiadas: '30%',
        vitorias: 25,
        rating: 85,
      };
      setCoachData(data);
      setMessage('O treinador está na sua lista de monitoramento. Os dados do treinador estão no relatório de jogo ao lado do perfil de um treinador.');
    } else {
      setCoachData(null);
      setMessage('Você não possui nenhum treinador na sua lista de monitoramento ainda. Adicione seu primeiro treinador clicando no botão acima.');
      alert('Esse treinador não está cadastrado');
    }
  };

  return (
    <div className="scout-treinadores-page" style={{ backgroundImage: `url(${fundoScout})` }}>
      <header className="scout-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="scout-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={true} />
      </header>
      <main className="scout-main">
        <div className="sidebar">
          <h2 style={{ color: 'white' }}>Treinador</h2>
          <ul>
            <li><strong onClick={() => navigate('/')} style={{ color: 'white' }}>Visão Geral</strong></li>
            <li style={{ color: 'white' }}>Treinador Customizadas <br /><span style={{ color: 'white' }}>(em construção)</span></li>
            <li style={{ color: 'white' }}>Avaliados Recentemente <br /><span style={{ color: 'white' }}>(em construção)</span></li>
            <li style={{ color: 'white' }}>Desempenho do Time <br /><span style={{ color: 'white' }}>(em construção)</span></li>
            <li style={{ color: 'white' }}>Esquema Tático <br /><span style={{ color: 'white' }}>(em construção)</span></li>
          </ul>
        </div>
        <div className="content-area">
          <div className="top-box">
            <img 
              src={lupa} 
              alt="Lupa" 
              className="search-icon" 
            />
            <input 
              type="text" 
              className="search-input" 
              value={searchText}
              onClick={handleSearchClick}
              onChange={handleSearchChange}
              placeholder="Procurar por nome"
              style={{ color: 'white' }}
            />
            <img 
              src={filtro} 
              alt="Filtro" 
              className="filter-icon" 
              onClick={handleFilterClick} 
            />
            <button className="add-team-button">
              <img 
                src={sinalMais} 
                alt="Adicionar Treinador" 
                className="add-icon" 
              />
              <span className="add-button-text" style={{ color: 'white' }}>Treinador</span>
            </button>
          </div>
          <div className="notification-box" style={{ color: 'white' }}>
            {message}
          </div>
          <div className="topics" style={{ color: 'white' }}>
            <span>Treinador</span>
            <span>Idade</span>
            <span>Equipe</span>
            <span>Tática</span>
            <span>Substituições</span>
            <span>Liderança</span>
            <span>Jogadas Ensaiadas</span>
            <span>Vitórias</span>
            <span>Rating</span>
          </div>
          <div className="horizontal-box">
            {coachData && (
              <>
                <span style={{ color: 'white' }}>{coachData.nome}</span>
                <span style={{ color: 'white' }}>{coachData.idade}</span>
                <span style={{ color: 'white' }}>{coachData.equipe}</span>
                <span style={{ color: 'white' }}>{coachData.tatica}</span>
                <span style={{ color: 'white' }}>{coachData.substituicoes}</span>
                <span style={{ color: 'white' }}>{coachData.lideranca}</span>
                <span style={{ color: 'white' }}>{coachData.jogadasEnsaiadas}</span>
                <span style={{ color: 'white' }}>{coachData.vitorias}</span>
                <span style={{ color: 'white' }}>{coachData.rating}</span>
              </>
            )}
          </div>
          <div className="horizontal-box"></div>
          <div className="horizontal-box"></div>
          <div className="horizontal-box"></div>
        </div>
      </main>
    </div>
  );
};

export default ScoutTreinadores;