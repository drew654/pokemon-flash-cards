import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseName } from './PokedexFunctions';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokedexHome = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    P.getPokemonsList({ limit: 1017, offset: 0 }).then(response => {
      const pokemonData = response.results.map(pokemon => {
        const number = pokemon.url.split('/')[6];
        return { name: pokemon.name, number };
      });
      setPokemons(pokemonData);
    });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <ol>
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <Link to={`/pokedex/${pokemon.number}`}>{parseName(pokemon.name)}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PokedexHome;