import { parseName } from './PokemonFunctions';

export const StartButton = ({ onClick, colors }) => {
  const { secondaryColor } = colors;
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '4em',
        width: '10em',
        fontSize: '2rem',
        cursor: 'pointer',
        borderRadius: '0.5em',
        border: '2px solid ' + secondaryColor,
      }}
    >Start</div>
  );
};

export const PokemonNameHeader = ({ pokemon }) => {
  return (
    <div>
      <h2
        style={{
          marginBottom: parseName(pokemon?.name)?.prefix ? '0rem' : '2rem',
          fontSize: '1.5rem',
        }}
      >
        {parseName(pokemon?.name)?.prefix ?? ' '}
      </h2>
      <h1
        style={{
          margin: '0rem',
          fontSize: '1.9rem',
        }}
      >
        {parseName(pokemon?.name)?.baseName ?? ' '}
      </h1>
      <h2
        style={{
          marginTop: parseName(pokemon?.name)?.suffix ? '0rem' : '2rem',
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
        }}
      >
        {parseName(pokemon?.name)?.suffix ?? ' '}
      </h2>
    </div>
  );
};
