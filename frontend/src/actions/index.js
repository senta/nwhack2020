export const SET_INPUT = "SET_INPUT";
export const MOVE_COORDINATE = "MOVE_COORDINATE";

export const ROOM_CREATED = "ROOM_CREATED";
export const ROOM_JOINED = "ROOM_JOINED";
export const ROOM_LEFT = "ROOM_LEFT";

export const GAME_WILL_START = "GAME_WILL_START";
export const GAME_START = "GAME_START";
export const GAME_FINISHED = "GAME_FINISHED";
export const GAME_PLAYER_CHANGED = "GAME_PLAYER_CHANGED";
export const GAME_STATE_SYNC = "GAME_STATE_SYNC";
export const GAME_PLAYER_ATTACKED = "GAME_PLAYER_ATTACKED";
export const GAME_PLAYER_TIMEOVER = "GAME_PLAYER_TIMEOVER";

// frontend actions

export const setInput = input => {
  return {
    type: SET_INPUT,
    payload: input
  };
};

export const moveCoordinate = () => {
  return { type: MOVE_COORDINATE };
};

// backend actions

export const roomCreated = roomId => {
  return { type: ROOM_CREATED, payload: roomId };
};

export const roomJoined = roomId => {
  return { type: ROOM_JOINED, payload: roomId };
};

export const roomLeft = () => {
  return { type: ROOM_LEFT };
};

export const gameWillStart = payload => {
  return { type: GAME_WILL_START, payload };
};

export const gameStart = () => {
  return { type: GAME_START };
};

export const gameFinished = () => {
  return { type: GAME_FINISHED };
};

export const gameJoin = payload => {
  return { type: GAME_PLAYER_CHANGED, payload };
};

export const sync = () => {
  return { type: GAME_STATE_SYNC };
};

export const attacked = payload => {
  return { type: GAME_PLAYER_ATTACKED, payload };
};

export const timeover = payload => {
  return { type: GAME_PLAYER_TIMEOVER, payload };
};
