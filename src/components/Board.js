import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, ind) => (
        <Square key={ind} value={square} onClick={() => onClick(ind)} />
      ))}
    </div>
  );
};

export default Board;
