import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonFlashCards from './PokemonFlashCards';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonFlashCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
