import React, { useState } from 'react';
import { useEffect } from 'react';
import { parseName } from './PokemonFunctions';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonFlashCards = () => {
  const [gameState, setGameState] = useState('waiting to start');
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [typeSelection, setTypeSelection] = useState([]);

  const darkMode = false;
  const secondaryColor = darkMode ? 'white' : 'black';
  const primaryColor = darkMode ? 'black' : 'white';
  const successColor = darkMode ? 'green' : 'lightgreen';
  const failureColor = darkMode ? 'red' : 'tomato';
  const deslectedColor = darkMode ? 'gray' : 'lightgray';

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
            color: secondaryColor,
            backgroundColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : primaryColor,
            userSelect: 'none',
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
            backgroundColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : deslectedColor,
            userSelect: 'none',
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

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await P.getTypesList();
      const types = response.results.map((type) => ({ name: type.name, id: type.url.split('/')[6] })).filter((type) => type.id < 10000);
      setTypes(types);
    };

    fetchTypes();
  }, []);

  const getRandomPokemon = async () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const pokemonName = pokemons[randomIndex];
    const pokemonData = await P.getPokemonByName(pokemonName);
    return { name: pokemonName, image: pokemonData.sprites.front_default, types: pokemonData.types.map((type) => type.type.name) };
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: primaryColor,
      color: secondaryColor,
    }}>
      {gameState === 'waiting to start' && (
        <div
          onClick={() => {
            setGameState('showing pokemon');
            getRandomPokemon().then((pokemon) => setCurrentPokemon(pokemon));
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '4em',
            width: '12em',
            fontSize: '2rem',
            cursor: 'pointer',
            border: '1px solid ' + secondaryColor,
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
              marginTop: '0em',
              marginBottom: '0em',
            }}
          >
            {parseName(currentPokemon?.name)}
          </h1>
            <img src={currentPokemon?.image} alt={currentPokemon?.name} style={{ width: '6em', height: '6em' }} />
            <table>
            <tr>
              <td>
                {types.map((type) => (type.id % 3 === 0 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 1 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 2 && <TypeButton key={type.id} {...type} />))}
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '1.4em',
                  width: '2.5em',
                  fontSize: '1em',
                  cursor: 'pointer',
                  backgroundColor: primaryColor,
                  border: '1px solid ' + secondaryColor,
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
