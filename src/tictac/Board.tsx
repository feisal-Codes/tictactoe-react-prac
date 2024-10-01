import { useEffect, useState } from 'react';

interface Props {
  size: number;
  player1: string;
  player2: string;
}
type Redo =
  | {
      player: string;
      steps: number;
      move: number;
    }
  | undefined;

let redoHistory: Redo[] = [];

export const Board = ({ size, player1, player2 }: Props) => {
  const [boardSize, setBoardSize] = useState<Array<string>>(
    [...Array(size)].map((idx) => 'undefined'),
  );

  const [player1Turn] = useState<string>('O');
  const [player2Turn] = useState<string>('X');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<boolean>(true);
  const [undoHistory, setUndoHistory] = useState([
    {
      player: '',
      steps: 0,
      move: 0,
    },
  ]);
  const [score, setScore] = useState([
    {
      name: player1,
      score: 0,
      symbol: player1Turn,
    },
    {
      name: player2,
      score: 0,
      symbol: player2Turn,
    },
  ]);

  const [restart, setRestart] = useState(false);
  const [playersName, setPlayersName] = useState<Array<string>>([]);

  const undo = (player: string, move: number) => {
    setUndoHistory((prev) => {
      return [
        {
          player: player,
          move: move,
          steps: prev.length > 0 ? prev[prev.length - 1].steps + 1 : 1,
        },
      ];
    });
  };

  const handleRedo = () => {
    if (redoHistory.length !== 0) {
      const redo = redoHistory.pop();
      const updatedBoard = [...boardSize].map((board, idx) => {
        if (idx == redo?.move) {
          console.log('here we are!');
          return (board = redo.player);
        } else {
          return board;
        }
      });
      setBoardSize(updatedBoard);
      setActivePlayer((prev) => !prev);
    }
  };

  const handleUndo = () => {
    if (undoHistory.length !== 0) {
      const undoElement = [...undoHistory].pop();
      redoHistory.push(undoElement);

      const undos = undoHistory.slice(0, -1);
      setUndoHistory(undos);

      const updatedBoard = [...boardSize].map((board, idx) => {
        if (idx == undoElement?.move) {
          board = 'undefined';
          return board;
        } else return board;
      });
      setActivePlayer((prev) => !prev);
      setBoardSize(updatedBoard);
    }
  };

  const selectMove = (move: number) => {
    if (activePlayer) {
      playerMove(move, player1Turn);
      redoHistory = [];
      undo(player1Turn, move);
      setActivePlayer((prev) => !prev);
    } else if (activePlayer === false) {
      playerMove(move, player2Turn);
      redoHistory = [];
      undo(player2Turn, move);
      setActivePlayer((prev) => !prev);
    }

    // setTimeout(() => {
    //   computerMove();
    // }, 2000);
  };

  const TrackScore = (winner: string) => {
    setScore((prev) => {
      return prev.map((player) => {
        if (player.symbol === winner) {
          return { ...player, score: player.score + 1 };
        } else return player;
      });
    });
  };

  const playerMove = (move: number, player: string) => {
    if (boardSize[move] !== 'undefined' || move > boardSize.length - 1) {
      alert('Already Occupied');
    } else {
      setBoardSize((prev) => {
        const updatedArr = prev.map((board, idx) => {
          if (idx === move) {
            return player;
          }
          return board;
        });
        return updatedArr;
      });
    }
  };
  const isCellTaken = (move: number) => {
    return boardSize[move] !== 'undefined';
  };

  const restartGame = () => {
    reset();
  };

  const reset = () => {
    setRestart(true);
    setBoardSize([...Array(size)].map((idx) => 'undefined'));
    setUndoHistory([
      {
        player: '',
        steps: 0,
        move: 0,
      },
    ]);
    setActivePlayer(true);
    redoHistory = [];
    setGameOver(false);
    setRestart(false);
  };
  // const computerMove = () => {
  //   let cmove = Math.floor(Math.random() * (boardSize.length - 1));
  //   while (isCellTaken(cmove)) {
  //     cmove = Math.floor(Math.random() * (boardSize.length - 1));
  //   }
  //   setBoardSize((prev) => {
  //     const updatedArr = prev.map((board, idx) => {
  //       if (idx === cmove) {
  //         return computerTurn;
  //       }
  //       return board;
  //     });
  //     return updatedArr;
  //   });
  // };

  const checkEndGame = (): boolean => {
    const gameover = boardSize.every((cell) => cell !== 'undefined');
    if (gameover == true) {
      setGameOver(gameover);
    }
    return gameover;
  };
  const checkWinner = (board: string[]) => {
    const size = Math.sqrt(board.length);

    // Check horizontal rows
    for (let row = 0; row < size; row++) {
      const firstCell = board[row * size];
      if (firstCell !== 'undefined') {
        let isWinningRow = true;
        for (let col = 1; col < size; col++) {
          if (board[row * size + col] !== firstCell) {
            isWinningRow = false;
            break;
          }
        }
        if (isWinningRow) return firstCell; // Winning row found
      }
    }

    // Check vertical columns
    for (let col = 0; col < size; col++) {
      const firstCell = board[col];
      if (firstCell !== 'undefined') {
        let isWinningCol = true;
        for (let row = 1; row < size; row++) {
          if (board[row * size + col] !== firstCell) {
            isWinningCol = false;
            break;
          }
        }
        if (isWinningCol) return firstCell; // Winning column found
      }
    }

    // Check diagonal (top-left to bottom-right)
    const firstDiagonalCell = board[0];
    if (firstDiagonalCell !== 'undefined') {
      let diagonal1 = true;
      for (let i = 1; i < size; i++) {
        if (board[i * size + i] !== firstDiagonalCell) {
          diagonal1 = false;
          break;
        }
      }
      if (diagonal1) return firstDiagonalCell; // Winning diagonal found
    }

    // Check diagonal (top-right to bottom-left)
    const firstDiagonalCell2 = board[size - 1];
    if (firstDiagonalCell2 !== 'undefined') {
      let diagonal2 = true;
      for (let i = 1; i < size; i++) {
        if (board[i * size + (size - 1 - i)] !== firstDiagonalCell2) {
          diagonal2 = false;
          break;
        }
      }
      if (diagonal2) return firstDiagonalCell2; // Winning diagonal found
    }

    return ''; // No winning condition found
  };

  useEffect(() => {
    const winningPlayer = checkWinner([...boardSize]);
    console.log(winningPlayer);
    console.log(undoHistory);
    if (winningPlayer !== '') {
      console.log(winningPlayer);
      TrackScore(winningPlayer);
      setGameOver(true);
    }
    checkEndGame();
  }, [boardSize]);

  const displayCell = (cell: number | string): boolean => {
    if (cell == 'O' || cell == 'X') {
      return true;
    }
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="scoreboard mb-5 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">Scoreboard</h2>
        <div className="flex space-x-4 mb-4">
          {score.map((playerScore, idx) => (
            <div key={idx} className="text-lg font-bold text-blue-600">
              {playerScore.name}: <span className="text-blue-800">{playerScore.score}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Game Controls */}
      {!gameOver && (
        <div className="flex justify-center mb-4 space-x-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            onClick={handleRedo}
          >
            Redo
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
      )}
      {/* Game Board Section */}
      {gameOver ? (
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
          <p className="text-md">Final Scores:</p>
          {score.map((playerScore, idx) => (
            <div key={idx} className="text-lg font-bold text-blue-600">
              {playerScore.name}: <span className="text-blue-800">{playerScore.score}</span>
            </div>
          ))}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={restartGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className={`grid ${boardSize.length === 9 ? 'grid-cols-3' : 'grid-cols-5'} gap-2`}>
          {boardSize.map((cell, idx) => (
            <button
              key={idx}
              className={`h-24 w-24 flex items-center justify-center border-4 rounded-lg shadow-lg transition-transform transform 
                ${cell !== 'undefined' ? 'border-blue-300 bg-blue-200 cursor-not-allowed' : 'border-blue-500 bg-white hover:bg-blue-50 hover:scale-105 cursor-pointer'}`}
              onClick={() => selectMove(idx)}
              disabled={cell !== 'undefined'}
            >
              <span className="text-3xl font-bold text-gray-700">
                {displayCell(cell) && <span>{cell}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
