import axios from "axios";
import io from "socket.io-client";

import heartbeat from "./heartbeat";
import store from "../store";
import * as actions from "../actions";
import { history } from "./history";

export const socket = io("http://localhost:8080/");

export const rest = axios.create({
  baseURL: "http://localhost:8080/api"
});

export async function createRoom() {
  const { status, body } = await rest
    .post("/room", {
      socket_id: socket.id,
      lines: 10 // TODO: take a value from input?
    })
    .then(res => res.data);

  if (status === 200) {
    history.push(`/host/${body.room}`);
    store.dispatch(actions.roomCreated(body.room));
  }
}

/**
 * @param {string} id room id
 */
export async function joinRoom(id) {
  const { status, body } = await rest
    .post(`/room/${id}/join`, {
      socket_id: socket.id
    })
    .then(res => res.data);

  if (status === 200) {
    history.push(`/player/${id}`);
    // store.dispatch(actions.roomJoined(body.room));
    // window.location.assign(`/player/${id}`);
  }
}

/**
 * @param {string} id room id
 */
export async function leaveRoom(id) {
  return rest.post(`/room/${id}/leave`, {
    socket_id: socket.id
  });
}

/**
 * @param {string} name
 */
export async function setProfile(name) {
  return rest.post(`/player/${socket.id}/profile`, {
    name
  });
}

export function ping() {
  const d = new Date();
  socket.emit("PLAYER_PING", d.getTime());
}

export function ready() {
  socket.emit("PLAYER_READY");
}

export function start() {
  socket.emit("PLAYER_START");
}

export function finishLine() {
  socket.emit("PLAYER_FINISH_LINE");
}

/**
 * @param {"multiply" | "transfer" | "add" | "remove"} attack
 */
export function attack(action) {
  socket.emit("PLAYER_FINISH_LINE", { action });
}

socket.on("connect", () => heartbeat.start());
socket.on("disconnect", () => heartbeat.stop());

socket.on("GAME_START", payload => {
  store.dispatch(actions.gameWillStart(payload))
  history.push(`/play`);
});
socket.on("GAME_END", payload => store.dispatch(actions.gameFinished(payload)));

socket.on("GAME_PLAYER_JOINED", payload => store.dispatch(actions.gameJoin(payload)));
socket.on("GAME_PLAYER_LEFT", payload => store.dispatch(actions.gameJoin(payload)));

socket.on("PLAYER_STATE_SYNC", payload => store.dispatch(actions.sync(payload)));
socket.on("PLAYER_ATTACKED", payload => store.dispatch(actions.attacked(payload)));

socket.on("PLAYER_TIMEOVER", payload => store.dispatch(actions.timeover(payload)));
