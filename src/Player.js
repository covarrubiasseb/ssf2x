import React from 'react';
import { useLocation } from 'react-router-dom'; 

const LINK_ID_SLICE_INDEX = 32;
const IFRAME_WIDTH = 480;
const IFRAME_HEIGHT = 320;

const Player = (props) => {
  let data = useLocation();

  let playerMatches = Object.keys(data.state.data.sets).filter((set) => {
    if (data.state.playerKey === data.state.data.sets[set].players[0] ||
        data.state.playerKey === data.state.data.sets[set].players[1]) {
      return true;
    }
  }).map((setKey, idx) => {
    return data.state.data.sets[setKey].link
  });

  return (
    <div className="Player text-white border border-dark ms-3 me-3">
      <div className="d-flex border-bottom border-dark">
        <img className="ms-1" src={"./img/"+data.state.characterKey+".png"} />
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

      <ul><h1 className="text-black">Match History:</h1> {
        playerMatches.map((matchLink, idx) => {
          return (
            <li key={idx}>
              <iframe width={IFRAME_WIDTH} height={IFRAME_HEIGHT} src={"https://www.youtube.com/embed/"+matchLink.slice(LINK_ID_SLICE_INDEX)}>
              </iframe>
            </li>
          );
        })
      }</ul>
    </div>
  );
}

export default Player;