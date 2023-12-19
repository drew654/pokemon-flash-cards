import React from 'react';
import {  Link } from 'react-router-dom';

const PokemonFlashCards = ({ colors }) => {
  const {primaryColor, secondaryColor} = colors;

  const GameModeButton = ({ name, link }) => (
    <Link to={link} 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '4rem',
      width: '20rem',
      fontSize: '2rem',
      cursor: 'pointer',
      borderRadius: '1rem',
      border: '2px solid ' + secondaryColor,
      textDecoration: 'none',
      color: secondaryColor,
      backgroundColor: primaryColor,
      marginTop: '1rem',
    }}
    >
      {name}
    </Link>
  );

  return (
    <div>
      <h1
        style={{
          margin: '0rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          fontSize: '2rem',
          color: secondaryColor,
          backgroundColor: primaryColor,
          textAlign: 'center',
        }}
      >
        Pokémon Flash Cards
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '2rem',
          height: '100vh',
          backgroundColor: primaryColor,
          color: secondaryColor,
          userSelect: 'none',
          overflow: 'auto',
        }}
        >
        <GameModeButton name="What Type Is It?" link="/what-type-is-it" />
        <GameModeButton name="What Generation Is It?" link="/what-generation-is-it" />
      </div>
    </div>
  );
};

export default PokemonFlashCards;
