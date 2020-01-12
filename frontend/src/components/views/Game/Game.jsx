<<<<<<< HEAD
import React, {useState} from 'react';

=======
import React from 'react';
import { useSelector } from 'react-redux';
>>>>>>> b2c4e2652e8379fe206f2678ced710a918b9f081
import PlayerField from './PlayerField/PlayerField';
import OpponentFieldMap from './OpponentFieldMap/OpponentFieldMap';
import Keyboard from './Keyboard/Keyboard';

<<<<<<< HEAD
function Game(){
  // const time = useSelector(state => state.room.startat);

  let [canStart, setStart] = useState(false);
  setTimeout(() => setStart(true), 5000);
  return(
=======
function Game() {
  const gameState = {
    multipliers: useSelector(state => state.multipliers),
    players: useSelector(state => state.players)
  }

  return (
>>>>>>> b2c4e2652e8379fe206f2678ced710a918b9f081
    <>
      {canStart ? (
        <>
          <PlayerField />
<<<<<<< HEAD
          <OpponentFieldMap/>
          <Keyboard/>
=======
          <OpponentFieldMap gameState={gameState} />
          <Keyboard />
>>>>>>> b2c4e2652e8379fe206f2678ced710a918b9f081
        </>
      ) : (<h1>Loading...</h1>)}
    </>
  )
}

export default Game;
