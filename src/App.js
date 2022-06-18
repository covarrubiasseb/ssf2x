import title from './title.png'
import './App.css';
import React from 'react';
import CalcRankings from './CalcRankings.js';

const RATINGS_BAR_CURVE = 2000;
const WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO = 16;
const RATINGS_BAR_TO_WINDOW_WIDTH_RATIO = 3;
const RATINGS_BAR_TEXT_RATIO = 4;

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
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    });

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

              <linearGradient id="winPercentGradient">
                <stop offset="5%" stopColor="#000" />
                <stop offset="95%" stopColor="#369867" />
              </linearGradient>
            </defs>
          </svg>
          <div className="table-responsive" id="rankingTable">
            <div className="d-flex justify-content-center">
              <img className="img img-fluid" src={title}/>
            </div>
            <table className="table table-hover border-dark ranking-chart">
              <thead className="chart-head">
                <tr>
                  <th scope="col"><em>Rank</em></th>
                  <th scope="col"><em>Player</em></th>
                  <th scope="col"><em>W/L</em></th>
                  <th scope="col"><em>Win%</em></th>
                  <th scope="col"><em>Rating(ELO)</em></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  this.state.rankings.map((player, idx) => {
                    let winPercent = Math.round(player.win / (player.win + player.loss) * 100);
                    return (
                      <tr key={idx}>
                        <th scope="row">{idx+1}</th>
                        <td>
                          <img className="me-4 img-fluid" src={"./img/"+player.characterKey+".png"}/>{player.name}
                        </td>

                        <td className="win-loss">
                          <div className="border border-dark bg-gradient mt-1 text-center">
                            <em>{player.win} - {player.loss}</em>
                          </div>
                        </td>

                        <td className="win-percent">
                          <svg width={this.state.windowWidth / WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO} height='60px' className="border border-dark border-2 bg-gradient">
                            <g className="bars">
                              <rect stroke="#000" fill="url(#winPercentGradient)" height='60px'
                              width={(this.state.windowWidth / WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO) * (winPercent / 100)}></rect>
                              <text x="20%" y="80%" fill="#DDD" transform="skewX(-10) scale(0.55 0.55)">{winPercent}%</text>
                            </g>
                          </svg>
                        </td>

                        <td>
                          <svg width={this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO} height='60px' className="border border-dark border-2 bg-gradient">
                            <g className="bars">
                              <rect stroke="#000" fill="url(#RatingBarGradient)"
                              width={(this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO) * (player.score/RATINGS_BAR_CURVE)} height='60px'></rect>
                              <text x={(this.state.windowWidth / RATINGS_BAR_TEXT_RATIO) * (player.score/RATINGS_BAR_CURVE)} y="80%" transform="skewX(-15)">{player.score}</text>
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
