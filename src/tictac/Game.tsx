import { useState } from 'react';
import { Board } from './Board';

const Game = () => {
  const [size, setSize] = useState(0);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSizeSelection = (s: number) => {
    if (player1 && player2) {
      setSize(s * s);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {size === 0 ? (
        <>
          <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">Tic Tac Toe</h1>

          <div className="mb-4 w-full max-w-xs">
            <input
              type="text"
              placeholder="Player 1 Name"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              aria-label="Player 1 Name"
            />
            <input
              type="text"
              placeholder="Player 2 Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              aria-label="Player 2 Name"
            />
          </div>

          <div className="text-center mt-6">
            <h3 className="mb-4 text-2xl font-semibold text-gray-700">Select Board Size</h3>
            <div className="flex justify-center space-x-4">
              {[3, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSizeSelection(s)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                  aria-label={`Select ${s} x ${s} board`}
                >
                  {s} x {s}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Board size={size} player1={player1} player2={player2} />
      )}
    </div>
  );
};

export default Game;
