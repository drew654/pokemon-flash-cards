import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Link } from 'react-router-dom';
import { parseName } from './PokedexFunctions';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokedexHome = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    P.getPokemonsList({ limit: 1017, offset: 0 }).then(response => {
      const pokemonData = response.results.map(async pokemon => {
        const number = pokemon.url.split('/')[6];
        const pokemonInfo = await P.getPokemonByName(number);
        const types = pokemonInfo.types.map(type => type.type.name);
        return { name: pokemon.name, number, types };
      });
      Promise.all(pokemonData).then(data => {
        setPokemons(data);
      });
    });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemons.map(pokemon => <PokemonCard pokemon={pokemon} />)}
      </ul>
    </div>
  );
}

export default PokedexHome;