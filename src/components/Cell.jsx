import React from 'react';

const Cell = ({ cell, isPlayer, onClick }) => {
  // Determine cell styling based on state
  let cellStyle = {};
  let content = '';
  
  if (!cell.isRevealed) {
    cellStyle = {
      backgroundColor: '#ddd',
      cursor: 'pointer'
    };
  } else if (cell.isHit) {
    cellStyle = {
      backgroundColor: '#ff4444',
      cursor: 'not-allowed'
    };
    content = '💥';
  } else {
    cellStyle = {
      backgroundColor: '#44ff44',
      cursor: 'not-allowed'
    };
    content = '🌊';
  }
  
  // If it's the player's board, show ships
  if (isPlayer && cell.isShip && !cell.isRevealed) {
    cellStyle.backgroundColor = '#666';
  }

  return (
    <div 
      className="cell"
      onClick={onClick}
      style={cellStyle}
    >
      {content}
    </div>
  );
};

export default Cell;