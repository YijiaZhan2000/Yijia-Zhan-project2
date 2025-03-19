import { Link } from 'react-router-dom';
import '../index.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="game-title">⚓ Battleship ⚓</h1>
      
      <div className="mode-selection">
        <h2>Select Game Mode</h2>
        <div className="button-group">
          <Link 
            to="/game/normal" 
            className="mode-button normal-mode"
          >
            Normal Mode
          </Link>
          <Link 
            to="/game/easy" 
            className="mode-button freeplay-mode"
          >
            Free Play
          </Link>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/rules" className="link-button">View Rules</Link>
        <Link to="/highscores" className="link-button">High Scores</Link>
      </div>
    </div>
  );
};

export default HomePage;