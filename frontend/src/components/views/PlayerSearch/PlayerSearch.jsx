import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import './PlayerSearch.scss';

function PlayerSearch(){
  let [id, setId] = useState('');
  let [name, setName] = useState('');
  const queryParams = new URLSearchParams(useLocation().search);
  const failure = queryParams.get('failure');
  return(
    <div id="player-search">
      {failure ? <p>Room doesn't exist</p> : null}
      <form method='post' action={`/rooms/${id}/join`}>
        <input onChange={(event) => setName(event.target.value)} name='name' type='text' placeholder='Pick a name' value={name}/>
        <input onChange={(event) => setId(event.target.value)} name='id' type='text' placeholder='Enter room code' value={id}/>
        <button type='submit' disabled={!id}>Join</button>
      </form>
    </div>
  )
}

export default PlayerSearch;
