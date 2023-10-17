import React, { useState } from 'react';
import config from './config';

const CanvasInsertPage = () => {
  const [text, setText] = useState('');
  const [assignments, setAssignments] = useState([]);
  
  const addAssignment = (line) => {
    const a = assignments;
    a.push(line);
    setAssignments(a);
  };

  const setPastedAssignments = () => {
    setAssignments([]);
    const a = [];
    const lines = text.split('Assignment\n');

    lines.forEach(line => {
      let as = line.split('\n');
      let assignment = {};
      assignment.name = as[0];
      if (as[1]) {
        let dueDateArr = as[1].split(/(am|pm)/i); // split by "am" or "pm", case-insensitive
        let dueDate = (dueDateArr[0].replace('at ', '2023 ').trim() + dueDateArr[1]).replace(/Due/i, ''); // remove "at " and then add "am" or "pm" back, and make 'Due' case insensitive
        const parsedDate = Date.parse(dueDate.replace('pm', ' pm').replace('am', ' am'));
        const date = new Date(parsedDate);
        const isoDate = date.toISOString();
        assignment.dueDate = isoDate;
      }
      a.push(assignment);
    });  
    
    setAssignments(a);
  }

  const createCard = (listId, name, due, key, token) => {
    const url = `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${listId}&name=${name}&due=${due}`;
    fetch(url, { method: 'POST' })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const deleteAllCardsInList = (listId, key, token) => {
    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`;
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        data.forEach(card => {
          const deleteUrl = `https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`;
          fetch(deleteUrl, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });
      })
      .catch(error => console.error(error));
  };

  const importToTrello = () => {
    assignments.forEach(assignment => {
      createCard(listId, assignment.name, assignment.dueDate, config.TRELLO_API_KEY, config.TRELLO_API_TOKEN);
    });
  };

  const searchParams = new URLSearchParams(window.location.search);
  const courseName = searchParams.get('courseName');
  const listId = searchParams.get('listId');

  return (
    <div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} />
      <br />
      <button type="button" onClick={() => setPastedAssignments()}>Insert into {courseName}</button>

      <table>
        <tbody>
          {assignments.map((assignment) => (
            console.log(assignment.dueDate),
            <tr>
              <td>{assignment.name}</td>
              <td>{assignment.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={() => importToTrello()}>Import to Trello</button>
      <button type="button" onClick={() => deleteAllCardsInList(listId, config.TRELLO_API_KEY, config.TRELLO_API_TOKEN)}>Delete all cards in {courseName}</button>
    </div>
  );
};

export default CanvasInsertPage;
