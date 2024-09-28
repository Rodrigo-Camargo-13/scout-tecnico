import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import News from './pages/News';
import ScoutJogadores from './pages/ScoutJogadores';
import ScoutEquipes from './pages/ScoutEquipes';
import ScoutTreinadores from './pages/ScoutTreinadores'; 
import ForgotPassword from './pages/ForgotPassword';
import Matches from './components/Matches';
import RegisterTeam from './pages/RegisterTeam'; 
import RegisterCoach from './pages/RegisterCoach'; 
import RegisterPlayer from './pages/RegisterPlayer'; 
import './assets/styles/index.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/news" element={<News />} />
      <Route path="/scout-jogadores" element={<ScoutJogadores />} />
      <Route path="/scout-equipes" element={<ScoutEquipes />} />
      <Route path="/scout-treinadores" element={<ScoutTreinadores />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/register-team" element={<RegisterTeam />} /> 
      <Route path="/register-coach" element={<RegisterCoach />} /> 
      <Route path="/register-player" element={<RegisterPlayer />} /> 
    </Routes>
  </Router>
);

export default App;
