import React from 'react';
import {useSelector} from 'react-redux';

function HostRoom(){
  return(
    <>
      <p>{useSelector(state => state.roomId)}</p>
      <button>Start</button>
    </>
  )
}

export default HostRoom;
