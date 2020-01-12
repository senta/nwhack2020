import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Game from './components/views/Game/Game.jsx';
import Landing from './components/views/Landing/Landing.jsx';
import HostRoom from './components/views/HostRoom/HostRoom.jsx';
import PlayerSearch from './components/views/PlayerSearch/PlayerSearch.jsx';

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
          <PlayerSearch/>
        </Route>
        <Route path='/'>
          <Landing/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
