import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/teams')
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  return (
    <div>
      <h2>Teams List</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name} - Coach: {team.coach}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
