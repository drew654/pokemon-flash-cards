import React, { useState } from 'react';
import { useEffect } from 'react';
import { parseName } from './PokemonFunctions';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokeAPIDebug = () => {
  const [pokemons, setPokemons] = useState([]);
  const [segment, setSegment] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemons = await P.getPokemonsList({ offset: segment * 100, limit: 100 });
      const updatedPokemons = await Promise.all(pokemons.results.map(async (pokemon) => {
        const pokemonData = await P.getPokemonByName(pokemon.name);
        return { ...pokemon, id: pokemonData.id, img: pokemonData.sprites.front_default };
      }));
      setPokemons(updatedPokemons);
    };
    fetchPokemons();
  }, [segment]);

  return (
    <div>
      <select value={segment} onChange={(e) => setSegment(parseInt(e.target.value))}>
        <option value={0}>Segment 1</option>
        <option value={1}>Segment 2</option>
        <option value={2}>Segment 3</option>
        <option value={3}>Segment 4</option>
        <option value={4}>Segment 5</option>
        <option value={5}>Segment 6</option>
        <option value={6}>Segment 7</option>
        <option value={7}>Segment 8</option>
        <option value={8}>Segment 9</option>
        <option value={9}>Segment 10</option>
        <option value={10}>Segment 11</option>
        <option value={11}>Segment 12</option>
        <option value={12}>Segment 13</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Parsed Name</th>
            <th>API Name</th>
            <th>Base Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.name}>
              <td style={{ border: '1px solid' }}>{parseName(pokemon.name).fullName}</td>
              <td style={{ border: '1px solid' }}>{pokemon.name}</td>
              <td style={{ border: '1px solid' }}>{parseName(pokemon.name).baseName}</td>
              <td style={{ border: '1px solid' }}>
                <img src={pokemon.img} alt={pokemon.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default PokeAPIDebug;
