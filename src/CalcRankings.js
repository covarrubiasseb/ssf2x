import SortDate from './SortDate.js';
import EloRating from './ELO.js';

const K = 60;
const BASE_RATING = 1800;

function CalcRankings(matchData) {
  let rankings = Object.create(null);
  let result = [];
  // sort matches by date
  let sets = Object.keys(matchData.sets).map((matchKey) => {
    return {
      date: matchData.sets[matchKey].date,
      match: matchKey
    };
  });

  SortDate(sets, matchData).forEach((match) => {
    let gameScore = matchData.sets[match.matchKey].score;
    let players = matchData.sets[match.matchKey].players;
    let playerCharA = matchData.sets[match.matchKey].characters[0];
    let playerCharB = matchData.sets[match.matchKey].characters[1];
    let rating;

    players.forEach((playerKey, i) => {
      if (!rankings[playerKey]) {
        rankings[playerKey] = {
          name: matchData.players[playerKey],
          score: BASE_RATING,
          win: 0,
          loss: 0 
        };

        if (!i) {
          rankings[playerKey].characterKey = playerCharA;
        } else {
          rankings[playerKey].characterKey = playerCharB;
        }
      }
    });

    gameScore.forEach((p1wins) => {
      if (p1wins) {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, true);
        rankings[players[0]].win += 1;
        rankings[players[1]].loss += 1; 
      } else {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, false);
        rankings[players[1]].win += 1;
        rankings[players[0]].loss += 1;   
      }
    });      

    rankings[players[0]].score = rating[0];
    rankings[players[1]].score = rating[1];
  });

  // return rankings
  Object.keys(rankings).forEach((key) => {
    result.push({
      name: rankings[key].name,
      score: rankings[key].score,
      win: rankings[key].win,
      loss: rankings[key].loss,
      characterKey: rankings[key].characterKey
    });
  });


  return result.sort((a,b) => {
    if (a.score === b.score) {
      let playerAwinPercent = Math.round((a.win / (a.win + a.loss))*100);
      let playerBwinPercent = Math.round((b.win / (b.win + b.loss))*100);

      return playerBwinPercent - playerAwinPercent;
    } else {
      return b.score - a.score;
    }
  });

}


export default CalcRankings;