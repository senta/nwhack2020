import React from 'react';
import PlayerField from './components/views/PlayerField/PlayerField';
import OpponentFieldMap from './components/views/OpponentFieldMap/OpponentFieldMap';
import Keyboard from './components/views/Keyboard/Keyboard';
import io from 'socket.io-client';

const socket = io();

function App() {
  return (
    <div className="App">
      <PlayerField/>
      <OpponentFieldMap />
      <Keyboard socket={socket}/>
    </div>
  );
}

export default App;
