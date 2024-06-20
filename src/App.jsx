import { useState } from 'react';
import './App.css';


function calculateWinner(squares) {
  const winningComb = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],


  ];
  for (let i = 0; i < winningComb.length; i++) {
    const [a, b, c] = winningComb[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];

    }
  }
  return null;
}
function Square({ value, onSquareClick }) {

  return (
    <button onClick={onSquareClick} className='square'>
      {" "}
      {value}{" "}</button>
  )
}



function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xisNext, setisNext] = useState(true);
  function handleClick(i) {


    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const updatedSqaures = squares.slice();
    if (xisNext) {
      updatedSqaures[i] = "X";
    }
    else {
      updatedSqaures[i] = "O";
    }
    setisNext(!xisNext);
    setSquares(updatedSqaures);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setisNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner is: ${winner}`
  } else {
    status = `Next player is: ${xisNext ? 'X' : 'O'}`
  }
  return (
    <>
      <div className='status'>{status}</div>
      <button className='reset-btn' onClick={handleReset}>Reset</button>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
        <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
      </div>
    </>
  )
}
function App() {
  return (
    <div>
      <h1 className='board_title'>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}
export default App;