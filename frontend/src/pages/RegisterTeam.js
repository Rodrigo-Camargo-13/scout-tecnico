import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterTeam.css'; // Ajuste o caminho para o arquivo CSS correto
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterTeam = () => {
  const [teamData, setTeamData] = useState({ name: '' });
  const [teams, setTeams] = useState([]);
  const [editTeamId, setEditTeamId] = useState(null);
  const navigate = useNavigate();

  // Função para carregar os times já registrados
  const fetchTeams = () => {
    fetch('http://localhost:5000/teams', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error('Erro ao carregar times:', error));
  };

  useEffect(() => {
    fetchTeams(); // Carregar times quando o componente for montado
  }, []);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamData.name) {
      alert('O nome do time é obrigatório');
      return;
    }

    const url = editTeamId
      ? `http://localhost:5000/teams/${editTeamId}` // Atualizar time
      : 'http://localhost:5000/register-team'; // Cadastrar novo time

    const method = editTeamId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    })
      .then((response) => {
        if (response.ok) {
          alert(editTeamId ? 'Time atualizado com sucesso!' : 'Time registrado com sucesso!');
          setTeamData({ name: '' });
          setEditTeamId(null);
          fetchTeams(); // Atualiza a lista de times
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
    setTeamData({ name: team.name });
    setEditTeamId(team.id);
  };

  return (
    <div className="register-team-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-team-header">
        <img src={logo} alt="Logo" className="register-team-logo" onClick={() => navigate('/')} />
        <Navbar showServices={false} />
      </header>
      <main className="register-team-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '50px', marginTop: '20px' }}>
        <div className="register-form-box" style={{ marginTop: '0' }}>
          <form onSubmit={handleSubmit} className="register-team-form">
            <input
              type="text"
              placeholder="Nome do Time"
              value={teamData.name}
              onChange={handleChange}
              name="name"
              className="register-team-input"
              required
            />
            <button type="submit" className="register-team-button" style={{ backgroundColor: 'green' }}>
              {editTeamId ? 'Atualizar Time' : 'Cadastrar Time'}
            </button>
          </form>
        </div>

        <div className="register-box">
          <h2 className="register-list-title">Lista de Times</h2>
          <div className="register-list">
            {teams.map((team) => (
              <div key={team.id} className="register-list-item">
                <span className="register-list-item-name">{team.name}</span>
                <div className="register-list-item-buttons">
                  <button className="register-edit-button" onClick={() => handleEdit(team)}>Editar</button>
                  <button className="register-delete-button" onClick={() => handleDelete(team.id)}>Deletar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterTeam;
