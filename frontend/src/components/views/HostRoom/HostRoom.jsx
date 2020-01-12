import React from 'react';
import {useLocation} from 'react-router';
import './HostRoom.scss';

function HostRoom(){
  const queryParams = new URLSearchParams(useLocation().search);
  const id = queryParams.get('id');
  return(
    <div id="host-room">
      <p>{id}</p>
      <button>Start</button>
    </div>
  )
}

export default HostRoom;
