import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatchTheButton.css';

const CatchTheButton = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
    const navigate = useNavigate();
    
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const moveButton = () => {
    const buttonSize = 60; // Smaller button size
    const container = document.getElementById("button-container"); // Get container element
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const newTop = Math.random() * (containerHeight - buttonSize);
    const newLeft = Math.random() * (containerWidth - buttonSize);

    setPosition({ top: newTop, left: newLeft });
    setScore(score + 1);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setPosition({ top: 50, left: 50 });
  };

  const exitGame = () => {
    navigate('/profile');
  };

  return (
    <div className="catch-the-button-container">
      <h1>Catch The Button!</h1>
      <h2>Time Left: {timeLeft}s</h2>
      <h2>Score: {score}</h2>

      <div className="button-container" id="button-container">
        {timeLeft > 0 ? (
          <button
            className="catch-button"
            style={{
              top: position.top,
              left: position.left,
            }}
            onClick={moveButton}
          >
            Click Me!
          </button>
        ) : (
          <>
            <h2>Game Over!</h2>
            <button className="reset-button" onClick={resetGame}>
              Play Again
            </button>
          </>
        )}
      </div>
      <button className="leavegame" onClick={exitGame}>Exit Game</button>
    </div>
  );
};

export default CatchTheButton;
