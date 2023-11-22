import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Link } from 'react-router-dom';
import { parseName } from './PokedexFunctions';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokedexHome = () => {
  const [pokemons, setPokemons] = useState([]);
  const pageSize = 20;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await P.getPokemonsList({ limit: pageSize, offset: offset });
      const pokemonData = await Promise.all(response.results.map(async pokemon => {
        const number = pokemon.url.split('/')[6];
        const pokemonInfo = await P.getPokemonByName(number);
        const types = pokemonInfo.types.map(type => type.type.name);
        return { name: pokemon.name, number, types };
      }));

      setPokemons(prev => {
        const newPokemons = [...prev, ...pokemonData];
        const uniquePokemons = Array.from(new Set(newPokemons.map(pokemon => pokemon.number))).map(number => {
          return newPokemons.find(pokemon => pokemon.number === number);
        });
        uniquePokemons.sort((a, b) => a.number - b.number);
        return uniquePokemons;
      }); 

      if (offset < 1017) {
        setOffset(prev => Math.min(prev + pageSize, 1017 - pageSize));
      }
    };
  
    loadPokemons();
  }, [offset]);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemons.map(pokemon => <PokemonCard key={pokemon.number} pokemon={pokemon} />)}
      </ul>
    </div>
  );
}

export default PokedexHome;