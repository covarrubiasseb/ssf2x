import SortDate from './SortDate.js';
import EloRating from './ELO.js';

const K = 60;

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
    let rating;

    players.forEach((playerKey) => {
      if (!rankings[playerKey]) {
        rankings[playerKey] = {
          name: matchData.players[playerKey],
          score: matchData.eloScores[playerKey]
        };
      }
    });

    gameScore.forEach((p1wins) => {
      if (p1wins) {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, true);
      } else {
        rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, K, false);
      }
    });      

    rankings[players[0]].score = rating[0];
    rankings[players[1]].score = rating[1];
  });

  // return rankings
  Object.keys(rankings).forEach((key) => {
    result.push({
      name: rankings[key].name,
      score: rankings[key].score
    });
  });


  return result.sort((a,b) => {
    return b.score - a.score;
  });

}


export default CalcRankings;