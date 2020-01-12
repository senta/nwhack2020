import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PlayerSearch.scss";

import { ready, setProfile } from "../../../lib/connection";

function PlayerSearch() {
  let [name, setName] = useState("");
  const queryParams = new URLSearchParams(useLocation().search);
  const failure = queryParams.get("failure");

  const handleReady = () => {
    setProfile(name);
    ready();
  };

  return (
    <div id="player-search">
      {failure ? <p>Room doesn't exist</p> : null}
      <input
        onChange={event => setName(event.target.value)}
        name="name"
        type="text"
        placeholder="Pick a name"
        value={name}
      />
      <button type="submit" disabled={!name} onClick={handleReady}>
        READY
      </button>
    </div>
  );
}

export default PlayerSearch;
