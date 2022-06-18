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
        <h1 className="ms-2 text-black">{data.state.name}</h1>
      </div>

      <div className="ms-5 me-5 mt-4">
        <table className="table border-dark">
          <thead className="text-black">
            <tr>
              <th scope="col"><em className="rank-responsive">Rank</em></th>
              <th className="win-responsive" scope="col"><em>W</em></th>
              <th className="loss-responsive" scope="col"><em>L</em></th>
              <th scope="col"><em>Win%</em></th>
              <th scope="col"><em>Rating(ELO)</em></th>
            </tr>
          </thead>
          <tbody className="text-black">
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

      <ul><h1 className="text-black text-center">Match History</h1> {
        sets.map((set, idx) => {
          let playerA = data.state.data.players[set.players['0']];
          let playerB = data.state.data.players[set.players['1']];
          let p2WinTotal = 0;
          let playerWin;

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
            if (p1WinTotal > (set.score.length / 2)) {
              playerWin = true;
            } else {
              playerWin = false;
            }
          } else {
            // player is P2
            if (p1WinTotal > (set.score.length / 2)) {
              playerWin = false;
            } else {
              playerWin = true;
            }
          }
          return (
            <li key={idx} className="d-flex justify-content-around mt-2 border border-dark pt-2 pb-2 me-4">
              <div className="text-black bg-transparent border-none">
                <h3 class="text-center card-title">{playerA} vs {playerB}</h3>
                <p class="card-text">Date: {set.date}</p>
                <p class="card-text">Set Count: {Math.max(p1WinTotal, p2WinTotal)} - {Math.min(p1WinTotal, p2WinTotal)}</p>
                <p class="card-text">Result: {playerWin ? "Win" : "Loss"}</p>
              </div>
              <iframe title={"match-"+{idx}} width={IFRAME_WIDTH} height={IFRAME_HEIGHT} 
              src={"https://www.youtube.com/embed/"+set.link}>
              </iframe>
            </li>
          );
        })
      }</ul>
    </div>
  );
}

export default Player;