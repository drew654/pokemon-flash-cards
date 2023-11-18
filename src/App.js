import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import PokedexHome from './PokedexHome';
import PokemonInfo from './PokemonInfo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokedex" element={<PokedexHome />} />
        <Route path="/pokedex/:pokemonNumber" element={<PokemonInfo />} />"
      </Routes>
    </BrowserRouter>
  );
}

export default App;
