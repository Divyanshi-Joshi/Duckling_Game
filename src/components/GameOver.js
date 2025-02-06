// src/components/GameOver.js

import React from 'react';
import './GameOver.css'; // Optional: For styling

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over-container">
      <h1>Game Over!</h1>
      <p>Your Score: {score}</p>
      <button onClick={onRestart} className="restart-button">
        Restart Game
      </button>
    </div>
  );
};

export default GameOver;