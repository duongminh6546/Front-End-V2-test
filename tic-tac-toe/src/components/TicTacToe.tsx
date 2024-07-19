import React, { useState } from 'react';

type Player = 'X' | 'O' | null;

const initialBoard: Player[] = Array(9).fill(null);

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw'>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const calculateWinner = (board: Player[]): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 bg-white border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-2xl">
          {winner === 'Draw' ? 'Hòa!' : `Người thắng: ${winner}`}
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
        onClick={handleRestart}
      >
        Chơi lại
      </button>
    </div>
  );
};

export default TicTacToe;
