import React, { useState, useEffect } from 'react';
import { simpleParse } from './PokemonFunctions';
import { types } from './PokeAPIAdapter.js';
import { PokemonNameHeader, StartButton } from './FlashCardComponents.js';

const WhatTypeIsIt = ( {P, colors} ) => {
  const [gameState, setGameState] = useState('waiting to start');
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [typeSelection, setTypeSelection] = useState([]);
  const { secondaryColor, primaryColor, successColor, failureColor, deslectedColor } = colors;

  const TypeButton = (type) => {
    const basicStyle = {
      textAlign: 'center',
      border: 'solid',
      padding: '0.1em',
      margin: '0.1em',
      cursor: 'pointer',
      width: '4em',
      maxWidth: '25vw',
      fontSize: '0.75em',
      color: 'white',
      borderRadius: '0.5em',
      borderWidth: '0.2em',
    }
    
    return (
      <div>
        {gameState === 'showing pokemon' && (
          <div
            key={type.id}
            style={{
              ...basicStyle,
              borderColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : primaryColor,
              backgroundColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? type.color : deslectedColor) : type.color,
            }}
            onClick={() => {
              if (!typeSelection.includes(type.name)) {
                const newTypeSelection = [...typeSelection, type.name];
                setTypeSelection(newTypeSelection);
                CheckWinCondition(newTypeSelection);
              }
            }}
          >
            {simpleParse(type.name)}
          </div>
        )}
        {gameState === 'all types selected' && (
          <div
            key={type.id}
            style={{
              ...basicStyle,
              borderColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? successColor : failureColor) : primaryColor,
              backgroundColor: typeSelection.includes(type.name) && currentPokemon?.types.includes(type.name) ? type.color : deslectedColor,
            }}
          >
            {simpleParse(type.name)}
          </div>
        )}
      </div>
    );
  };

  const getRandomPokemon = async () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const pokemonName = pokemons[randomIndex];
    const pokemonData = await P.getPokemonByName(pokemonName);
    return { name: pokemonName, image: pokemonData.sprites.front_default ?? undefined, types: pokemonData.types.map((type) => type.type.name) };
  };
  
  const getRandomPokemonWithImage = async () => {
    const pokemon = await getRandomPokemon();
    if (!pokemon.image) {
      return getRandomPokemonWithImage();
    }
    else {
      return pokemon;
    }
  };

  const CheckWinCondition = (newTypeSelection) => {
    if (currentPokemon?.types.every((type) => newTypeSelection.includes(type))) {
      setGameState('all types selected');
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await P.getPokemonsList();
      const pokemonNames = response.results.map((pokemon) => pokemon.name);
      setPokemons(pokemonNames);
    };

    fetchPokemons();
  }, []);

  return (
    <div style={{
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: primaryColor,
      color: secondaryColor,
      userSelect: 'none',
    }}>
      {gameState === 'waiting to start' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginTop: '2rem' }}>What Type Is It?</h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '75vh',
            }}
          >
            <StartButton
              onClick={() => {
                setGameState('showing pokemon');
                getRandomPokemonWithImage(P, pokemons).then((pokemon) => setCurrentPokemon(pokemon));
              }}
              colors={colors}
            />
          </div>
        </div>
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
          <PokemonNameHeader pokemon={currentPokemon} />
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

export default WhatTypeIsIt;
