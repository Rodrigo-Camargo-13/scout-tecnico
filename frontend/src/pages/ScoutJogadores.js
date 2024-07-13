import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/scout-jogadores.css';
import logo from '../assets/images/logo.png';
import lupa from '../assets/images/lupa.png';
import filtro from '../assets/images/filtro.png';
import sinalMais from '../assets/images/sinal_mais.png';

const fetchPlayerData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jogador: 'Pablo Vegetti',
        idade: 35,
        equipe: 'Vasco',
        gols: 25,
        cartoes: 3,
        faltas: 5,
        assistencias: 10,
        finalizacoes: 50,
        passes: 25,
        desarmes: 8,
        rating: 95,
      });
    }, 1000);
  });
};

const ScoutJogadores = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [message, setMessage] = useState('Você não possui nenhum jogador na sua lista de monitoramento ainda. Adicione seu primeiro jogador clicando no botão acima ou durante um jogo / no relatório de jogo ao lado do perfil de um jogador.');

  const handleSearchClick = () => {
    if (searchText === 'Procurar por nome') {
      setSearchText('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterClick = async () => {
    const normalizedSearchText = searchText.trim().toLowerCase();
    if (normalizedSearchText === 'vegetti' || normalizedSearchText === 'pablo vegetti') {
      const data = await fetchPlayerData();
      setPlayerData(data);
      setMessage('Dados do jogador Pablo Vegetti inseridos na sua lista de monitoramento. Abaixo estão as estatísticas do jogador.');
    } else {
      setPlayerData(null);
      setMessage('Você não possui nenhum jogador na sua lista de monitoramento ainda. Adicione seu primeiro jogador clicando no botão acima ou durante um jogo / no relatório de jogo ao lado do perfil de um jogador.');
      alert('Jogador não cadastrado');
    }
  };

  return (
    <div className="scout-jogadores-page">
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
          <h2>Jogadores</h2>
          <ul>
            <li><strong onClick={() => navigate('/')}>Visão Geral</strong></li>
            <li>Jogadores Customizados <br /><span>(em construção)</span></li>
            <li>Avaliados Recentemente <br /><span>(em construção)</span></li>
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
            <button className="add-player-button">
              <img 
                src={sinalMais} 
                alt="Adicionar Jogador" 
                className="add-icon" 
              />
              <span className="add-button-text">Jogador</span>
            </button>
          </div>
          <div className="notification-box">
            {message}
          </div>
          <div className="topics">
            <span>Jogador</span>
            <span>Idade</span>
            <span>Equipe</span>
            <span>Gols</span>
            <span>Cartões</span>
            <span>Faltas</span>
            <span>Assistências</span>
            <span>Finalizações</span>
            <span>Passes</span>
            <span>Desarmes</span>
            <span>Rating</span>
          </div>
          <div className="horizontal-box">
            {playerData && (
              <>
                <span>{playerData.jogador}</span>
                <span>{playerData.idade}</span>
                <span>{playerData.equipe}</span>
                <span>{playerData.gols}</span>
                <span>{playerData.cartoes}</span>
                <span>{playerData.faltas}</span>
                <span>{playerData.assistencias}</span>
                <span>{playerData.finalizacoes}</span>
                <span>{playerData.passes}</span>
                <span>{playerData.desarmes}</span>
                <span>{playerData.rating}</span>
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

export default ScoutJogadores;
