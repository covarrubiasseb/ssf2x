import title from './title.png';
import React from 'react';
import { Link } from 'react-router-dom';
import CalcRankings from './CalcRankings.js';

const RATINGS_BAR_CURVE = 2000;
const WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO = 16;
const RATINGS_BAR_TO_WINDOW_WIDTH_RATIO = 3;
const RATINGS_BAR_TEXT_RATIO = 4;

class Main extends React.Component {
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
      <div className="Main">
        <div className="table-responsive" id="rankingTable">
          <div className="d-flex justify-content-center">
            <img className="img img-fluid" src={title} alt="2X Logo"/>
          </div>
          <table className="table table-hover border-dark text-light">
            <thead className="text-black">
              <tr>
                <th scope="col"><em className="rank-responsive">Rank</em></th>
                <th scope="col"><em>Player</em></th>
                <th className="text-center win-responsive" scope="col"><em>W</em></th>
                <th className="text-center loss-responsive" scope="col"><em>L</em></th>
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
                        <Link to= "/player" className="text-white player-profile-link">
                        <img className="me-4 img img-fluid icon-responsive" src={"./img/"+player.characterKey+".png"} alt="character icon"/>
                        <span className="text-responsive">{player.name}</span>
                        </Link>
                      </td>

                      <td className="win-responsive">
                        <div className="mt-1 text-center text-black bg-gradient rounded-pill ps-1 pe-1">
                          <em>{player.win}</em>
                        </div>
                      </td>

                      <td className="loss-responsive">
                        <div className="mt-1 text-center text-black bg-gradient rounded-pill ps-1 pe-1">
                          <em>{player.loss}</em>
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
                        <div className="svg-responsive mt-1 text-center bg-gradient rounded-pill"><em>{winPercent}%</em></div>
                      </td>

                      <td>
                        <svg width={this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO} height='60px' className="border border-dark border-2 bg-gradient">
                          <g className="bars">
                            <rect stroke="#000" fill="url(#RatingBarGradient)"
                            width={(this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO) * (player.score/RATINGS_BAR_CURVE)} height='60px'></rect>
                            <text x={(this.state.windowWidth / RATINGS_BAR_TEXT_RATIO) * (player.score/RATINGS_BAR_CURVE)} y="80%" transform="skewX(-15)">{player.score}</text>
                          </g>
                        </svg>

                        <div className="svg-responsive mt-1 text-center text-black bg-gradient rounded-pill"><em>{player.score}</em></div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;