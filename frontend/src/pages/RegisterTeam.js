import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterTeam.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterTeam = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!teamName) {
      alert('O nome do time é obrigatório');
      return;
    }

    // Lógica para registrar o time no backend
    fetch('http://localhost:5000/register-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: teamName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao registrar o time');
        }
      })
      .then((data) => {
        alert('Time registrado com sucesso!');
        setTeamName('');  // Limpar o campo de input
        navigate('/scout-equipes');  // Redirecionar após o registro
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register-team-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-team-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="register-team-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="register-team-main">
        <div className="register-team-box">
          <form onSubmit={handleSubmit} className="register-team-form">
            <input 
              type="text" 
              placeholder="Nome do Time" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
              className="register-team-input" 
              required
            />
            <button type="submit" className="register-team-button">Cadastrar Time</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterTeam;
