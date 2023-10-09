import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Trello from './Trello';
import TrelloBoard from './TrelloBoard';
import TrelloCardDetails from './TrelloCardDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trello" element={<Trello />} />
        <Route path="/trello/:boardId" element={<TrelloBoard />} />
        <Route path="/trello/:boardId/:cardId" element={<TrelloCardDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
