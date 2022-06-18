import title from './title.png';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main.js';
import Player from './Player.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header ms-5 me-5"></header>

        <div className="d-flex justify-content-center">
          <img className="img img-fluid mt-5" src={title} alt="2X Logo"/>
        </div>

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
          <Route path="/player" element={<Player />}/>
        </Routes>
      </div>
    );
  }
}

export default App;
