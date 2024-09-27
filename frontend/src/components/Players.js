import React, { useState, useEffect } from 'react';

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/players')
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div>
      <h2>Players List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name} - {player.team}</li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
