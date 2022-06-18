import title from './title.png'
import './App.css';
import React from 'react';
import CalcRankings from './CalcRankings.js';

const ratingsBarCurve = 2000;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankings: [{
        name: '',
        score: 0
      }],
      data: {},
      windowWidth: window.innerWidth
    }

    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    });
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
          <svg>
            <defs>
              <linearGradient id="RatingBarGradient">
                <stop offset="5%" stopColor="#00066" />
                <stop offset="95%" stopColor="#6666FF" />
              </linearGradient>
            </defs>
          </svg>
          <div id="rankingTable">
            <div className="d-flex justify-content-center">
              <img className="img img-fluid" src={title}/>
            </div>
            <table className="table table-hover border-dark ranking-chart">
              <thead className="chart-head">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col">W - L</th>
                  <th scope="col">Win%</th>
                  <th scope="col">Rating(ELO)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  this.state.rankings.map((player, idx) => {
                    return (
                      <tr key={idx}>
                        <th scope="row">{idx+1}</th>
                        <td><img className="me-4 img-fluid" src={"./img/"+player.characterKey+".png"}/><em>{player.name}</em></td>
                        <td className="win-loss"><em><div className="border border-dark bg-gradient mt-1 text-center">{player.win} - {player.loss}</div></em></td>
                        <td className="win-percent"><div className="border border-dark bg-gradient mt-1 text-center"><em>{Math.round(player.win / (player.win + player.loss) * 100)}%</em></div></td>
                        <td>
                          <svg width={this.state.windowWidth / 3} height='60px' className="border border-dark border-2 bg-dark bg-gradient">
                            <g className="bars">
                              <rect stroke="#000" fill="url(#RatingBarGradient)"
                              width={(this.state.windowWidth / 3) * (player.score/ratingsBarCurve)} height='60px'></rect>
                              <text x={(this.state.windowWidth / 4) * (player.score/ratingsBarCurve)} y="80%" transform="skewX(-20)">{player.score}</text>
                            </g>
                          </svg>
                        </td>
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
