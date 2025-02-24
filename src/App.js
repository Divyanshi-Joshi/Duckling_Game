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
  const [collectedCharacters, setCollectedCharacters] = useState('');
  const [coins, setCoins] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setCollectedCharacters('');
    setCoins(0);
    console.log(`Game Started in ${mode}!`);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setCollectedCharacters('');
    setCoins(0);
    setGameStarted(false);
    setGameMode(null);
    console.log('Game Reset!');
  };

  return (
    <div className="app-container">
      <GameHeader
        title="Duckling Adventure"
        score={score}
        lives={lives}
        collectedCharacters={collectedCharacters}
        coins={coins}
        gameMode={gameMode}
      />
      <div className="content">
        <Sidebar />
        {gameStarted ? (
          <GameBoard
            setScore={setScore}
            setLives={setLives}
            setCollectedCharacters={setCollectedCharacters}
            setCoins={setCoins}
            score={score}
            lives={lives}
            collectedCharacters={collectedCharacters}
            coins={coins}
            gameMode={gameMode}
            resetGame={resetGame}
          />
        ) : (
          <div style={welcomeStyle}>
            <button className="world-button" onClick={() => startGame('world1')}>
              World 1
            </button>
            <button className="world-button" onClick={() => startGame('world2')}>
              World 2
            </button>
          </div>
        )}
      </div>
      <GameFooter onReset={resetGame} />
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
  gap: '20px',
};

export default App;
