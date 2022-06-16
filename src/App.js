import logo from './logo.gif';
import './App.css';
import React from 'react';
import CalcRankings from './CalcRankings.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankings: [{
        name: "",
        score: 0
      }],
      data: {}
    }
  }

  componentDidMount() {
    fetch('./MatchData.json').then((response) => {
      return response.json(); 
    }).then((matchData) => {
        this.setState({
          data: matchData,
          rankings: CalcRankings(matchData)
        });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="rankingTable">
            <h1 className="Table-heading">Super Street Fighter II X Rankings</h1>
            <ul>
              {
                this.state.rankings.map((player, idx) => {
                  return (
                    <li key={idx} className="List-item">{player.name} : {player.score}</li>
                  );
                })
              }
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
