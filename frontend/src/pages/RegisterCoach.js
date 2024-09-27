import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterCoach.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterCoach = () => {
  const [coachData, setCoachData] = useState({
    name: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCoachData({ ...coachData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!coachData.name) {
      alert('O nome do treinador é obrigatório');
      return;
    }

    // Lógica para registrar o treinador no backend
    fetch('http://localhost:5000/register-coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coachData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao registrar o treinador');
        }
      })
      .then((data) => {
        alert('Treinador registrado com sucesso!');
        setCoachData({
          name: ''
        }); // Limpar o formulário após o envio
        navigate('/scout-treinadores'); // Redirecionar após o registro
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register-coach-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-coach-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="register-coach-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="register-coach-main">
        <div className="register-coach-box">
          <form onSubmit={handleSubmit} className="register-coach-form">
            <input 
              type="text" 
              placeholder="Nome do Treinador" 
              value={coachData.name} 
              onChange={handleChange} 
              name="name"
              className="register-coach-input" 
              required 
            />
            <button type="submit" className="register-coach-button">Cadastrar Treinador</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterCoach;
