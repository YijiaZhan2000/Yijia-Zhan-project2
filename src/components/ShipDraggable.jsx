export const generateShips = (board) => {
  const shipSizes = [5, 4, 3, 3, 2];
  let newBoard = [...board];

  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      const vertical = Math.random() > 0.5;
      const maxX = vertical ? 10 - size : 9;
      const maxY = vertical ? 9 : 10 - size;
      
      const startX = Math.floor(Math.random() * (maxX + 1));
      const startY = Math.floor(Math.random() * (maxY + 1));

      // boundary checking
      if (canPlaceShip(newBoard, startX, startY, size, vertical)) {
        newBoard = placeShip(newBoard, startX, startY, size, vertical);
        placed = true;
      }
    }
  });

  return newBoard;
};


const canPlaceShip = (board, x, y, size, vertical) => {
  for (let i = 0; i < size; i++) {
    const checkX = vertical ? x + i : x;
    const checkY = vertical ? y : y + i;
    
    if (checkX >= 10 || checkY >= 10) return false;
    if (board[checkX][checkY].isShip) return false;
    
    // Check adjacent cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const adjX = checkX + dx;
        const adjY = checkY + dy;
        if (adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10) {
          if (board[adjX][adjY].isShip) return false;
        }
      }
    }
  }
  return true;
};