import React from "react";
import { Link } from "react-router-dom";
import { createRoom } from "../../../lib/connection";
import "./Landing.scss";

function Landing() {
  return (
    <div id="landing">
      <h1>100 Cell Dash</h1>
      <button onClick={createRoom}>Create A Room</button>
      <Link to="/player">Join A Room</Link>
    </div>
  );
}

export default Landing;
