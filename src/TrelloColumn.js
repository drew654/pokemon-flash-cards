import React from 'react';
import TrelloCard from './TrelloCard';
import ImportFromCanvas from './ImportFromCanvas';

const TrelloColumn = ({ board, column }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '200px', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ marginRight: '10px' }}>{column.name}</h2>
        <ImportFromCanvas courseName={column.name} />
      </div>
      {column.cards.map(card => (
        <div key={card.id}>
          <TrelloCard board={board} card={card} />
        </div>
      ))}
    </div>
  );
};

export default TrelloColumn;
