import SortDate from './SortDate.js';
import EloRating from './ELO.js';

const K = 48;
const SET_K = K * 2;
const BASE_RATING = 1800;

function CalcRankings(matchData, setBonus) {
  let rankings = Object.create(null);
  let result = [];
  // sort matches by date
  let sets = Object.keys(matchData.sets).map((matchKey) => {
    return {
      date: matchData.sets[matchKey].date,
      match: matchKey
    };
  });

  SortDate(sets).forEach((match) => {
    let gameScore = matchData.sets[match.matchKey].score;
    let players = matchData.sets[match.matchKey].players;
    let playerCharA = matchData.sets[match.matchKey].characters[0];
    let playerCharB = matchData.sets[match.matchKey].characters[1];
    let rating;
    let setRating;
    let playerA_count = 0;
    let playerB_count = 0;

    players.forEach((playerKey, i) => {
      if (!rankings[playerKey]) {
        rankings[playerKey] = {
          name: matchData.players[playerKey],
          score: BASE_RATING,
          win: 0,
          loss: 0,
          setWin: 0,
          setLoss: 0,
          playerKey: playerKey
        };

        if (!i) {
          rankings[playerKey].characterKey = playerCharA;
        } else {
          rankings[playerKey].characterKey = playerCharB;
        }
      }
    });

    // update player ratings
    gameScore.forEach((p1wins) => {
      if (p1wins) {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, true);
        rankings[players[0]].win += 1;
        rankings[players[1]].loss += 1; 
        playerA_count+=1;
      } else {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, false);
        rankings[players[1]].win += 1;
        rankings[players[0]].loss += 1; 
        playerB_count+=1;  
      }
    });      

    rankings[players[0]].score = rating[0];
    rankings[players[1]].score = rating[1];

    if (setBonus) {
      if (playerA_count > ((playerA_count + playerB_count) / 2)) {
        // P1 Wins the set
        setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, SET_K, true);
        rankings[players[0]].setWin += 1;
        rankings[players[1]].setLoss += 1;
      } else {
        // P2 Wins the set
        setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, SET_K, false);
        rankings[players[1]].setWin += 1;
        rankings[players[0]].setLoss += 1;
      }

      rankings[players[0]].score = setRating[0];
      rankings[players[1]].score = setRating[1];
    }
  });

  // return rankings
  Object.keys(rankings).forEach((key) => {
    result.push({
      name: rankings[key].name,
      score: rankings[key].score,
      win: rankings[key].win,
      loss: rankings[key].loss,
      setWin: rankings[key].setWin,
      setLoss: rankings[key].setLoss,
      characterKey: rankings[key].characterKey,
      playerKey: rankings[key].playerKey
    });
  });

  // sort result by win percent in case of tied ratings
  result.sort((a,b) => {
    if (a.score === b.score) {
      let playerAwinPercent = Math.round((a.win / (a.win + a.loss))*100);
      let playerBwinPercent = Math.round((b.win / (b.win + b.loss))*100);

      return playerBwinPercent - playerAwinPercent;
    } else {
      return b.score - a.score;
    }
  });

  result.forEach((player, idx) => {
    player['rank'] = idx + 1;
  });

  return result;

}

export default CalcRankings;