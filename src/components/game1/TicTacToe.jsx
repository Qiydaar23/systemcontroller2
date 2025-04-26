import React, { useState } from 'react';
import './Game1.css';
import cross from '../../assets/xsymbol.png';
import circle from '../../assets/osymbol.jpg';

const TicTacToe = () => {
    const [data, setData] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    const toggle = (index) => {
        if (lock || data[index] !== "") return;

        const newData = [...data];
        newData[index] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (currentData) => {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
                alert(`${currentData[a]} wins!`);
                setLock(true);
                return;
            }
        }

        if (currentData.every(cell => cell !== "")) {
            alert("It's a draw!");
            setLock(true);
        }
    };

    const resetGame = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
    };

    return (
        <div className='container'>
            <h1>Tic Tac Toe</h1>
            <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
            <div className='board'>
                {[0, 1, 2].map(row => (
                    <div key={row} className={`row${row + 1}`}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className='boxes'
                                    onClick={() => toggle(index)}
                                >
                                    {data[index] === "x" && <img src={cross} alt="cross" />}
                                    {data[index] === "o" && <img src={circle} alt="circle" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TicTacToe;
