// src/components/GameFooter.js
import React from 'react';

const GameFooter = ({ onStart }) => {
  return (
    <footer style={footerStyle}>
      <button onClick={onStart} style={buttonStyle}>
        Start Game
      </button>
    </footer>
  );
};

const footerStyle = {
  padding: '20px',
  backgroundColor: '#4CAF50',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default GameFooter;