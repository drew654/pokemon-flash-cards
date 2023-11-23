import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokedexHome = () => {
  const pageSize = 20;
  const pokedexSize = 1017;
  const [pokemons, setPokemons] = useState(Array(pokedexSize).fill(null));
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await P.getPokemonsList({ limit: pageSize, offset: offset });
      const pokemonData = await Promise.all(response.results.map(async pokemon => {
        const number = pokemon.url.split('/')[6];
        const pokemonPromise = P.getPokemonByName(number);
        const speciesPromise = P.getPokemonSpeciesByName(number);
        return {
          name: pokemon.name,
          number,
          pokemonPromise,
          speciesPromise,
        };
      }));
      setPokemons(prev => prev.map((item, index) => pokemonData.find(pokemon => pokemon.number - 1 === index) || item));
      if (offset < pokedexSize) {
        setOffset(offset + pageSize);
      }
    };
  
    loadPokemons();
  }, [offset]);

  return (
    <div>
      <h1 style={{ position: 'fixed', top: 0, left: 0, backgroundColor: 'white', padding: '10px', marginTop: '0px', zIndex: 999 }}>Pokédex</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul>
          {pokemons.map((pokemon, index) => pokemon ? <PokemonCard key={index} pokemon={pokemon} /> : <PokemonCard key={index} pokemon={{number: index + 1}} />)}
        </ul>
      </div>
    </div>
  );
}

export default PokedexHome;