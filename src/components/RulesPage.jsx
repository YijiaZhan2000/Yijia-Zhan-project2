import { Link } from 'react-router-dom';
import '../index.css';

const RulesPage = () => {
  return (
    <div className="rules-container">
      <h1 className="rules-title">Battleship Game Rules</h1>
      
      <div className="rules-content">
        <section className="rules-section">
          <h2>🎯 Game Objective</h2>
          <p>Destroy all enemy ships before they destroy yours!</p>
        </section>

        <section className="rules-section">
          <h2>⚓ Ship Configuration</h2>
          <ul className="ship-list">
            <li>1x Aircraft Carrier (5 units)</li>
            <li>1x Battleship (4 units)</li>
            <li>2x Submarines (3 units each)</li>
            <li>1x Patrol Boat (2 units)</li>
          </ul>
        </section>

        <section className="rules-section">
          <h2>🎮 Gameplay</h2>
          <div className="gameplay-steps">
            <div className="step">
              <h3>1. Setup Phase</h3>
              <p>Ships are randomly placed on both player and AI boards</p>
            </div>
            <div className="step">
              <h3>2. Attack Phase</h3>
              <p>Take turns firing shots by clicking enemy grid cells</p>
            </div>
            <div className="step">
              <h3>3. Feedback</h3>
              <p>Red X = Hit | Blue ~ = Miss</p>
            </div>
          </div>
        </section>

        <section className="rules-section">
          <h2>🏆 Winning Condition</h2>
          <p>First player to sink all opponent's ships wins!</p>
        </section>
      </div>

      <div className="navigation-buttons">
        <Link to="/" className="home-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RulesPage;