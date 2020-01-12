import React from 'react';
import {useSelector} from 'react-redux';

import { start } from "../../../lib/connection";


function HostRoom(){
  return(
    <>
      <p>{useSelector(state => state.roomId)}</p>
      <button onClick={start}>Start</button>
    </>
  )
}

export default HostRoom;
