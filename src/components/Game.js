import { useEffect, useState } from 'react';
import { winnerCalc } from '../services/winnerCalc';
import Board from './Board';

function pcNum() {
  return Math.floor(Math.random() * 9);
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = winnerCalc(history[step]);
  const xO = xIsNext ? 'X' : 'O';
  const [pClick, setPClick] = useState(true);

  const handleClick = (e) => {
    const historyPoint = history.slice(0, step + 1);
    const current = historyPoint[step];
    const squares = [...current];

    if (winner || squares[e]) return;

    squares[e] = xO;

    setHistory([...historyPoint, squares]);
    setStep(historyPoint.length);
    setXIsNext(!xIsNext);
    setPClick(false);
  };

  const compClick = () => {
    const ranNum = pcNum();
    const currentBoard = history
      .slice(0, step + 1)
      [step].map((i, ind) => (i === null ? null : ind));

    // console.log({ ranNum, currentBoard, comp: new Date() });

    if (currentBoard.includes(ranNum) && !winner) {
      return compClick();
    }

    const compHistoryPoint = history.slice(0, step + 1);
    const compCurrent = compHistoryPoint[step];
    const compSquares = [...compCurrent];

    compSquares[ranNum] = xO;

    setHistory([...compHistoryPoint, compSquares]);
    setStep(compHistoryPoint.length);
    setXIsNext(!xIsNext);
    setPClick(true);
  };

  const renderMoves = () =>
    history.map((pStep, move) => {
      const destination = move ? `Go to move №${move}` : 'Go To Start';
      return (
        <p key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </p>
      );
    });

  const jumpTo = (step) => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };

  useEffect(() => {
    if (!pClick) compClick();
    // eslint-disable-next-line
  }, [pClick]);

  return (
    <div className="game">
      <Board squares={history[step]} onClick={handleClick} />
      <h2>{winner ? <span>Winner {winner}</span> : 'Next player ' + xO}</h2>
      <div>
        <h2>History</h2>
        {renderMoves()}
      </div>
    </div>
  );
};

export default Game;
