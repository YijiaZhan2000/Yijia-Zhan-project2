export const generateShips = (board) => {
  const newBoard = board.map(row => [...row]);
  const shipSizes = [5, 4, 3, 3, 2];
  
  shipSizes.forEach(size => {
    let placed = false;
    while (!placed) {
      const vertical = Math.random() > 0.5;
      const x = vertical ? 
        Math.floor(Math.random() * (10 - size)) : 
        Math.floor(Math.random() * 10);
      const y = !vertical ? 
        Math.floor(Math.random() * (10 - size)) : 
        Math.floor(Math.random() * 10);

      if (canPlaceShip(newBoard, x, y, size, vertical)) {
        placeShip(newBoard, x, y, size, vertical);
        placed = true;
      }
    }
  });
  
  return newBoard;
};