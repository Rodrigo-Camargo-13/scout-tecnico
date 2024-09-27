import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/forgot-password.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    // Faz o registro do usuário no backend
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao registrar o usuário');
        }
      })
      .then((data) => {
        alert('Usuário registrado com sucesso!');
        // Limpa os campos e redireciona para a página de login
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="forgot-password-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="forgot-password-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="forgot-password-logo" 
          onClick={() => navigate('/')} 
        />
        <Navbar showServices={false} />
      </header>
      <main className="forgot-password-main">
        <div className="forgot-password-box">
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="forgot-password-input" 
              required
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="forgot-password-input" 
              required
            />
            <input 
              type="password" 
              placeholder="Confirme a Senha" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="forgot-password-input" 
              required
            />
            <button type="submit" className="forgot-password-button">Registrar</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
