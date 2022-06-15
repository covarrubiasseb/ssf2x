import logo from './logo.gif';
import './App.css';
import React from 'react';
import EloRating from './elo.js';

const K = 400;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankings: [{
        name: "ultracombo",
        score: 3000
      }],
      data: {}
    }

    this.createRankings = this.createRankings.bind(this);
  }

  createRankings(matchData) {
    // start ranking players (starting from end of match list)
    let rankings = Object.create(null);
    let result = [];
    Object.keys(matchData.sets).sort((a,b) => {
      return Number(b) - Number(a);
    }).forEach((matchKey) => {
      let gameScore = matchData.sets[matchKey].score;
      let players = matchData.sets[matchKey].players;
      let rating;

      players.forEach((playerKey) => {
        if (!rankings[playerKey]) {
          rankings[playerKey] = {
            name: matchData.players[playerKey],
            score: matchData.eloScores[playerKey]
          };
        }
      });

      if (gameScore[0] > gameScore[1]) {
        // player 1 wins
      rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, true);
      } else {
        // player 2 wins
      rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, false);
      }

      rankings[players[0]].score = rating[0];
      rankings[players[1]].score = rating[1];

    });

    // return rankings
    Object.keys(rankings).forEach((key) => {
      result.push({
        name: rankings[key].name,
        score: rankings[key].score
      });
    });


    return result.sort((a,b) => {
      return b.score - a.score;
    });
  }

  componentDidMount() {
    fetch('./MatchData.json').then((response) => {
      return response.json(); 
    }).then((matchData) => {
        this.setState({
          data: matchData,
          rankings: this.createRankings(matchData)
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
