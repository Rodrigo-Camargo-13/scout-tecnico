import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css';
import logo from '../assets/images/logo.png';
import fundoLogin from '../assets/images/fundo_login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      navigate('/services');
    } else {
      alert('Usuário não cadastrado.');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={fundoLogin} alt="Fundo Login" className="background-image" />
      </div>
      <div className="login-right">
        <img 
          src={logo} 
          alt="Logo" 
          className="logo" 
          onClick={() => navigate('/')} 
        />
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-title">Login</h1>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="login-input" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="login-input" 
            required
          />
          <a href="/forgot-password" className="forgot-password">Esqueceu a senha? Clique aqui</a>
          <button type="submit" className="login-button">Login</button>
        </form>
        <footer className="login-footer">
          <a href="http://www.dataaccent.com.br" target="_blank" rel="noopener noreferrer">www.dataaccent.com.br</a>
        </footer>
      </div>
    </div>
  );
};

export default Login;
