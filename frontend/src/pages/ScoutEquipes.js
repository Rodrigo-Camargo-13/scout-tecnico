import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/scout-equipes.css';
import logo from '../assets/images/logo.png';
import lupa from '../assets/images/lupa.png';
import filtro from '../assets/images/filtro.png';
import sinalMais from '../assets/images/sinal_mais.png';

const ScoutEquipes = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [message, setMessage] = useState('Você não possui nenhuma equipe na sua lista de monitoramento ainda. Adicione sua primeira equipe clicando no botão acima ou durante um jogo / no relatório de jogo ao lado do perfil de uma equipe.');

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
    if (normalizedSearchText === 'vasco') {
      const data = {
        equipe: 'Vasco',
        jogos: 38,
        vitorias: 20,
        empates: 10,
        derrotas: 8,
        golsPro: 60,
        golsContra: 30,
        saldoGols: 30,
        pontos: 70,
      };
      setTeamData(data);
      setMessage('O time Vasco está na sua lista de monitoramento. O relatório de jogos ao lado do perfil de um time está disponível abaixo.');
    } else {
      setTeamData(null);
      setMessage('Você não possui nenhuma equipe na sua lista de monitoramento ainda. Adicione sua primeira equipe clicando no botão acima ou durante um jogo / no relatório de jogo ao lado do perfil de uma equipe.');
      alert('Time não cadastrado');
    }
  };

  return (
    <div className="scout-equipes-page">
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
          <h2>Equipes</h2>
          <ul>
            <li><strong onClick={() => navigate('/')}>Visão Geral</strong></li>
            <li>Equipes Customizadas <br /><span>(em construção)</span></li>
            <li>Avaliadas Recentemente <br /><span>(em construção)</span></li>
            <li>Desempenho Campo <br /><span>(em construção)</span></li>
            <li>Lesões Campo <br /><span>(em construção)</span></li>
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
                alt="Adicionar Equipe" 
                className="add-icon" 
              />
              <span className="add-button-text">Equipe</span>
            </button>
          </div>
          <div className="notification-box">
            {message}
          </div>
          <div className="topics">
            <span>Equipe</span>
            <span>Jogos</span>
            <span>Vitórias</span>
            <span>Empates</span>
            <span>Derrotas</span>
            <span>Gols Pró</span>
            <span>Gols Contra</span>
            <span>Saldo de Gols</span>
            <span>Pontos</span>
          </div>
          <div className="horizontal-box">
            {teamData && (
              <>
                <span>{teamData.equipe}</span>
                <span>{teamData.jogos}</span>
                <span>{teamData.vitorias}</span>
                <span>{teamData.empates}</span>
                <span>{teamData.derrotas}</span>
                <span>{teamData.golsPro}</span>
                <span>{teamData.golsContra}</span>
                <span>{teamData.saldoGols}</span>
                <span>{teamData.pontos}</span>
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

export default ScoutEquipes;
