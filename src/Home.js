import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pokemon-flash-cards">Pokémon Flash Cards</Link></li>
        </ul>
      </nav>

      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
