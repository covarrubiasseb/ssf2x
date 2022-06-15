import logo from './logo.svg';
import './App.css';
import MatchData from './MatchData.json';

function createRankings(matchData) {
  return [];
}

let rankings = createRankings(MatchData);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="rankingTable">
          <h1>Super Street Fighter II X Rankings</h1>
          <ol>
            <li key="0">Unstyled Table</li>
          </ol>
        </div>
      </header>
        
    </div>
  );
}

export default App;
