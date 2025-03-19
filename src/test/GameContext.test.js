import { renderHook, act } from '@testing-library/react-hooks';
import { GameProvider, useGameContext } from '../context/GameContext';

test('should initialize boards with ships', () => {
  const wrapper = ({ children }) => <GameProvider>{children}</GameProvider>;
  const { result } = renderHook(() => useGameContext(), { wrapper });

  expect(result.current.state.playerBoard.flat()
    .filter(cell => cell.isShip).length).toBe(5+4+3+3+2);
});

test('should detect game over state', () => {
  // Test win condition logic
});