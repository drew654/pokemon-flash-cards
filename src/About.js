import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <h1>About</h1>
      <p>Learn more about us!</p>
    </div>
  );
}

export default About;
