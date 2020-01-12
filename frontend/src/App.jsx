import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store';

import Game from './components/views/Game/Game.jsx';
import Landing from './components/views/Landing/Landing.jsx';
import HostRoom from './components/views/HostRoom/HostRoom.jsx';
import PlayerSearch from './components/views/PlayerSearch/PlayerSearch.jsx';

function App() {
  return (
    <Router>
    <Provider store={store}>
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
      </Provider>
    </Router>
  );
}

export default App;
