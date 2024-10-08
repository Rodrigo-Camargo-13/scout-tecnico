import React, { useState, useEffect } from 'react';
import '../assets/styles/RegisterPlayer.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterPlayer = () => {
  const [playerData, setPlayerData] = useState({ name: '', position: '' });
  const [players, setPlayers] = useState([]);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const navigate = useNavigate();

  const fetchPlayers = () => {
    fetch('http://localhost:5000/players', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Erro ao carregar jogadores:', error));
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!playerData.name || !playerData.position) {
      alert('Nome e posição são obrigatórios');
      return;
    }

    const url = editPlayerId
      ? `http://localhost:5000/players/${editPlayerId}`
      : 'http://localhost:5000/register-player';

    const method = editPlayerId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => {
        if (response.ok) {
          alert(editPlayerId ? 'Jogador atualizado com sucesso!' : 'Jogador registrado com sucesso!');
          setPlayerData({ name: '', position: '' });
          setEditPlayerId(null);
          fetchPlayers();
        } else {
          throw new Error('Erro ao processar a requisição');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/players/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Jogador deletado com sucesso');
          fetchPlayers();
        } else {
          throw new Error('Erro ao deletar o jogador');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleEdit = (player) => {
    setPlayerData({ name: player.name, position: player.position });
    setEditPlayerId(player.id);
  };

  return (
    <div className="register-player-page" style={{ backgroundImage: `url(${fundoConsulta})`, backgroundSize: 'cover' }}>
      <header className="register-player-header">
        <img
          src={logo}
          alt="Logo"
          className="register-player-logo"
          onClick={() => navigate('/')}
        />
        <Navbar showServices={false} />
      </header>
      <main className="register-page">
        <div className="register-form-box">
          <form onSubmit={handleSubmit} className="register-player-form">
            <input
              type="text"
              placeholder="Nome do Jogador"
              value={playerData.name}
              onChange={handleChange}
              name="name"
              className="register-player-input"
              required
            />
            <input
              type="text"
              placeholder="Posição"
              value={playerData.position}
              onChange={handleChange}
              name="position"
              className="register-player-input"
              required
            />
            <button type="submit" className="register-player-button">
              {editPlayerId ? 'Atualizar Jogador' : 'Cadastrar Jogador'}
            </button>
          </form>
        </div>

        <div className="register-box">
          <h2 className="register-list-title">Lista de Jogadores</h2>
          <div className="register-list">
            {players.map((player) => (
              <div key={player.id} className="register-list-item">
                <span className="register-list-item-name">{player.name} - {player.position}</span>
                <div className="register-list-item-buttons">
                  <button className="register-edit-button" onClick={() => handleEdit(player)}>Editar</button>
                  <button className="register-delete-button" onClick={() => handleDelete(player.id)}>Deletar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPlayer;
