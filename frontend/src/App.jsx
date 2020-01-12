import React from 'react';
import PlayerField from './components/views/PlayerField/PlayerField';
import OpponentFieldMap from './components/views/OpponentFieldMap/OpponentFieldMap';
import Keyboard from './components/views/Keyboard/Keyboard';

function App() {
  return (
    <div className="App">
      <PlayerField />
      <OpponentFieldMap />
      <Keyboard/>
    </div>
  );
}

export default App;
