// src/components/Duckling.js

import React, { forwardRef } from 'react';
import ducklingImage from '../assets/duckling.png';
import './Duckling.css';

const Duckling = forwardRef(({ style, className }, ref) => {
  return (
    <div className={`duckling ${className}`} style={style} ref={ref}>
      <img src={ducklingImage} alt="Duckling" />
    </div>
  );
});

export default Duckling;