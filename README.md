# Super Street Fighter II X Rankings
Repo for the SSF2X.com website (in progress)

Currently deployed at: https://steady-starlight-17e492.netlify.app/

## Development

### `npm install`

After cloning the repo, run to install all dependencies.

### `npm start`

Will launch the app in developer mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`

Bundles the app for production to the `build` folder.

<img src="https://i.ibb.co/LQ0M7ty/062222.png" alt="SSF2X Home Page">

## What is Super Street Fighter II X Rankings?

Super Street Fighter II X Rankings is a website dedicated to the Super Street Fighter II X competitive gaming scene in Japan, home of the world's strongest players. The rankings are created using match footage of game sets online from the world's best arcades, and the Elo Rating System, a popular rating system for competitive games based on predicted probabilities of players winning and actual outcomes.

## How is ELO used?

Super Street Fighter II X Rankings uses the standard ELO rating system, along with custom modifiers to change how many points a player can win/lose per game/set (defined as K). All players are given a Base Rating of 1800. Ratings are generated from date of oldest Set to newest.

## The Modifiers

### Sliding K 

For the first few games, a player has an amplified K, that will decay each game until the amplifier is no longer applied. So K(Game 1) > K(Game 2) > ... > base K (no amplifier).

### Time decay 

K is decayed per every year passed, so older matches will lose value over time.

### Set Bonus

Each Set has a Bonus K. It is worth double the K of a single game, after all other modifiers are applied. This is to give value to Set results along with Game results, and include them in the ratings.

