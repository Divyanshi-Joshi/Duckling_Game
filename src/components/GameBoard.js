// src/components/GameBoard.js

import React, { useState, useEffect, useRef } from 'react';
import './GameBoard.css';
import Duckling from './Duckling';
import MCQModal from './MCQModal';
import { questions } from '../data/questions';

const GameBoard = ({
  setScore,
  setLives,
  setCoins,
  score,
  lives,
  coins,
}) => {
  const gameBoardRef = useRef(null);
  const [leftPosition, setLeftPosition] = useState(50);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMCQ, setShowMCQ] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredBlocks, setAnsweredBlocks] = useState(new Set());
  const [cameraX, setCameraX] = useState(0);

  const forwardSpeed = 2; // pixels per interval
  const jumpHeight = 150;
  const jumpDuration = 600;
  const blockWidth = 100;
  const ducklingWidth = 50; // Adjust based on Duckling component's actual width
  const ducklingHeight = 50; // Adjust based on Duckling component's actual height
  const threshold = 10; // pixels

  // Helper function to generate blocks ensuring no two reds in a row
  const generateBlock = (lastBlockType) => {
    if (lastBlockType === 'red') {
      return {
        type: 'blue',
        x: 0, // Placeholder, set x when adding to blocks
        width: blockWidth,
        height: 50,
      };
    } else {
      return {
        type: Math.random() < 0.3 ? 'red' : 'blue',
        x: 0, // Placeholder, set x when adding to blocks
        width: blockWidth,
        height: 50,
      };
    }
  };

  // 1. Initial Block Generation
  const [blocks, setBlocks] = useState(() => {
    const initialBlocks = [];

    for (let i = 0; i < 15; i++) {
      if (i === 0) {
        // First block is always blue
        initialBlocks.push({
          type: 'blue',
          x: i * blockWidth,
          width: blockWidth,
          height: 50,
        });
      } else {
        // Use helper function to ensure no two reds in a row
        const lastBlockType = initialBlocks[i - 1].type;
        const newBlock = generateBlock(lastBlockType);
        newBlock.x = i * blockWidth;
        initialBlocks.push(newBlock);
      }
    }

    return initialBlocks;
  });

  // 2. Handle Key Press for Jumping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping && !isPaused) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, isPaused]);

  // 3. Game Loop Effect
  useEffect(() => {
    if (!isPaused) {
      const gameLoop = setInterval(() => {
        setLeftPosition((prevLeft) => {
          const potentialNewPos = prevLeft + forwardSpeed;
          const gameWidth = gameBoardRef.current.clientWidth;

          // Update cameraX if the duck reaches the center
          if (potentialNewPos - cameraX >= gameWidth / 2) {
            setCameraX(potentialNewPos - gameWidth / 2);

            // Dynamically add new blocks if nearing the end
            const lastBlock = blocks[blocks.length - 1];
            if (lastBlock.x - cameraX < gameWidth + blockWidth) {
              setBlocks((prevBlocks) => {
                const lastBlockType = prevBlocks[prevBlocks.length - 1]?.type || 'blue';
                const newBlock = generateBlock(lastBlockType);
                newBlock.x = prevBlocks[prevBlocks.length - 1].x + blockWidth;
                return [...prevBlocks, newBlock];
              });
            }
          }

          const duckLeft = potentialNewPos;
          const duckRight = duckLeft + ducklingWidth;

          // Iterate through all blocks to check for collision
          for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const blockLeft = block.x;
            const blockRight = block.x + block.width;

            // Check if duckling is centrally on the red block
            const isOnRedBlock =
              duckLeft >= blockLeft + threshold &&
              duckRight <= blockRight - threshold &&
              block.type === 'red' &&
              !answeredBlocks.has(i);

            if (isOnRedBlock) {
              triggerMCQ(i);
              return prevLeft; // Prevent moving into the red block
            }
          }

          // Ensure the duck doesn't move beyond the current blocks
          const maxLeft = blocks[blocks.length - 1].x + blockWidth - ducklingWidth;
          return Math.min(potentialNewPos, maxLeft);
        });
      }, 20);

      return () => clearInterval(gameLoop);
    }
  }, [isPaused, blocks, answeredBlocks, ducklingWidth, cameraX]);

  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), jumpDuration);
    }
  };

  const triggerMCQ = (blockIndex) => {
    setIsPaused(true);
    setShowMCQ(true);
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setAnsweredBlocks((prev) => new Set(prev).add(blockIndex));
  };

  // 4. Reset Game Function
  const resetGame = () => {
    setLeftPosition(50);
    setAnsweredBlocks(new Set());
    setCameraX(0);
    setIsPaused(false);
    setIsJumping(false);
    setBlocks(() => {
      const initialBlocks = [];

      for (let i = 0; i < 15; i++) {
        if (i === 0) {
          // First block is always blue
          initialBlocks.push({
            type: 'blue',
            x: i * blockWidth,
            width: blockWidth,
            height: 50,
          });
        } else {
          // Use helper function to ensure no two reds in a row
          const lastBlockType = initialBlocks[i - 1].type;
          const newBlock = generateBlock(lastBlockType);
          newBlock.x = i * blockWidth;
          initialBlocks.push(newBlock);
        }
      }

      return initialBlocks;
    });
    setLives(3); // Reset lives to initial value
    setScore(0);
    setCoins(0);
  };

  // 5. Handle Answer Function
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCoins((prevCoins) => prevCoins + 1);
      setScore((prevScore) => prevScore + 10);
    } else {
      // Deduct a life
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          alert('Game Over!');
          resetGame(); // Reset the game entirely
          return 3; // Reset lives to initial value after game over
        }
        return newLives;
      });

      // Reset the duckling's position to the beginning
      setLeftPosition(50);
      setCameraX(0);

      // Optionally, reset answered blocks to allow revisiting questions
      setAnsweredBlocks(new Set());
    }

    setIsPaused(false); // Resume the game
    setShowMCQ(false); // Hide the MCQ modal
  };

  return (
    <div className="game-board" ref={gameBoardRef}>
      <div className="platform">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`block ${block.type}`}
            style={{
              left: `${block.x - cameraX}px`, // Adjust position based on cameraX
              width: `${block.width}px`,
              height: `${block.height}px`,
            }}
          />
        ))}
      </div>
      <Duckling
        className={isJumping ? 'jumping' : ''}
        style={{
          left: `${leftPosition - cameraX}px`, // Adjust position based on cameraX
          transform: isJumping ? `translateY(-${jumpHeight}px)` : 'translateY(0)',
          transition: `transform ${jumpDuration}ms`,
        }}
      />
      {showMCQ && currentQuestion && (
        <MCQModal questionData={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default GameBoard;