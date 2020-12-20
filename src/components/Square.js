import React from "react";

// X or O
const Square = ({ value, onClick }) => {
  const style = value ? `squares ${value}` : 'sqaures'

  return <button className={style} onClick={onClick}>{value}</button>;
};

export default Square;
