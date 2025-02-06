// src/components/MainScreen.js

import React from 'react';
import './MainScreen.css'; // Create and style as needed

const MainScreen = ({ message, onRestart, score, coins }) => {
  return (
    <div className="main-screen">
      <h1>{message}</h1>
      {score !== undefined && coins !== undefined && (
        <div className="game-stats">
          <p>Your Score: {score}</p>
          <p>Coins Collected: {coins}</p>
        </div>
      )}
      <button onClick={onRestart} className="restart-button">
        {message === "Game Over!" ? "Restart Game" : "Start Game"}
      </button>
    </div>
  );
};

export default MainScreen;