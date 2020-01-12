import * as actions from "../actions";

const maxX = 9;
const initialValue = {
  input: '',
  xNums: [3, 4, 3, 5, 5, 6, 7, 8, 9, 9],
  yNums: [3, 4, 4, 5, 5, 6, 7, 8, 9, 9],
  coordinate: {
    x: 0,
    y: 0
  },
  players: [],
  room: {
    id: null,
    startat: -1,
    winner: null,
    state: null // "waiting" | "playing" | "finished"
  }
};

const rootReducer = (store = initialValue, action) => {
  switch (action.type) {
    case actions.SET_INPUT:
      return {
        ...store,
        input: action.payload
      };
    case actions.MOVE_COORDINATE:
      let { x, y } = store.coordinate;
      if (x === maxX) {
        x = 0;
        ++y;
      } else {
        ++x;
      }
      return {
        ...store,
        input: '',
        coordinate: { x, y }
      };
    case actions.GAME_START:
      return {
        ...store,
        players: action.payload.players,
        xNums: action.payload.multipliers[0],
        yNums: action.payload.multipliers[1],
        room: {
          id: action.payload.time,
          startat: action.payload.time,
          winner: null,
          state: 'playing'
        }
      };
    case actions.GAME_FINISHED:
      return {
        ...store,
        room: {
          id: null,
          startat: -1,
          winner: null,
          state: 'finished'
        }
      };
    case actions.GAME_PLAYER_CHANGED:
    case actions.GAME_STATE_SYNC:
      return {
        ...store,
        players: action.payload.players
      };
    default:
      return store;
  }
};

export default rootReducer;
