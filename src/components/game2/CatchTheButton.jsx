import React, { useState, useEffect } from 'react';

const CatchTheButton = () => {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const moveButton = () => {
    const newTop = Math.random() * (window.innerHeight - 100);
    const newLeft = Math.random() * (window.innerWidth - 100);
    setPosition({ top: newTop, left: newLeft });
    setScore(score + 1);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setPosition({ top: 100, left: 100 });
  };

  return (
    <div style={styles.container}>
      <h1>Catch The Button!</h1>
      <h2>Time Left: {timeLeft}s</h2>
      <h2>Score: {score}</h2>

      {timeLeft > 0 ? (
        <button
          style={{
            ...styles.button,
            top: position.top,
            left: position.left,
          }}
          onClick={moveButton}
        >
          Catch Me!
        </button>
      ) : (
        <>
          <h2>Game Over!</h2>
          <button style={styles.resetButton} onClick={resetGame}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f0f8ff',
    textAlign: 'center',
    paddingTop: '20px',
  },
  button: {
    position: 'absolute',
    padding: '15px 25px',
    fontSize: '18px',
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  resetButton: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#008cba',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CatchTheButton;
