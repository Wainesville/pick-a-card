import React from 'react';
import './Card.css'; // create this for card-specific styles

function Card({ image, alt }) {
  return (
    <img className="Card" src={image} alt={alt} />
  );
}

export default Card;
