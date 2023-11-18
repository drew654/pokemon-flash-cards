import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonInfo = () => {
  const { pokemonNumber } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    P.getPokemon(pokemonNumber).then(response => {
      setPokemon(response);
    });
  }, [P, pokemonNumber]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Number: {pokemon.id}</p>
      {/* Render other pokemon info here */}
    </div>
  );
}

export default PokemonInfo;