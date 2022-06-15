import logo from './logo.svg';
import './App.css';

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
