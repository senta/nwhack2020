import React, {useState} from 'react';
import PlayerField from './components/views/PlayerField/PlayerField';
import OpponentFieldMap from './components/views/OpponentFieldMap/OpponentFieldMap';
import Keyboard from './components/views/Keyboard/Keyboard';
import io from 'socket.io-client';

const socket = io();

const dummy = {
  multipliers: [[2,4,5,2,3,5,6,8,9,3], [2,4,5,2,3,5,6,8,9,3], [2,4,5,2,3,5,6,8,9,3]],
  players: [
    {
      name: "Vlad",
      progress: 0,
      lastLine: 10,
      state: {
        multiply: 4,
        transfer: true,
        add: 0,
        remove: 0
      }
    },
    {
      lastLine: 10,
      name: "Shota",
      progress: 3,
      state: {
        multiply: 0,
        transfer: false,
        add: 2,
        remove: 1
      }
    }
  ]
}

function App() {
  let [gameState, setGameState] = useState({status: 'start'});
  socket.on('GAME_START', (data) => {
    setGameState({status: 'start', ...data});
  });
  return (
    <div className="App">
      {gameState.status === 'start' ? (
        <>
          <PlayerField/>
          <OpponentFieldMap gameState={dummy} socket={socket}/>
          <Keyboard gameState={gameState} socket={socket}/>
        </>
      ) : (<h1>Loading...</h1>)}
    </div>
  );
}

export default App;
