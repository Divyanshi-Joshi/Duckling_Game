// src/components/GameFooter.js

import React from 'react';

const GameFooter = ({ onReset }) => {
  return (
    <footer style={footerStyle}>
      <button onClick={onReset} style={buttonStyle}>
        Reset Game
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
  padding: '15px 30px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#FF5733',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.2s',
};

export default GameFooter;
