import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonFlashCards from './PokemonFlashCards';

const basename = process.env.PUBLIC_URL || '/pokemon-flash-cards';

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<PokemonFlashCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
