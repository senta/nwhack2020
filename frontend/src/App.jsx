import React from 'react';
import { Provider } from "react-redux";

import store from './store';
import PlayerField from './components/views/PlayerField/PlayerField';
import OpponentFieldMap from './components/views/OpponentFieldMap/OpponentFieldMap';
import Keyboard from './components/views/Keyboard/Keyboard';

function App() {
  return (
    <Provider store={store}>
      <PlayerField />
      <OpponentFieldMap />
      <Keyboard />
    </Provider>
  );
}

export default App;
