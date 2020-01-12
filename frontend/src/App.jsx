import React from 'react';
import PlayerField from './components/views/PlayerField/PlayerField';
import OpponentFieldMap from './components/views/OpponentFieldMap/OpponentFieldMap';

function App() {
  return (
    <div className="App">
      <PlayerField />
      <OpponentFieldMap />
    </div>
  );
}

export default App;
