import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Trello from './Trello';
import TrelloBoard from './TrelloBoard';
import TrelloCardDetails from './TrelloCardDetails';
import Canvas from './Canvas';
import CanvasInsertPage from './CanvasInsertPage';
import CanvasCourse from './CanvasCourse';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trello" element={<Trello />} />
        <Route path="/trello/:boardId" element={<TrelloBoard />} />
        <Route path="/trello/:boardId/:cardId" element={<TrelloCardDetails />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/canvas-insert-page" element={<CanvasInsertPage />} />
        <Route path="/canvas/:courseId" element={<CanvasCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
