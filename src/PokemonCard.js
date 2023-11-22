import { Link } from 'react-router-dom';
import { parseName } from './PokedexFunctions';

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokedex/${pokemon.number}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'flex', borderStyle: 'solid', width: '500px', height: '150px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h2 style={{ width: '80px' }}>#{pokemon.number}</h2>
            <h2>{parseName(pokemon.name)}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {pokemon.types.map(type => (
              <h3 key={type} style={{ marginRight: '10px' }}>{parseName(type)}</h3>
            ))}
          </div>
        </div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`} alt={pokemon.name} style={{ height: '100%' }} />
      </div>
    </Link>
  );
}

export default PokemonCard;