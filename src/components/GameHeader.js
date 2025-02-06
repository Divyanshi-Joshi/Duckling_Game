// src/components/GameHeader.js
import React from 'react';
import { FaHeart, FaCoins } from 'react-icons/fa';
import sunImage from '../assets/sun.png';
const GameHeader = ({ title, score, lives, coins }) => {
  return (
    <header style={headerStyle}>
      <div style={leftStyle}>
        <div style={statStyle}>
          <span>Score: {score}</span>
        </div>
        <div style={statStyle}>
          <FaHeart color="red" /> <span>{lives}</span>
        </div>
        <div style={statStyle}>
          <FaCoins color="goldenrod" /> <span>{coins}</span>
        </div>
      </div>
      <div style={titleStyle}>
        <h1>{title}</h1>
      </div>
      <div style={rightStyle}>
      <img src={sunImage} alt="Sun" style={{ width: '200px', height: '200px' }} />
      </div>
    </header>
  );
};

const headerStyle = {
  padding: '10px 20px',
  backgroundColor: '#87CEEB', // Sky blue color
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const leftStyle = {
  display: 'flex',
  alignItems: 'center',
};
const rightStyle = {
    display: 'flex',
    alignItems: 'center',
  };

const statStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px',
  fontSize: '18px',
};

const titleStyle = {
  flex: 1,
  textAlign: 'center',
};

export default GameHeader;