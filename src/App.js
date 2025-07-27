import React, { useState, useEffect } from 'react';
import './RockPaper.css';

function App() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore
      ? JSON.parse(savedScore)
      : { wins: 0, losses: 0, ties: 0 };
  });

  const [result, setResult] = useState('');
  const [moves, setMoves] = useState('');

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  const getComputerMove = () => {
    const random = Math.random();
    if (random < 1 / 3) return 'Rock';
    else if (random < 2 / 3) return 'Paper';
    else return 'Scissors';
  };

  const playGame = (playerMove) => {
    const computerMove = getComputerMove();
    let outcome = '';

    if (playerMove === computerMove) outcome = 'Tie';
    else if (
      (playerMove === 'Rock' && computerMove === 'Scissors') ||
      (playerMove === 'Paper' && computerMove === 'Rock') ||
      (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
      outcome = 'Win';
    } else {
      outcome = 'Lose';
    }

    setResult(`${outcome}.`);
   setMoves(
  `you <img src="/thumbnails/${playerMove.toLowerCase()}-emoji.png" class="move-icon" alt="${playerMove}"> 
   <img src="/thumbnails/${computerMove.toLowerCase()}-emoji.png" class="move-icon" alt="${computerMove}"> computer`
);


    setScore((prev) => ({
      wins: outcome === 'Win' ? prev.wins + 1 : prev.wins,
      losses: outcome === 'Lose' ? prev.losses + 1 : prev.losses,
      ties: outcome === 'Tie' ? prev.ties + 1 : prev.ties
    }));
  };

  const resetScore = () => {
    const reset = { wins: 0, losses: 0, ties: 0 };
    setScore(reset);
    localStorage.removeItem('score');
  };

  return (
    <div>
      <p className="title-design">Rock Paper Scissors</p>

      <button onClick={() => playGame('Rock')} className="move-button">
        <img src="/thumbnails/rock-emoji.png" className="move-icon" alt="rock" />
      </button>

      <button onClick={() => playGame('Paper')} className="move-button">
        <img src="/thumbnails/paper-emoji.png" className="move-icon" alt="paper" />
      </button>

      <button onClick={() => playGame('Scissors')} className="move-button">
        <img src="/thumbnails/scissors-emoji.png" className="move-icon" alt="scissors" />
      </button>

      <p className="js-results result" dangerouslySetInnerHTML={{ __html: result }}></p>
      <p className="js-moves" dangerouslySetInnerHTML={{ __html: moves }}></p>
      <p className="js-design score">
        Win: {score.wins}, Losess: {score.losses}, Ties: {score.ties}
      </p>

      <button onClick={resetScore} className="reset-score-button">
        Reset Score
      </button>
    </div>
  );
}

export default App;
