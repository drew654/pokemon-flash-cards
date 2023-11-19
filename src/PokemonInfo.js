import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parseName } from './PokedexFunctions';
import { Link } from 'react-router-dom';
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
      <h1>{parseName(pokemon.name)}</h1>
      <h2>#{pokemonNumber}</h2>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h2>{pokemon.types.map(type => (
        <div key={type.type.name}>{parseName(type.type.name)}</div>
      ))}</h2>

      <h2>Abilities</h2>
      {pokemon.abilities.map(ability => (
        <div key={ability.ability.name}>{parseName(ability.ability.name)}</div>
      ))}

      <h2>Base Stats</h2>
      {pokemon.stats.map(stat => (
        <div key={stat.stat.name}>{parseName(stat.stat.name)}: {stat.base_stat}</div>
      ))}
      <br />
      <div>Total: {pokemon.stats.map(stat => (
        stat.base_stat
      )).reduce((a, b) => (a + b
      ))}</div>
      <br />

      <Link to="/pokedex">Back</Link>
    </div>
  );
}

export default PokemonInfo;