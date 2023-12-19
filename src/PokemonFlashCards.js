import React from 'react';
import WhatTypeIsIt from './WhatTypeIsIt.js';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonFlashCards = () => {
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
    <WhatTypeIsIt P={P} colors={colors} />
  );
};

export default PokemonFlashCards;
