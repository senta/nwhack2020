import { SET_INPUT, MOVE_COORDINATE } from "../actions";

const maxX = 10;
const initialValue = {
  input: '',
  xNums: [3, 4, 3, 5, 5, 6, 7, 8, 9, 9],
  yNums: [3, 4, 4, 5, 5, 6, 7, 8, 9, 9],
  coordinate: {
    x: 0,
    y: 0
  },
};

const rootReducer = (store = initialValue, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...store,
        input: action.payload
      };
    case MOVE_COORDINATE:
      return {
        ...store,
        input: '',
        coordinate: {
          x: ++store.coordinate.x === maxX ? 0 : store.coordinate.x,
          y: store.coordinate.x === maxX ? ++store.coordinate.y : store.coordinate.y
        }
      };
    default:
      return store;
  }
};

export default rootReducer;
