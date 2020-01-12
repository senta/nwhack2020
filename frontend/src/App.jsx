import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Game from './components/views/Game/Game.jsx';
import Landing from './components/views/Landing/Landing.jsx';
import HostRoom from './components/views/HostRoom/HostRoom.jsx';
import PlayerRoom from './components/views/PlayerRoom/PlayerRoom.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Game/>
        </Route>
        <Route path="/host">
          <HostRoom/>
        </Route>
        <Route path="/player">
          <PlayerRoom/>
        </Route>
        <Route path='/'>
          <Landing/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
