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
        <header className="App-header ms-5 me-5">
          <div id="rankingTable">
            <h1 className="text-center mb-5">Super Street Fighter II X Rankings</h1>
            <table className="table table-bordered border-dark border-opacity-10">
              <thead>
                <tr className="bg-gradient">
                  <th scope="col">#</th>
                  <th scope="col">Player</th>
                  <th scope="col">Rating</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  this.state.rankings.map((player, idx) => {
                    return (
                      <tr key={idx} className="bg-gradient">
                        <th scope="row">{idx+1}</th>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
