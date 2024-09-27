import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterTeam.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [editTeamId, setEditTeamId] = useState(null);
  const navigate = useNavigate();

  const fetchTeams = () => {
    fetch('http://localhost:5000/teams', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => alert('Erro ao carregar os times'));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamName) {
      alert('O nome do time é obrigatório');
      return;
    }

    const url = editTeamId
      ? `http://localhost:5000/teams/${editTeamId}` // Atualizar time
      : 'http://localhost:5000/register-team';  // Cadastrar time

    const method = editTeamId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: teamName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert(editTeamId ? 'Time atualizado com sucesso!' : 'Time registrado com sucesso!');
          setTeamName('');
          setEditTeamId(null);
          fetchTeams();
        } else {
          throw new Error('Erro ao processar a requisição');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/teams/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Time deletado com sucesso');
          fetchTeams();
        } else {
          throw new Error('Erro ao deletar o time');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleEdit = (team) => {
    setTeamName(team.name);
    setEditTeamId(team.id);
  };

  return (
    <div className="register-team-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-team-header">
        <img src={logo} alt="Logo" className="register-team-logo" onClick={() => navigate('/')} />
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
            <button type="submit" className="register-team-button">
              {editTeamId ? 'Atualizar Time' : 'Cadastrar Time'}
            </button>
          </form>

          <h2>Lista de Times</h2>
          <ul>
            {teams.map((team) => (
              <li key={team.id}>
                {team.name}
                <button onClick={() => handleEdit(team)}>Editar</button>
                <button onClick={() => handleDelete(team.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default RegisterTeam;
