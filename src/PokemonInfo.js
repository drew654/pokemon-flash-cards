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
      <div style={{ display: 'flex', borderStyle: 'solid', width: '500px', height: '150px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h2 style={{ width: '80px' }}>#{pokemon.id}</h2>
            <h2>{parseName(pokemon.name)}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {pokemon.types.map(type => (
              <h3 key={type.type.name} style={{ marginRight: '10px' }}>{parseName(type.type.name)}</h3>
            ))}
          </div>
        </div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ height: '100%' }} />
      </div>

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