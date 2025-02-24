// src/components/GameBoard.js

import React, { useState, useEffect, useRef } from 'react';
import './GameBoard.css';
import Duckling from './Duckling';
import MCQModal from './MCQModal';
import { questions } from '../data/questions';

const GameBoard = ({
  setScore,
  setLives,
  setCollectedCharacters,
  setCoins,
  score,
  lives,
  collectedCharacters,
  coins,
  gameMode,
  resetGame,
}) => {
  const gameBoardRef = useRef(null);
  const [leftPosition, setLeftPosition] = useState(50);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMCQ, setShowMCQ] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredBlocks, setAnsweredBlocks] = useState(new Set());
  const [cameraX, setCameraX] = useState(0);

  const [targetString, setTargetString] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const forwardSpeed = 200; // Pixels per second for forward movement
  const backwardSpeed = 200; // Pixels per second for backward movement
  const jumpHeight = 150;
  const jumpDuration = 600;
  const blockWidth = 100;
  const ducklingWidth = 50;
  const ducklingHeight = 50;
  const threshold = 10;

  const dsaWords = [
    'ARRAY', 'STACK', 'QUEUE', 'TREE', 'GRAPH', 'HEAP', 'HASHMAP', 'LINKEDLIST', 'BINARY',
    'SORTING', 'SEARCH', 'DYNAMIC', 'RECURSION', 'TRIE', 'SEGMENT', 'BIT', 'AVL', 'REDBLACK',
    'BACKTRACKING', 'GREEDY', 'FLOW', 'KMP', 'BFS', 'DFS', 'PRIORITY', 'BITMAP', 'QUEUE',
    'CYCLE', 'PATH', 'MST', 'DISJOINT', 'STACKS',
  ];

  const generateBlock = (lastBlockType) => {
    if (lastBlockType === 'red') {
      return {
        type: 'blue',
        x: 0,
        width: blockWidth,
        height: 50,
      };
    } else {
      return {
        type: Math.random() < 0.3 ? 'red' : 'blue',
        x: 0,
        width: blockWidth,
        height: 50,
      };
    }
  };

  const selectRandomTarget = () => {
    const randomIndex = Math.floor(Math.random() * dsaWords.length);
    return dsaWords[randomIndex];
  };

  useEffect(() => {
    if (gameMode === 'world2') {
      const initialTarget = selectRandomTarget();
      setTargetString(initialTarget);
      setCurrentCharIndex(0);
      setCollectedCharacters('');
    }
  }, [gameMode]);

  const [blocks, setBlocks] = useState(() => {
    const initialBlocks = [];
    for (let i = 0; i < 15; i++) {
      if (i === 0) {
        initialBlocks.push({
          type: 'blue',
          x: i * blockWidth,
          width: blockWidth,
          height: 50,
        });
      } else {
        const lastBlockType = initialBlocks[i - 1].type;
        const newBlock = generateBlock(lastBlockType);
        newBlock.x = i * blockWidth;
        initialBlocks.push(newBlock);
      }
    }
    return initialBlocks;
  });

  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const lastTimeRef = useRef(null);

  // Handle Key Press for Movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping && !isPaused) {
        jump();
      } else if (e.code === 'ArrowRight' && !isPaused) {
        setIsMovingForward(true);
      } else if (e.code === 'ArrowLeft' && !isPaused) {
        setIsMovingBackward(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowRight') {
        setIsMovingForward(false);
      } else if (e.code === 'ArrowLeft') {
        setIsMovingBackward(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, isPaused]);

  // Game Loop using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const gameLoop = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaTime = (time - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = time;

      if (!isPaused) {
        if (isMovingForward) {
          moveForward(deltaTime);
        } else if (isMovingBackward) {
          moveBackward(deltaTime);
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isMovingForward, isMovingBackward]);

  const moveForward = (deltaTime) => {
    setLeftPosition((prevLeft) => {
      const potentialNewPos = prevLeft + forwardSpeed * deltaTime;
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

      // Check for collision with red blocks
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockLeft = block.x;
        const blockRight = block.x + block.width;

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
  };

  const moveBackward = (deltaTime) => {
    setLeftPosition((prevLeft) => {
      const potentialNewPos = prevLeft - backwardSpeed * deltaTime;

      // Prevent moving backward beyond the starting point
      if (potentialNewPos < 50) {
        return 50;
      }

      const duckLeft = potentialNewPos;
      const duckRight = duckLeft + ducklingWidth;

      // Check for collision with red blocks
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockLeft = block.x;
        const blockRight = block.x + block.width;

        const isOnRedBlock =
          duckLeft >= blockLeft + threshold &&
          duckRight <= blockRight - threshold &&
          block.type === 'red' &&
          answeredBlocks.has(i); // Only check passed red blocks

        if (isOnRedBlock) {
          return prevLeft; // Prevent moving backward through passed red blocks
        }
      }

      return potentialNewPos;
    });
  };

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

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      if (gameMode === 'world1') {
        setCoins((prevCoins) => prevCoins + 1);
      } else if (gameMode === 'world2') {
        const nextChar = targetString[currentCharIndex];
        setCollectedCharacters((prev) => prev + nextChar);
        setCurrentCharIndex((prevIndex) => prevIndex + 1);

        if (collectedCharacters.length + 1 === targetString.length) {
          setTimeout(() => {
            alert('Level Completed!');
            resetGame();
          }, 100);
        }
      }
      setScore((prevScore) => prevScore + 10);
    } else {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          alert('Game Over!');
          resetGame();
          return 3;
        }
        return newLives;
      });

      setLeftPosition(50);
      setCameraX(0);
      if (gameMode === 'world2') {
        setCollectedCharacters('');
      }
      setAnsweredBlocks(new Set());
    }

    setIsPaused(false);
    setShowMCQ(false);
  };

  return (
    <div className="game-board" ref={gameBoardRef}>
      <div className="platform">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`block ${block.type}`}
            style={{
              left: `${block.x - cameraX}px`,
              width: `${block.width}px`,
              height: `${block.height}px`,
            }}
          />
        ))}
      </div>
      <Duckling
        className={isJumping ? 'jumping' : ''}
        style={{
          left: `${leftPosition - cameraX}px`,
          transform: isJumping ? `translateY(-${jumpHeight}px)` : 'translateY(0)',
          transition: `transform ${jumpDuration}ms, left 100ms linear`,
        }}
      />
      {showMCQ && currentQuestion && (
        <MCQModal questionData={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default GameBoard;
