import SortDate from './SortDate.js';
import EloRating from './ELO.js';

const K = 192;
const SET_MULTIPLIER = 2;
const SET_K = K * SET_MULTIPLIER;
const BASE_RATING = 1800;
const CURRENT_YEAR = 2022;
const TIME_DECAY_RATE = 0.8;
const SLIDING_RATE = 0.98;
const SLIDING_GAME_COUNT = 5;

function decayK(K, current, match, rate) {
  let decay_K = K;
  let diff = current - match;

  for (let i = 0; i < diff; i++) {
    decay_K = Math.round(rate * decay_K);
  }

  return decay_K;
}

function CalcRankings(matchData, setBonus, timeDecay, slidingK) {
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
    let matchYear = match.date[0];
    let final_K = K;
    let set_final_K = SET_K;

    players.forEach((playerKey, i) => {
      if (!rankings[playerKey]) {
        rankings[playerKey] = {
          name: matchData.players[playerKey],
          score: BASE_RATING,
          win: 0,
          loss: 0,
          setWin: 0,
          setLoss: 0,
          playerKey: playerKey,
          gamesPlayed: 0
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
      rankings[players[0]].gamesPlayed+=1;
      rankings[players[1]].gamesPlayed+=1;

      if (slidingK) {
        if (rankings[players[0]].gamesPlayed > SLIDING_GAME_COUNT) {
          final_K = decayK(final_K, rankings[players[0]].gamesPlayed, 0, SLIDING_RATE);
          set_final_K = SET_MULTIPLIER * final_K;
        }

        if (rankings[players[1]].gamesPlayed > SLIDING_GAME_COUNT) {
          final_K = decayK(final_K, rankings[players[0]].gamesPlayed, 0, SLIDING_RATE);
          set_final_K = SET_MULTIPLIER * final_K;
        }
      }

      if (p1wins) {
        if (timeDecay) {
          // modify for time decay
          rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, decayK(final_K, CURRENT_YEAR, matchYear, TIME_DECAY_RATE), true);

        } else {

          rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, final_K, true);

        }
        
        rankings[players[0]].win += 1;
        rankings[players[1]].loss += 1; 
        playerA_count+=1;
      } else {
        if (timeDecay) {
          // modify for time decay
          rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, decayK(final_K, CURRENT_YEAR, matchYear, TIME_DECAY_RATE), false);

        } else {

          rating = EloRating(rankings[players[0]].score, rankings[players[1]].score, final_K, false);

        }
        
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
        if (timeDecay) {
          // modify for time decay
          setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, decayK(set_final_K, CURRENT_YEAR, matchYear, TIME_DECAY_RATE), true);

        } else {

          setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, set_final_K, true);

        }

        rankings[players[0]].setWin += 1;
        rankings[players[1]].setLoss += 1;

      } else {
        // P2 Wins the set
        if (timeDecay) {
          // modify for time decay
          setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, decayK(set_final_K, CURRENT_YEAR, matchYear, TIME_DECAY_RATE), false);

        } else {

          setRating = EloRating(rankings[players[0]].score, rankings[players[1]].score, set_final_K, false);

        }

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
      playerKey: rankings[key].playerKey,
      gamesPlayed: rankings[key].gamesPlayed
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