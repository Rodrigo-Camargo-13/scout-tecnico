import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/RegisterCoach.css';
import logo from '../assets/images/logo.png';
import fundoConsulta from '../assets/images/fundo_consulta.png';

const RegisterCoach = () => {
  const [coachData, setCoachData] = useState({ name: '' });
  const [coaches, setCoaches] = useState([]);
  const [editCoachId, setEditCoachId] = useState(null);
  const navigate = useNavigate();

  // Função para carregar os treinadores já registrados
  const fetchCoaches = () => {
    fetch('http://localhost:5000/coaches', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => alert('Erro ao carregar os treinadores'));
  };

  useEffect(() => {
    fetchCoaches();  // Carregar treinadores quando o componente for montado
  }, []);

  const handleChange = (e) => {
    setCoachData({ ...coachData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coachData.name) {
      alert('O nome do treinador é obrigatório');
      return;
    }

    const url = editCoachId
      ? `http://localhost:5000/coaches/${editCoachId}` // Atualizar treinador
      : 'http://localhost:5000/register-coach';  // Cadastrar novo treinador

    const method = editCoachId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coachData),
    })
      .then((response) => {
        if (response.ok) {
          alert(editCoachId ? 'Treinador atualizado com sucesso!' : 'Treinador registrado com sucesso!');
          setCoachData({ name: '' });
          setEditCoachId(null);
          fetchCoaches();  // Atualiza a lista de treinadores
        } else {
          throw new Error('Erro ao processar a requisição');
        }
      })
      .catch((error) => alert(error.message));
  };

  // Função para deletar um treinador
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/coaches/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Treinador deletado com sucesso');
          fetchCoaches();
        } else {
          throw new Error('Erro ao deletar o treinador');
        }
      })
      .catch((error) => alert(error.message));
  };

  // Função para editar um treinador
  const handleEdit = (coach) => {
    setCoachData({ name: coach.name });
    setEditCoachId(coach.id);
  };

  return (
    <div className="register-coach-page" style={{ backgroundImage: `url(${fundoConsulta})` }}>
      <header className="register-coach-header">
        <img src={logo} alt="Logo" className="register-coach-logo" onClick={() => navigate('/')} />
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
            <button type="submit" className="register-coach-button">
              {editCoachId ? 'Atualizar Treinador' : 'Cadastrar Treinador'}
            </button>
          </form>

          <h2>Lista de Treinadores</h2>
          <ul>
            {coaches.map((coach) => (
              <li key={coach.id}>
                {coach.name}
                <button onClick={() => handleEdit(coach)}>Editar</button>
                <button onClick={() => handleDelete(coach.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default RegisterCoach;
