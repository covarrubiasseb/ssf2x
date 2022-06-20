import React from 'react';
import { useLocation } from 'react-router-dom'; 
import SortDate from './SortDate.js';

const IFRAME_WIDTH = 480;
const IFRAME_HEIGHT = 320;

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

  return (
    <div className="Player text-white border border-dark ms-3 me-3">
      <div className="d-flex border-bottom border-dark">
        <img className="ms-1" src={"./img/"+data.state.characterKey+".png"} alt="character-icon"/>
        <h1 className="ms-2 text-white-50 mt-auto">{data.state.name}</h1>
      </div>

      <div className="ms-5 me-5 mt-4 player-info">
        <table className="table border-dark">
          <thead className="text-white-50">
            <tr>
              <th scope="col"><em className="rank-responsive">Rank</em></th>
              <th className="win-responsive" scope="col"><em>W</em></th>
              <th className="loss-responsive" scope="col"><em>L</em></th>
              <th scope="col"><em>Win%</em></th>
              <th scope="col"><em>Rating(ELO)</em></th>
            </tr>
          </thead>
          <tbody className="text-white-50">
            <tr>
              <td>{data.state.rank}</td>
              <td>{data.state.win}</td>
              <td>{data.state.loss}</td>
              <td>{data.state.winPercent}</td>
              <td>{data.state.score}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="player-info-responsive text-center text-white-50">
        <div className="d-flex flex-row">
          <div className="w-50"><em>Rank</em></div>
          <div className="w-50">{data.state.rank}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>W</em></div>
          <div className="w-50">{data.state.win}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>L</em></div>
          <div className="w-50">{data.state.loss}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>Win%</em></div>
          <div className="w-50">{data.state.winPercent}</div>
        </div>

        <div className="d-flex flex-row">
          <div className="w-50"><em>Rating</em></div>
          <div className="w-50">{data.state.score}</div>
        </div>   
      </div>

      <ul><h1 className="text-white-50 pe-4 text-center">Match History</h1> {
        sets.map((set, idx) => {
          let playerA = data.state.data.players[set.players['0']];
          let playerB = data.state.data.players[set.players['1']];
          let p2WinTotal = 0;
          let playerWin;
          let isp1;

          let p1WinTotal = set.score.reduce((curr, acc) => {
            return curr + acc;
          });

          set.score.forEach((game) => {
            if (game === 0) {
              p2WinTotal++;
            }
          });

          if (data.state.playerKey === set.players[0]) {
            // player is P1
            isp1 = true;
            if (p1WinTotal > (set.score.length / 2)) {
              playerWin = true;
            } else {
              playerWin = false;
            }
          } else {
            // player is P2
            isp1 = false;
            if (p1WinTotal > (set.score.length / 2)) {
              playerWin = false;
            } else {
              playerWin = true;
            }
          }
          return (
            <li key={idx} className="mt-2 border border-dark me-4 text-white-50">
              <div className="match-table">
                <div className="d-flex">
                  <div className="text-center ms-4 mb-4 mt-4 me-4 w-50">
                    <h1 className="border-bottom border-dark">{playerA} vs {playerB}</h1>
                    <div className="d-flex flex-row">
                      <div className="w-50 border-end border-dark">Date</div>
                      <div className="w-50">{set.date.slice(5)}-{set.date.slice(2, 4)}</div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="w-50 border-end border-dark">W</div>
                      <div className="w-50">{isp1 ? p1WinTotal : p2WinTotal}</div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="w-50 border-end border-dark">L</div>
                      <div className="w-50">{!isp1 ? p1WinTotal  : p2WinTotal}</div>
                    </div>

                    <div className="d-flex flex-row">  
                      <div className="w-50 border-bottom border-end border-dark">Result</div>
                      <div className="w-50 border-bottom border-dark">{playerWin ? "Win" : "Loss"}</div>
                    </div>
                  </div>

                  <div className="w-50 d-flex justify-content-center">
                    <iframe className="pt-3 pb-3" title={"match-"+{idx}} width={IFRAME_WIDTH} height={IFRAME_HEIGHT} 
                    src={"https://youtube.com/embed/"+set.link} allowfullscreen></iframe>
                  </div>
                </div>
              </div>

              <div className="match-table-responsive">
                <h1 className="text-center pt-2 ps-1 pe-1">{playerA} vs {playerB}</h1>

                <div className="d-flex">
                  <iframe className="w-100" title={"match-"+{idx}} width={IFRAME_WIDTH} height={IFRAME_HEIGHT} 
                  src={"https://www.youtube.com/embed/"+set.link} allowfullscreen>
                  </iframe>
                </div>

                <div className=" d-flex flex-row text-center">
                  <div className="w-50">Date</div>
                  <div className="w-50">{set.date.slice(5)}-{set.date.slice(2, 4)}</div>
                </div>

                <div className=" d-flex flex-row text-center">
                  <div className="w-50">W - L</div>
                  <div className="w-50">{Math.max(p1WinTotal, p2WinTotal)} - {Math.min(p1WinTotal, p2WinTotal)}</div>
                </div>

                <div className=" d-flex flex-row text-center">
                  <div className="w-50">Result</div>
                  <div className="w-50">{playerWin ? "Win" : "Loss"}</div>
                </div>
              </div>
            </li>
          );
        })
      }</ul>
    </div>
  );
}

export default Player;