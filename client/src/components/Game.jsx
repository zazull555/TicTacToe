import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions";

import Board from "../components/Board";

export default function Game() {
  const history = useSelector((state) => state.history);
  const playerXisNext = useSelector((state) => state.playerXisNext);
  const showWinner = useSelector((state) => state.winner);
  const draw = useSelector((state) => state.draw);
  const dispatch = useDispatch();

  const calculateWinner = (squares) => {
    const winnerConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let isDraw = true;

    for (let i = 0; i < winnerConditions.length; i++) {
      const [a, b, c] = winnerConditions[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        dispatch({
          type: ACTIONS.WINNER,
          payload: squares[a],
        });
        return squares[a];
      }
      if (!squares[a] || !squares[b] || !squares[c]) {
        isDraw = false;
        dispatch({
          type: ACTIONS.DRAW,
          payload: isDraw,
        });
      }
    }

    if (isDraw) {
      dispatch({
        type: ACTIONS.DRAW,
        payload: isDraw,
      });
      return "D";
    }
    return null;
  };

  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = playerXisNext ? "X" : "O";
    dispatch({
      type: ACTIONS.MOVE,
      payload: { squares },
    });
  };

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === "D"
      ? "No more plays to be made"
      : `Game Over`
    : "Next player is " + (playerXisNext ? "X" : "O");

  const moves = history.map((step, move) => {
    const desc = move ? `Go to #${move}` : "Start the game";
    return <li key={move}>{desc}</li>;
  });

  const renderInfo = () => {
    if (showWinner) {
      return (
        <div className="container-info">
          <h1 className="info">Player {showWinner} won the match</h1>
          {renderButton()}
        </div>
      );
    } else if (!showWinner && draw) {
      return (
        <div className="container-info">
          <h1 className="info">The game ended in a draw</h1>
          {renderButton()}
        </div>
      );
    } else {
      return (
        <div className="container-info">
          {renderButton()}
        </div>
      );
    }
  };
  const reset = () => {
   
      dispatch({
      type: ACTIONS.RESET
    });
  }

  const renderButton = () => {
    if (showWinner) {
      return <button onClick={reset}>Play Again</button>;
    } else if (!showWinner && draw) {
      return <button onClick={reset}>Restart</button>;
    } else {
      return <button onClick={reset}>Restart</button>;
    }
  };



  return (
    <div className="container">
      <div className="game-board">
        <Board
          onClick={(i) => handleClick(i)}
          squares={current.squares}
        ></Board>
        {renderInfo()}
      </div>
      <div className="game-history">
        <div>
          <h4>{status}</h4>
        </div>
        <hr />
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
