import React, { useState, useEffect } from 'react';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/coaches')
      .then((response) => response.json())
      .then((data) => setCoaches(data));
  }, []);

  return (
    <div>
      <h2>Coaches List</h2>
      <ul>
        {coaches.map((coach) => (
          <li key={coach.id}>{coach.name} - Team: {coach.team}</li>
        ))}
      </ul>
    </div>
  );
};

export default Coaches;
