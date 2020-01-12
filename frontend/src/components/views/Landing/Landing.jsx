import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.scss';

function Landing(){
  return(
    <div id="landing">
      <h1>100 Cell Dash</h1>
      <Link to="/host">Create A Room</Link>
      <Link to="/player">Join A Room</Link>
    </div>
  )
}

export default Landing;
