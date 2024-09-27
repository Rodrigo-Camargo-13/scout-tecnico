import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterPlayer.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterPlayer = () => {
  const [playerData, setPlayerData] = useState({
    name: '',
    position: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!playerData.name || !playerData.position) {
      alert('Nome e posição são obrigatórios');
      return;
    }

    // Lógica para registrar o jogador no backend
    fetch('http://localhost:5000/register-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao registrar o jogador');
        }
      })
      .then((data) => {
        alert('Jogador registrado com sucesso!');
        setPlayerData({
          name: '',
          position: '',
        }); // Limpar o formulário após o envio
        navigate('/scout-jogadores'); // Redirecionar após o registro
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register-player-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-player-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="register-player-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="register-player-main">
        <div className="register-player-box">
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
            <button type="submit" className="register-player-button">Cadastrar Jogador</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterPlayer;
