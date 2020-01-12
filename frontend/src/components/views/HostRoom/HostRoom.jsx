import React from 'react';
import {useLocation} from 'react-router';
import './HostRoom.scss';

import { start } from "../../../lib/connection";


function HostRoom(){
  const queryParams = new URLSearchParams(useLocation().search);
  const id = queryParams.get('id');
  return(
    <>
      <p>{useSelector(state => state.roomId)}</p>
      <button onClick={start}>Start</button>
    </>
  )
}

export default HostRoom;
