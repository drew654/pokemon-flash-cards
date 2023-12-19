import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonFlashCards from './PokemonFlashCards';
import WhatTypeIsIt from './WhatTypeIsIt';
import WhatGenerationIsIt from './WhatGenerationIsIt';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const basename = process.env.PUBLIC_URL || '/pokemon-flash-cards';

const App = () => {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkMode = prefersDarkMode ? true : false;
  const secondaryColor = darkMode ? 'white' : 'black';
  const primaryColor = darkMode ? 'black' : 'white';
  const successColor = 'green';
  const failureColor = 'red';
  const deslectedColor = 'gray';
  const colors = {
    secondaryColor,
    primaryColor,
    successColor,
    failureColor,
    deslectedColor,
  };

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<PokemonFlashCards colors={colors} />} />
        <Route path="/what-type-is-it" element={<WhatTypeIsIt P={P} colors={colors} />} />
        <Route path="/what-generation-is-it" element={<WhatGenerationIsIt P={P} colors={colors} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
