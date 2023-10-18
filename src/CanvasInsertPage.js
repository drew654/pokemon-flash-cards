import React, { useState } from 'react';
import config from './config';

const CanvasInsertPage = () => {
  const [text, setText] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [trelloAssignments, setTrelloAssignments] = useState([]);
  const [successfulCardAdds, setSuccessfulCardAdds] = useState([]);

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
    
    a.shift();
    setAssignments(a);
    getCardNamesInList(listId, config.TRELLO_API_KEY, config.TRELLO_API_TOKEN).then(cards => setTrelloAssignments(cards));
  }

  const createCard = (listId, name, due, key, token) => {
    const url = `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${listId}&name=${name}&due=${due}`;
    fetch(url, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSuccessfulCardAdds(prevState => [...prevState, data.name]);
      })
      .catch(error => console.error(error));
  };

  const importToTrello = () => {
    setSuccessfulCardAdds([]);
    const newCards = assignments.filter(assignment => !trelloAssignments.includes(assignment.name));    
    newCards.forEach(assignment => {
      createCard(listId, encodeURIComponent(assignment.name), assignment.dueDate, config.TRELLO_API_KEY, config.TRELLO_API_TOKEN);
    });
  };

  const getCardNamesInList = (listId, key, token) => {
    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`;
    return fetch(url)
      .then(response => response.json())
      .then(cards => cards.map(card => card.name))
      .catch(error => console.error(error));
  };

  const searchParams = new URLSearchParams(window.location.search);
  const courseName = searchParams.get('courseName');
  const listId = searchParams.get('listId');

  return (
    <div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} rows={10} cols={50} />
      <br />
      <button type="button" onClick={() => setPastedAssignments()}>Preview Changes</button>

      <table>
        <tbody>
          {assignments.map((assignment) => {
            const inTrello = trelloAssignments.includes(assignment.name);
            const addedToTrello = successfulCardAdds.includes(assignment.name);
            return (
              <tr style={{backgroundColor: (inTrello || addedToTrello) ? '' : '#d4edda'}}>
                <td>{assignment.name}{addedToTrello}</td>
                <td>{new Date(assignment.dueDate).toLocaleString()}</td>
                {addedToTrello ? <td>Added to Trello</td> : null}
              </tr>
            );
          })}
        </tbody>
      </table>

      <button type="button" onClick={() => importToTrello()}>Send to {courseName}</button>     
      </div>
  );
};

export default CanvasInsertPage;
