import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import TrelloBoards from './TrelloBoards';
import TrelloBoard from './TrelloBoard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="trello-boards" element={<TrelloBoards />} />
        <Route path="/trello-board/:boardId" element={<TrelloBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
