import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';

// Initialize context
const GameContext = createContext();

const generateEmptyBoard = () => 
  Array(10).fill().map(() => 
    Array(10).fill().map(() => ({ 
      isShip: false, 
      isHit: false, 
      isRevealed: false 
    }))
  );

// Initial state
const initialState = {
  playerBoard: generateEmptyBoard(),
  aiBoard: generateEmptyBoard(),
  gameMode: null,
  isGameOver: false,
  winner: null,
  currentPlayer: 'player',
  ships: [
    { size: 5, placed: false },
    { size: 4, placed: false },
    { size: 3, placed: false },
    { size: 3, placed: false },
    { size: 2, placed: false },
  ]
};

// Helper function to place ships
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

const placeShip = (board, x, y, size, vertical) => {
  const newBoard = board.map(row => [...row]);
  for (let i = 0; i < size; i++) {
    const shipX = vertical ? x + i : x;
    const shipY = vertical ? y : y + i;
    newBoard[shipX][shipY] = { ...newBoard[shipX][shipY], isShip: true };
  }
  return newBoard;
};

const generateShips = (board) => {
  const shipSizes = [5, 4, 3, 3, 2];
  let newBoard = JSON.parse(JSON.stringify(board));
  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      const vertical = Math.random() > 0.5;
      const maxX = vertical ? 10 - size : 9;
      const maxY = vertical ? 9 : 10 - size;
      const startX = Math.floor(Math.random() * (maxX + 1));
      const startY = Math.floor(Math.random() * (maxY + 1));
      if (canPlaceShip(newBoard, startX, startY, size, vertical)) {
        newBoard = placeShip(newBoard, startX, startY, size, vertical);
        placed = true;
      }
    }
  });
  return newBoard;
};

// Random AI attack
const generateAIAttack = (playerBoard) => {
  const availableCells = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (!playerBoard[x][y].isRevealed) availableCells.push({ x, y });
    }
  }
  return availableCells.length > 0 
    ? availableCells[Math.floor(Math.random() * availableCells.length)]
    : null;
};

// Check if all ships are sunk
const checkAllShipsSunk = (board) => {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (board[x][y].isShip && !board[x][y].isHit) return false;
    }
  }
  return true;
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME': {
      const playerBoard = generateShips(generateEmptyBoard());
      const aiBoard = generateShips(generateEmptyBoard());
      return {
        ...state,
        playerBoard,
        aiBoard,
        gameMode: action.payload.mode,
        isGameOver: false,
        winner: null,
        currentPlayer: 'player'
      };
    }
    case 'PLAYER_ATTACK': {
      const { x, y } = action.payload;
      const newAiBoard = state.aiBoard.map(row => [...row]);
      if (newAiBoard[x][y].isRevealed) return state;
      newAiBoard[x][y] = { ...newAiBoard[x][y], isRevealed: true, isHit: newAiBoard[x][y].isShip };
      const allAiShipsSunk = checkAllShipsSunk(newAiBoard);
      if (allAiShipsSunk) {
        localStorage.removeItem("battleshipState");
        return { ...state, aiBoard: newAiBoard, isGameOver: true, winner: 'Player' };
      }
      return {
        ...state,
        aiBoard: newAiBoard,
        currentPlayer: state.gameMode === 'easy' ? 'player' : 'AI'
      };
    }
    case 'AI_ATTACK': {
      if (state.gameMode === 'easy' || state.isGameOver) return state;
      const attack = generateAIAttack(state.playerBoard);
      if (!attack) return state;
      const { x, y } = attack;
      const newPlayerBoard = state.playerBoard.map(row => [...row]);
      newPlayerBoard[x][y] = { ...newPlayerBoard[x][y], isRevealed: true, isHit: newPlayerBoard[x][y].isShip };
      const allPlayerShipsSunk = checkAllShipsSunk(newPlayerBoard);
      if (allPlayerShipsSunk) {
        localStorage.removeItem("battleshipState");
        return { ...state, playerBoard: newPlayerBoard, isGameOver: true, winner: 'AI' };
      }
      return { ...state, playerBoard: newPlayerBoard, currentPlayer: 'player' };
    }
    case 'RESET_GAME': {
      localStorage.removeItem("battleshipState");
      const playerBoard = generateShips(generateEmptyBoard());
      const aiBoard = generateShips(generateEmptyBoard());
      return { ...initialState, playerBoard, aiBoard, gameMode: state.gameMode };
    }
    default:
      return state;
  }
};

// Provider Component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedState = localStorage.getItem("battleshipState");
    return savedState ? JSON.parse(savedState) : initialState;
  });

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Save state to localStorage
  useEffect(() => {
    if (!state.isGameOver) localStorage.setItem("battleshipState", JSON.stringify(state));
  }, [state]);

  // Timer logic
  const resetTimer = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(true);
  }, []);

  const wrappedDispatch = useCallback((action) => {
    if (action.type === 'RESET_GAME' || action.type === 'INITIALIZE_GAME') resetTimer();
    dispatch(action);
  }, [resetTimer]);

  useEffect(() => {
    setIsTimerRunning(!state.isGameOver);
  }, [state.isGameOver]);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && !state.isGameOver) {
      intervalId = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [isTimerRunning, state.isGameOver]);

  return (
    <GameContext.Provider value={{ state, dispatch: wrappedDispatch, timer, resetTimer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);