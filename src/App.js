import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import RulesPage from './components/RulesPage';
import HighScoresPage from './components/HighScoresPage';

function App() {
  return (
    <GameProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/normal" element={<GamePage mode="normal" />} />
            <Route path="/game/easy" element={<GamePage mode="easy" />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/highscores" element={<HighScoresPage />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;