import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from './config';
import { Link } from 'react-router-dom';

const TrelloBoard = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(`https://api.trello.com/1/boards/${boardId}?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.log(error));
  }, [boardId]);

  useEffect(() => {
    fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`)
      .then(response => response.json())
      .then(data => {
        const columnPromises = data.map(column => {
          return fetch(`https://api.trello.com/1/lists/${column.id}/cards?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`)
            .then(response => response.json())
            .then(cards => {
              return {
                id: column.id,
                name: column.name,
                cards: cards
              };
            });
        });
        Promise.all(columnPromises).then(columns => setColumns(columns));
      })
      .catch(error => console.log(error));
  }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/trello-boards" style={{ textDecoration: 'none', color: 'black' }}>
        <h1 style={{ display: 'inline-block' }}>Trello</h1>
      </Link>
      <h1>{board.name}</h1>
      <p>{board.desc}</p>
      {columns.map(column => (
        <div key={column.id}>
          <h2>{column.name}</h2>
          {column.cards.map(card => (
            <div key={card.id}>
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrelloBoard;
