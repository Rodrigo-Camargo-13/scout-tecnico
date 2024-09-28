import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/matches.css'; // Use o arquivo de estilo correto
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMatches = () => {
    fetch('http://localhost:5000/football/matches', {  // Certifique-se de usar localhost quando acessa fora do Docker
      method: 'GET',
      credentials: 'include', // Necessário para enviar as credenciais de sessão (cookie)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar partidas');
        }
        return response.json();
      })
      .then((data) => {
        setMatches(data.matches || []);
        setError('');  // Limpar erros anteriores
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="matches-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="matches-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="matches-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="matches-main">
        <div className="matches-box">
          <h2 className="matches-title">Partidas de Futebol</h2>
          <button className="matches-button" onClick={fetchMatches}>
            Carregar Partidas
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="matches-grid">
            {matches.map((match) => (
              <div key={match.id} className="match-item">
                <span className="match-team">{match.homeTeam.name}</span> vs <span className="match-team">{match.awayTeam.name}</span>
                <br />
                <img src={match.homeTeam.crest} alt={`${match.homeTeam.name} Crest`} style={{ width: '50px' }} />
                <img src={match.awayTeam.crest} alt={`${match.awayTeam.name} Crest`} style={{ width: '50px' }} />
                <br />
                <span className="match-date">{new Date(match.utcDate).toLocaleString()}</span>
                <br />
                <span>Competição: {match.competition.name}</span>
                <br />
                <span>Status: {match.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matches;
