// src/App.js

import React, { useState } from 'react';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import Sidebar from './components/Sidebar';
import GameFooter from './components/GameFooter';
import './styles/App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setCoins(0);
    // Initialize or reset game state here
    console.log('Game Started!');
  };

  return (
    <div className="app-container">
      <GameHeader title="Duckling Game" score={score} lives={lives} coins={coins} />
      <div className="content">
        <Sidebar />
        {gameStarted ? (
          <GameBoard
            setScore={setScore}
            setLives={setLives}
            setCoins={setCoins}
            score={score}
            lives={lives}
            coins={coins}
          />
        ) : (
          <div style={welcomeStyle}>Welcome! Click "Start Game" to begin.</div>
        )}
      </div>
      <GameFooter onStart={startGame} />
    </div>
  );
};

const welcomeStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  color: '#555',
};

export default App;