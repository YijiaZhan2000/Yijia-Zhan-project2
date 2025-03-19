import { Link } from 'react-router-dom';
import '../index.css';

const HighScoresPage = () => {
  const scores = [
    { rank: 1, name: 'Naval Commander ', score: 2500, date: ' 2025-03-15' },
    { rank: 2, name: 'Captain React ', score: 2200, date: ' 2025-03-14' },
    { rank: 3, name: 'Admiral Hook ', score: 2100, date: ' 2025-03-13' },
    { rank: 4, name: 'Sailor Redux ', score: 2000, date: ' 2025-03-12' },
    { rank: 5, name: 'Private Component ', score: 1900, date: ' 2025-03-11' },
  ];

  return (
    <div className="scores-container">
      <h1 className="scores-title">🏆 High Scores</h1>
      
      <div className="scores-table">
        <div className="table-header">
          <span>Rank</span>
          <span>Player</span>
          <span>Score</span>
          <span>Date</span>
        </div>
        
        {scores.map((entry) => (
          <div className="score-row" key={entry.rank}>
            <span className="rank">
              {entry.rank === 1 ? '🥇' : 
               entry.rank === 2 ? '🥈' : 
               entry.rank === 3 ? '🥉' : 
               `#${entry.rank}`}
            </span>
            <span className="player">{entry.name}</span>
            <span className="score">{entry.score}</span>
            <span className="date">{entry.date}</span>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <Link to="/" className="home-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default HighScoresPage;