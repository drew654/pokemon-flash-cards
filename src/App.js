import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import PokemonFlashCards from './PokemonFlashCards';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokemon-flash-cards" element={<PokemonFlashCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
