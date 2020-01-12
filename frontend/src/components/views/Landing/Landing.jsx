import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createRoom, joinRoom } from "../../../lib/connection";
import "./Landing.scss";

function Modal() {
  const [roomId, setRoomId] = useState("");

  return (
    <div className="modal">
      <input
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        placeholder="Input Room ID"
      />
      <br />
      <button onClick={() => joinRoom(roomId)}>JOIN</button>
    </div>
  );
}

function Landing() {
  const [joining, setJoining] = useState(false);

  return (
    <div id="landing">
      <h1>100 Cell Dash</h1>
      <button onClick={createRoom}>Create A Room</button>
      <button onClick={() => setJoining(true)}>Join A Room</button>

      {joining && <Modal />}
    </div>
  );
}

export default Landing;
