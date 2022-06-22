const About = () => {
  return (
    <div className="About d-flex flex-column align-items-center mt-5">
      <h1 className="text-center text-white-50 display-1 mt-5 mb-5">
        <em>Super Street Fighter II X Rankings Explained</em>
      </h1>

      <div className="bg-table border border-dark border-2 shadow-lg  ms-1 me-1 ms-md-5 me-md-5 mb-5">
        <p className="mt-4 ms-4 me-4 text-black"><u>What is Super Street Fighter II X Rankings?</u></p>

        <div className="mt-2 ms-4 me-4 d-flex align-items-center about-responsive">
          <p className="flex-grow-1 me-3"><em>Super Street Fighter II X Rankings</em> is a website dedicated to the Super 
          Street Fighter II X competitive gaming scene in Japan, home of the world's strongest players. The rankings 
          are created using match footage of game sets online from the world's best arcades, and the  
          <a className="text-black" href="https://en.wikipedia.org/wiki/Elo_rating_system" target="_blank"><em> Elo Rating System</em></a>, 
          a popular rating system for competitive games based on predicted probabilities of players winning and actual outcomes.
          </p>
          <div className="card border border-dark">
            <img src="./img/arcade.jpg" className="card-img-top" alt="Japanese arcade"/>
            <div className="card-footer bg-gradient text-center border-top border-dark border-2 fs-5">
              <em>Empara Arcade, Osaka, Japan (August, 2019)</em>
            </div>
          </div>            
        </div>

        <p className="mt-2 ms-4 me-4 text-black"><u>How is ELO used?</u></p>

        <p className="mt-2 ms-4 me-4"><em>Super Street Fighter II X Rankings</em> uses the standard ELO rating system, along with custom modifiers to 
        change how many points a player can win/lose per game/set (defined as <em>K</em>). All players are given a Base Rating of 1800. Ratings 
        are generated from date of oldest Set to newest.</p>

        <p className="mt-2 ms-5 me-4 text-black"><u><em>The Modifiers:</em></u></p>

        <p className="mt-2 ms-5 ps-3 me-4"><u><em className="text-black">Sliding K:</em></u> For the first few games, a player has an amplified K, 
        that will decay each game until the amplifier is no longer applied. So <em>K</em>(Game 1) > <em>K</em>(Game 2) > ... > base <em>K</em> (no amplifier). 
        </p>

        <p className="mt-2 ms-5 ps-3 me-4"><u><em className="text-black">Time decay:</em></u> <em>K</em> is decayed per every year passed, so older matches 
        will lose value over time.
        </p>

        <p className="mt-2 ms-5 ps-3 me-4"><u><em className="text-black">Set Bonus:</em></u> Each Set has a Bonus <em>K</em>. It is worth double 
        the <em>K</em> of a single game, after all other modifiers are applied. This is to give value to Set results along with Game results, 
        and include them in the ratings.
        </p>
      </div>
    </div>
  );
}

export default About;