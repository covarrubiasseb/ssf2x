import React from 'react';
import { Link } from 'react-router-dom';
import CalcRankings from './CalcRankings.js';

const RATINGS_BAR_CURVE = 2000;
const WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO = 16;
const RATINGS_BAR_TO_WINDOW_WIDTH_RATIO = 3;
const RATINGS_BAR_TEXT_RATIO = 4;
const SVG_BAR_HEIGHT = 40;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankings: [{
        name: 'ultracombo',
        score: 3000
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
      <div className="Main d-flex flex-column align-items-center">
        <h1 className="text-center text-white-50 display-1 mt-5"><em>
          Super Street Fighter II X Rankings</em>
        </h1>
        <div className="table-responsive mt-5 bg-table border border-dark border-2">
          <table className="table table-hover border-dark text-black">
            <thead class="table-dark text-white-50">
              <tr>
                <th className="text-center" scope="col"><em className="rank-responsive">Rank</em></th>
                <th className="text-center" scope="col"><em>Player</em></th>
                <th className="text-center win-responsive" scope="col"><em>W - L</em></th>
                <th className="text-center" scope="col"><em>Win%</em></th>
                <th className="text-center" scope="col"><em>Rating(ELO)</em></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                this.state.rankings.map((player, idx) => {
                  let winPercent = Math.round(player.win / (player.win + player.loss) * 100);
                  return (
                    <tr key={idx}>
                      <th scope="row"><span className="ps-3">{idx+1}</span></th>
                      <td>
                        <Link to={"/player/"+player.playerKey} className="text-black player-profile-link" state={
                          {
                            data: this.state.data,
                            rankings: this.state.rankings,
                            name: player.name,
                            score: player.score,
                            rank: idx + 1,
                            playerKey: player.playerKey,
                            characterKey: player.characterKey,
                            win: player.win,
                            loss: player.loss,
                            winPercent: winPercent
                          }
                        }>
                          <img className="img img-fluid icon-responsive" src={"./img/"+player.characterKey+".png"} alt="character icon"/>
                          <span className="text-responsive">{player.name}</span>
                        </Link>
                      </td>

                      <td className="win-responsive">
                        <div className="mt-1 text-center ps-1 pe-1">
                          {player.win} - {player.loss}
                        </div>
                      </td>

                      <td className="win-percent text-center">
                        <svg width={this.state.windowWidth / WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO} height={SVG_BAR_HEIGHT} className=" bg-gradient">
                          <g className="bars">
                            <rect stroke="#333" fill="url(#winPercentGradient)" height={SVG_BAR_HEIGHT}
                            width={(this.state.windowWidth / WINPERCENT_BAR_TO_WINDOW_WIDTH_RATIO) * (winPercent / 100)}></rect>
                            <text x="20%" y="80%" fill="#DDD" transform="skewX(-10) scale(0.55 0.55)">{winPercent}%</text>
                          </g>
                        </svg>
                        <div className="svg-responsive mt-1 text-center"><em>{winPercent}%</em></div>
                      </td>

                      <td>
                        <svg width={this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO} height={SVG_BAR_HEIGHT}>
                          <g className="bars">
                            <rect stroke="#333" fill="url(#RatingBarGradient)"
                            width={(this.state.windowWidth / RATINGS_BAR_TO_WINDOW_WIDTH_RATIO) * (player.score/RATINGS_BAR_CURVE)} height={SVG_BAR_HEIGHT}></rect>
                            <text x={(this.state.windowWidth / RATINGS_BAR_TEXT_RATIO) * (player.score/RATINGS_BAR_CURVE)} y="80%" transform="skewX(-15)">{player.score}</text>
                          </g>
                        </svg>

                        <div className="svg-responsive mt-1 text-center"><em>{player.score}</em></div>
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