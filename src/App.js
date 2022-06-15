import logo from './logo.svg';
import './App.css';
import MatchData from './MatchData.json';
import eloRating from './elo.js';

function createRankings(matchData) {
  // go through matchData and use eloRating to get ratings
  

  return [{
    name: "ultracombo",
    "score": 3000
  }];
};

let rankings = createRankings(MatchData);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="rankingTable">
          <h1>Super Street Fighter II X Rankings</h1>
          <ol>
            {
              rankings.map((player, idx) => {
                return (
                  <li key={idx}>{player.name} : {player.score}</li>
                );
              })
            }
          </ol>
        </div>
      </header>
        
    </div>
  );
}

export default App;
