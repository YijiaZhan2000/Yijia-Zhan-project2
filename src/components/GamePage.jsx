import React, { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import Board from './Board';

const GamePage = ({ mode }) => {
  const { state, dispatch, timer, resetTimer } = useGameContext();

  // Initialize game with the correct mode when component mounts
  useEffect(() => {
    // Reset the game with the current mode
    dispatch({ 
      type: 'INITIALIZE_GAME', 
      payload: { mode } 
    });
    
    // Explicitly reset the timer
    resetTimer();
  }, [mode, dispatch, resetTimer]);

  // Handle player attack
  const handleAttack = (x, y) => {
    if (state.currentPlayer === 'player' && !state.isGameOver) {
      dispatch({
        type: 'PLAYER_ATTACK',
        payload: { x, y }
      });
    }
  };

  // Reset game state
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    resetTimer(); // Explicitly reset timer when game is reset
  };

  // AI logic
  useEffect(() => {
    if (state.currentPlayer === 'AI' && !state.isGameOver) {
      const aiAttackTimeout = setTimeout(() => {
        dispatch({ type: 'AI_ATTACK' });
      }, 1000);
      
      return () => clearTimeout(aiAttackTimeout);
    }
  }, [state.currentPlayer, state.isGameOver, dispatch]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>{mode === 'normal' ? 'Standard Battle' : 'Training Mode'}</h2>
        <div className="game-status">
          <span className="timer">{formatTime(timer)}</span>
          <span>Turn: {state.currentPlayer}</span>
          <button onClick={resetGame} className="reset-button">Reset</button>
        </div>
      </div>

      {state.isGameOver && (
        <div className="game-over">
          <h2>Game over! {state.winner} Won!</h2>
          <p>Completed in {formatTime(timer)}</p>
        </div>
      )}

      <div className="boards">
        <div className="enemy-board">
          <h3>Enemy Waters</h3>
          <Board 
            isPlayer={false} 
            onCellClick={handleAttack}
            disabled={state.currentPlayer !== 'player' || state.isGameOver}
          />
        </div>
        
        {/* For 'easy' mode, don't show the player board */}
        {mode === 'normal' && (
          <div className="player-board">
            <h3>Your Fleet</h3>
            <Board 
              isPlayer={true} 
              disabled={true} // Player's own board shouldn't be clickable
            />
          </div>
        )}
      </div>

      {state.isGameOver && (
        <div className="game-over-modal">
          <h2>Victory to {state.winner}!</h2>
          <p>Completed in {formatTime(timer)} seconds</p>
          <button onClick={resetGame} className="reset-button">New Game</button>
        </div>
      )}
      
      <div className="ship-counter">
        <h3>Ship Status</h3>
        <div>
          <p>Your ships: {countRemainingShips(state.playerBoard)}/5</p>
          <p>Enemy ships: {countRemainingShips(state.aiBoard)}/5</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to count remaining ships
function countRemainingShips(board) {
  if (!board || !board.length) return 0;
  
  // Count ship cells that are not hit
  let shipCells = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (board[x][y].isShip && !board[x][y].isHit) {
        shipCells++;
      }
    }
  }
  
  // Ship distribution: 5 + 4 + 3 + 3 + 2 = 17 cells total
  // Map remaining cells to ships based on proportion remaining
  // This is an approximation, but gives a better sense of ships remaining
  const totalShipCells = 17; // 5 + 4 + 3 + 3 + 2
  const remainingShips = Math.min(5, Math.ceil((shipCells / totalShipCells) * 5));
  
  return remainingShips;
}

export default GamePage;