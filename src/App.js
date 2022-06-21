import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Main from './Main.js';
import Player from './Player.js';
import About from './About.js';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header ms-5 me-5"></header>

        <Navbar />

        <svg height="0px" width="0px">
          <defs>
            <linearGradient id="RatingBarGradient">
              <stop offset="5%" stopColor="#00066" />
              <stop offset="95%" stopColor="#6666FF" />
            </linearGradient>

            <linearGradient id="winPercentGradient">
              <stop offset="5%" stopColor="#000" />
              <stop offset="95%" stopColor="#369867" />
            </linearGradient>
          </defs>
        </svg>

        <Routes>
          <Route exact path="/" element={<Main />}/>

          <Route path="/player">
            <Route path=":playerId" element={<Player />}/>
          </Route>

          <Route path="/about" element={<About />}/>
        </Routes>
      </div>
    );
  }
}

export default App;
