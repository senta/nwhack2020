import axios from "axios";
import io from "socket.io-client";

import heartbeat from "./heartbeat";
import store from "../store";
import * as actions from "../actions";

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
    .then(res => window.location.assign(`/host/${res.data.body.room}`));

  if (status === 200) {
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
    .then(res => res.data.body);

  if (status === 200) {
    store.dispatch(actions.roomJoined(body.room));
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

export function ping() {
  const d = new Date()
  socket.emit("PLAYER_PING", d.getTime());
}

export function ready() {
  socket.emit("PLAYER_READY");
}

export function start() {
  socket.emit("PLAYER_READY");
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

socket.on("GAME_START", payload => actions.gameWillStart(payload));
socket.on("GAME_END", payload => actions.gameFinished(payload));

socket.on("GAME_PLAYER_JOINED", payload => actions.gameJoin(payload));
socket.on("GAME_PLAYER_LEFT", payload => actions.gameJoin(payload));

socket.on("PLAYER_STATE_SYNC", payload => actions.sync(payload));
socket.on("PLAYER_ATTACKED", payload => actions.attacked(payload));

socket.on("PLAYER_TIMEOVER", payload => actions.timeover(payload));
