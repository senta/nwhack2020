import React, { useState } from 'react';
import PlayerField from './PlayerField/PlayerField';
import OpponentFieldMap from './OpponentFieldMap/OpponentFieldMap';
import Keyboard from './Keyboard/Keyboard';

function Game() {
  const gameState = {
    multipliers: useSelector(state => state.multipliers),
    players: useSelector(state => state.players)
  }

  return (
    <>
      {true ? (
        <>
          <PlayerField />
          <OpponentFieldMap gameState={gameState} />
          <Keyboard />
        </>
      ) : (<h1>Loading...</h1>)}
    </>
  )
}

export default Game;
