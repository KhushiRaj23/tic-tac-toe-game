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
      {value}
    </button>
  );
}

function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xisNext, setisNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];

  function goTo(move) {

    setCurrentMove(move);
    setisNext(move % 2 == 0);

  }

  function handleHistory(squares) {
    const newHistory = [...history.slice(0, currentMove + 1), squares]
    setHistory(newHistory)
    // setHistory([...history, squares]);
    setCurrentMove(newHistory.length-1);
    setisNext(!xisNext);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setisNext(true);
    setCurrentMove(0);
    setisNext(true);
  }
  

  const winner = calculateWinner(currentSquare);
  let status;
  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next player is: ${xisNext ? 'X' : 'O'}`;
  }

  const moves = history.map((squares, move) => {
    let des;

    if (move > 0) {
      des = `Go to move: #${move}`
    } else {
      des = "Go to starting of the game"
    }

    const statusClassName=move%2===0?'status-even':'status-odd';
    return (
      <li className='status-li' key={move}>
        <button className={statusClassName} onClick={() => goTo(move)}>{des}</button>
      </li>
    )
  })
  return (
    <div className='game'>
      <div className='status'>{status}</div>
      <button className='reset-btn' onClick={handleReset}>Reset</button>

      <div className='game-board'>
        <Board xisNext={xisNext} squares={currentSquare} handleHistory={handleHistory} />
      </div>

      <div className='game-input'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

function Board({ xisNext, squares, handleHistory }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const updatedSquares = squares.slice();
    if (xisNext) {
      updatedSquares[i] = 'X';
    } else {
      updatedSquares[i] = 'O';
    }
    handleHistory(updatedSquares);
  }



  return (
    <>

      <div className='board-row'>

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function App() {
  return (
    <div>
      <h1 className='board_title'>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

export default App;
