import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';

const TrelloBoards = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.trello.com/1/members/me/boards?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`)
      .then(response => response.json())
      .then(data => setBoards(data))
      .catch(error => console.log(error));
  }, []);

  const handleBoardClick = (boardId) => {
    navigate(`/trello-board/${boardId}`);
  }

  return (
    <div>
      <h1>Trello</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id} onClick={() => handleBoardClick(board.id)} style={{cursor: 'pointer'}}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrelloBoards;
