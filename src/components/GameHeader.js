// src/components/GameHeader.js

import React from 'react';
import { FaHeart, FaCoins } from 'react-icons/fa';
import sunImage from '../assets/sun.png';
import './GameHeader.css';

const GameHeader = ({ title, score, lives, collectedCharacters, coins, gameMode }) => {
  return (
    <header className="game-header">
      <div className="header-left">
        <div className="stat-container">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>

        <div className="stat-container lives-container">
          {Array.from({ length: lives }, (_, index) => (
            <FaHeart key={index} className="heart-icon" />
          ))}
        </div>

        {gameMode === 'world1' ? (
          <div className="stat-container">
            <span className="stat-label">Coins:</span>
            <span className="stat-value">{coins}</span>
            <FaCoins className="coin-icon" />
          </div>
        ) : (
          <div className="stat-container">
            <span className="stat-label">Collected:</span>
            <span className="stat-value">{collectedCharacters}</span>
          </div>
        )}
      </div>

      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        <img src={sunImage} alt="Sun" className="sun-image" />
      </div>
    </header>
  );
};

export default GameHeader;
