import React, { useState, useEffect }  from 'react';
import Board from '../../components/Board';
import { calculateWinner } from '../../utils/utils';
import './style.css';

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const historyCurr = history.slice(0, stepNumber + 1);
    const current = historyCurr[historyCurr.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([{
      squares: squares
    }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0)
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  console.log('1、代码一，普通的语句，在每次状态有改动的时候就会去进行读取');

  useEffect(() => {
    console.log('3、类似componentDidMount的效果！')
  }, []);

  console.log('2、代码二');

  useEffect(() => {
    console.log('4、初始化的时候先调用一次，后续如果winner有改动，也会调用一次')
    if(winner) {
      document.title = `${winner} wins!`
    }
    return () => {
      console.log('4.0、如果需要清除副作用，需要返回一个函数')
    }
  }, [winner]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;