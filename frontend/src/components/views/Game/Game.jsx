import React, {useState} from 'react';

import PlayerField from './PlayerField/PlayerField';
import OpponentFieldMap from './OpponentFieldMap/OpponentFieldMap';
import Keyboard from './Keyboard/Keyboard';

function Game(){
  // const time = useSelector(state => state.room.startat);

  let [canStart, setStart] = useState(false);
  setTimeout(() => setStart(true), 5000);
  return(
    <>
      {canStart ? (
        <>
          <PlayerField />
          <OpponentFieldMap/>
          <Keyboard/>
        </>
      ) : (<h1>Loading...</h1>)}
    </>
  )
}

export default Game;
