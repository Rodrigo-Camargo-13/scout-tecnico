import React from 'react';
import '../assets/styles/scoutCard.css'; 

const ScoutCard = ({ player }) => (
  <div className="scout-card">
    <h3>{player.name}</h3>
    <p>Posição: {player.position}</p>
    <p>Cartões: {player.cards}</p>
    <p>Impedimentos: {player.offsides}</p>
    <p>Chutes ao Gol: {player.shots}</p>
  </div>
);

export default ScoutCard;
