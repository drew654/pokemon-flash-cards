import React from 'react';
import { Link } from 'react-router-dom';

const TrelloCard = ({ board, card }) => {
  return (
    <div style={{ border: '1px solid black', padding: '4px', width: '200px' }}>
      <Link to={`/trello/${board.id}/${card.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <h3>{card.name}</h3>
        <p>{card.due}</p>
      </Link>
    </div>
  );
}

export default TrelloCard;
