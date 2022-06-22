import React from 'react';
import { useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import SortDate from './SortDate.js';

const BASE_RATING = 1800;

const Player = (props) => {
  let data = useLocation();

  let sortedPlayerMatchKeys = SortDate(Object.keys(data.state.data.sets).filter((set) => {
    if (data.state.playerKey === data.state.data.sets[set].players[0] ||
        data.state.playerKey === data.state.data.sets[set].players[1]) {
      return true;
    } else {  return false  };
  }).map((matchKey) => {
    return {
      date: data.state.data.sets[matchKey].date,
      match: matchKey
    };
  }));

  let sets = sortedPlayerMatchKeys.map((set) => {
    return data.state.data.sets[set.matchKey];
  });

  let winPercent = Math.round(data.state.win / (data.state.win + data.state.loss) * 100);
  let setWinPercent = Math.round(data.state.setWin / (data.state.setWin + data.state.setLoss) * 100);

  let player = data.state.rankings.filter((player) => {
    return data.state.playerKey === player.playerKey;
  })[0];

  return (
    <div className="Player d-flex flex-column align-items-center text-black mt-5 mb-5">
      <div className="ms-5 me-5 mt-4 player-info bg-table text-center border border-dark border-2 shadow-lg">
        <div className="d-flex border-bottom border-dark mt-3 justify-content-center">
          <img className="ms-1" src={"./img/"+player.characterKey+".png"} alt="character-icon"/>
          <h1 className="ms-2 mt-auto display-4">{player.name}</h1>
        </div>

        <table className="table table-dark text-white-50 border-secondary">
          <thead>
            <tr>
              <th scope="col"><em className="rank-responsive">Rank</em></th>
              <th scope="col"><em>Rating(ELO)</em></th>
              <th className="win-responsive" scope="col"><em>SetW</em></th>
              <th className="loss-responsive" scope="col"><em>L</em></th>
              <th scope="col"><em>SetWin%</em></th>
              <th className="win-responsive" scope="col"><em>W</em></th>
              <th className="loss-responsive" scope="col"><em>L</em></th>
              <th scope="col"><em>Win%</em></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player.rank}</td>
              <td>{player.score}</td>
              <td>{player.setWin}</td>
              <td>{player.setLoss}</td>
              <td>{setWinPercent}</td>
              <td>{player.win}</td>
              <td>{player.loss}</td>
              <td>{winPercent}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="player-info-responsive text-center text-white-50">
        <div className="d-flex mt-5 justify-content-center flex-row">
          <img className="ms-1" src={"./img/"+player.characterKey+".png"} alt="character-icon"/>
          <h1 className="ms-2 mt-auto display-6">{player.name}</h1>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>Rank</em></div>
          <div className="w-50">{player.rank}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>W</em></div>
          <div className="w-50">{player.win}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>L</em></div>
          <div className="w-50">{player.loss}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>Win%</em></div>
          <div className="w-50">{winPercent}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>Rating</em></div>
          <div className="w-50">{player.score}</div>
        </div>   
      </div>

      <h1 className="text-white-50 text-center display-2 mt-5"><em>Match History</em></h1>

      <div className="table-responsive bg-table mt-4 border border-dark border-2 shadow-lg">
        <table className="table table-hover text-black border-dark">
          <thead className="bg-dark bg-gradient text-white-50">
            <tr>
              <th scope="col"><em></em></th>
              <th scope="col"><em>Opponent</em></th>
              <th scope="col" className="text-center"><em>Date</em></th>
              <th scope="col"><em>W-L</em></th>
              <th className="result-responsive" scope="col"><em>Result</em></th>
              <th className="result-responsive" scope="col"><em>Rating(net)</em></th>
              <th scope="col"><em className="thead-link-responsive">link</em></th>
            </tr>
          </thead>

          <tbody className="table-group-divider text-center">
            {
              sets.reverse().map((set, idx, _) => {
                let playerA = data.state.data.players[set.players['0']];
                let playerB = data.state.data.players[set.players['1']];
                let p2WinTotal = 0;
                let playerWin;
                let isp1;
                let otherPlayerData;
                let previousScore = BASE_RATING;
                let previousRatings;
                let length = _.length;

                let p1WinTotal = set.score.reduce((curr, acc) => {
                  return curr + acc;
                });

                set.score.forEach((game) => {
                  if (game === 0) {
                    p2WinTotal++;
                  }
                });

                if (data.state.playerKey === set.players[0]) {
                  // player is A
                  isp1 = true;
                  if (p1WinTotal > (set.score.length / 2)) {
                    playerWin = true;
                  } else {
                    playerWin = false;
                  }
                } else {
                  // player is B
                  isp1 = false;
                  if (p1WinTotal > (set.score.length / 2)) {
                    playerWin = false;
                  } else {
                    playerWin = true;
                  }
                }

                if (isp1) {
                  // Player is A
                  previousRatings = data.state.rankings.filter((player) => {
                    return set.players['0'] === player.playerKey;
                  })[0].previousRatings;

                  otherPlayerData = data.state.rankings.filter((player) => {
                      return set.players['1'] === player.playerKey;
                  })[0];

                } else {
                  // Player is B
                  previousRatings = data.state.rankings.filter((player) => {
                    return set.players['1'] === player.playerKey;
                  })[0].previousRatings;

                  otherPlayerData = data.state.rankings.filter((player) => {
                      return set.players['0'] === player.playerKey;
                  })[0];
                }

                return (
                  <tr key={idx}>
                    <th scope="row"><em>{idx + 1}</em></th>
                    <td>
                      <Link to={"/player/"+otherPlayerData.playerKey} className="text-black player-profile-link" state={
                        {
                          data: data.state.data,
                          rankings: data.state.rankings,
                          playerKey: otherPlayerData.playerKey,
                        }
                      }>{isp1 ? playerB : playerA}</Link>
                      <img className="ps-2 img-fluid icon-responsive" 
                      src={isp1 ? "./img/"+set.characters['1']+".png" : "./img/"+set.characters['0']+".png"} alt="character icon"/>
                    </td>
                    <td className="date">{set.date.slice(5, 7)}/{set.date.slice(8, 10)}/{set.date.slice(2, 4)}</td>
                    <td className="date-responsive">{set.date.slice(5, 7)}/{set.date.slice(2, 4)}</td>
                    <td className="border-start border-end border-dark">
                      {isp1 ? p1WinTotal : p2WinTotal}-{!isp1 ? p1WinTotal : p2WinTotal}
                    </td>
                    <td className="result-responsive">
                      {
                        playerWin ? <span>Win <img width="24" src="./img/up.png" alt="win icon"/></span> 
                                  : <span>Loss <img width="24" src="./img/down.png" alt="loss icon"/></span>
                      }
                    </td>
                    <td className="result-responsive">
                      {
                        previousRatings[length - idx] ? previousRatings[length - idx] : player.score
                      }
                      ({
                        previousRatings[length - idx] 
                          ? (previousRatings[length - idx] - previousRatings[length - (idx + 1)]) > 0
                            ? <span className="text-success">+{(previousRatings[length - idx] - previousRatings[length - (idx + 1)])}</span>
                            : <span className="text-danger">{(previousRatings[length - idx] - previousRatings[length - (idx + 1)])}</span>
                          : (player.score - previousRatings[length - (idx + 1)]) > 0
                            ? <span className="text-success">+{(player.score - previousRatings[length - (idx + 1)])}</span>
                            : <span className="text-danger">{(player.score - previousRatings[length - (idx + 1)])}</span>
                      })
                    </td>
                    <td>
                      <a href={"https://youtu.be/"+set.link} target="_blank">
                        <img className="video-icon-responsive" width="48" src={"./img/video-icon.png"} alt="video url icon"/>
                      </a>
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

export default Player;