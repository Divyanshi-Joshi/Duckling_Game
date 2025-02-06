// src/components/MCQModal.js

import React, { useEffect, useRef, useState } from 'react';
import './MCQModal.css';

const MCQModal = ({ questionData, onAnswer }) => {
  const { question, options, correctOption } = questionData;
  const modalRef = useRef(null);
  const firstButtonRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Focus the first button when the modal opens
    firstButtonRef.current.focus();

    // Prevent scrolling on the background
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOptionClick = (selectedOption) => {
    setSelected(selectedOption);
    const correct = selectedOption === correctOption;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      // Optionally, handle closing the modal with the Escape key
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      ref={modalRef}
    >
      <div className="modal-content">
        <h2>Question</h2>
        <p>{question}</p>
        <div className="options">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opt)}
              ref={index === 0 ? firstButtonRef : null}
              disabled={selected !== null}
              className={
                selected ? (opt === correctOption ? 'correct' : opt === selected ? 'incorrect' : '') : ''
              }
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQModal;