import React, { useState } from 'react';
import { useEffect } from 'react';
import { parseName } from './PokemonFunctions';
import { types } from './PokeAPIAdapter.js';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonFlashCards = () => {
  const [gameState, setGameState] = useState('waiting to start');
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [typeSelection, setTypeSelection] = useState([]);

  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkMode = prefersDarkMode ? true : false;
  const secondaryColor = darkMode ? 'white' : 'black';
  const primaryColor = darkMode ? 'black' : 'white';
  const successColor = 'green';
  const failureColor = 'red';
  const deslectedColor = 'gray';

  const TypeButton = (type) => (
    <div>
      {gameState === 'showing pokemon' && (
        <div
          key={type.id}
          style={{
            textAlign: 'center',
            border: 'solid',
            padding: '0.1em',
            margin: '0.1em',
            cursor: 'pointer',
            width: '4em',
            maxWidth: '25vw',
            fontSize: '0.75em',
            color: 'white',
            borderColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : primaryColor,
            backgroundColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? type.color : deslectedColor) : type.color,
            borderRadius: '0.5em',
            borderWidth: '0.2em',
          }}
          onClick={() => {
            if (!typeSelection.includes(type.name)) {
              const newTypeSelection = [...typeSelection, type.name];
              setTypeSelection(newTypeSelection);
              CheckWinCondition(newTypeSelection);
            }
          }}
        >
          {parseName(type.name)}
        </div>
      )}
      {gameState === 'all types selected' && (
        <div
          key={type.id}
          style={{
            textAlign: 'center',
            border: 'solid',
            padding: '0.1em',
            margin: '0.1em',
            width: '4em',
            maxWidth: '25vw',
            fontSize: '0.75em',
            color: 'white',
            borderColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : primaryColor,
            backgroundColor: typeSelection.includes(type.name) && currentPokemon?.types.includes(type.name) ? type.color : deslectedColor,
            borderRadius: '0.5em',
            borderWidth: '0.2em',
          }}
        >
          {parseName(type.name)}
        </div>
      )}
    </div>
  );

  const CheckWinCondition = (newTypeSelection) => {
    if (currentPokemon?.types.every((type) => newTypeSelection.includes(type))) {
      setGameState('all types selected');
    }
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await P.getPokemonsList();
      const pokemonNames = response.results.map((pokemon) => pokemon.name);
      setPokemons(pokemonNames);
    };

    fetchPokemons();
  }, []);

  const getRandomPokemon = async () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const pokemonName = pokemons[randomIndex];
    const pokemonData = await P.getPokemonByName(pokemonName);
    return { name: pokemonName, image: pokemonData.sprites.front_default, types: pokemonData.types.map((type) => type.type.name) };
  };

  const getRandomPokemonWithImage = async () => {
    const pokemon = await getRandomPokemon();
    if (!pokemon.image) {
      return getRandomPokemonWithImage();
    }
    else {
      return pokemon;
    }
  }

  return (
    <div style={{
      display: gameState === 'waiting to start' ? 'flex' : '',
      alignItems: gameState === 'waiting to start' ? 'center' : '',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: primaryColor,
      color: secondaryColor,
      userSelect: 'none',
    }}>
      {gameState === 'waiting to start' && (
        <div
          onClick={() => {
            setGameState('showing pokemon');
            getRandomPokemonWithImage().then((pokemon) => setCurrentPokemon(pokemon));
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '4em',
            width: '10em',
            fontSize: '2rem',
            cursor: 'pointer',
            borderRadius: '0.5em',
            border: '2px solid ' + secondaryColor,
          }}
        >Start</div>
      )}
      {(gameState === 'showing pokemon' || gameState === 'all types selected') && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '2rem',
          }}
        >
          <h1
            style={{
              marginBottom: '0em',
              fontSize: '2rem',
            }}
          >
            {parseName(currentPokemon?.name)}
          </h1>
            <img src={currentPokemon?.image} alt={currentPokemon?.name} style={{ width: '5em', height: '5em' }} />
            <table>
            <tr>
              <td>
                {types.map((type) => (type.id % 3 === 1 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 2 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 0 && <TypeButton key={type.id} {...type} />))}
              </td>
            </tr>
          </table>
          {gameState === 'all types selected' && (
            <div>
              <div
                onClick={() => {
                  setGameState('showing pokemon');
                  getRandomPokemon().then((pokemon) => setCurrentPokemon(pokemon));
                  setTypeSelection([]);
                }}
                style={{
                  marginTop: '0.5em',
                  padding: '0.1em',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '1.4em',
                  width: '2.5em',
                  fontSize: '1em',
                  cursor: 'pointer',
                  backgroundColor: primaryColor,
                  borderRadius: '0.5em',
                  border: '2px solid ' + secondaryColor,
                }}
              >
                Next
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonFlashCards;
