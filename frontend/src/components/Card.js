// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, content, imageUrl }) => (
  <div className="card">
    <img src={imageUrl} alt={title} className="card-image" />
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

export default Card;
