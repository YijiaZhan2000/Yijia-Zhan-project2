export const saveGameState = (state) => {
    try {
      localStorage.setItem('battleshipState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };
  
  export const loadGameState = () => {
    try {
      const saved = localStorage.getItem('battleshipState');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  };