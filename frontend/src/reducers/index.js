import { SET_INPUT, MOVE_COORDINATE } from "../actions";

const maxXAxis = 10;
const initialValue = {
  input: '',
  xNums: [3, 4, 4, 5, 5, 6, 7, 8, 9, 9],
  yNums: [3, 4, 4, 5, 5, 6, 7, 8, 9, 9],
  coordinate: {
    xAxis: 0,
    yAxis: 0
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
        coordinate: {
          xAxis: store.coordinate.yAxis === maxXAxis ? 0 : store.coordinate.yAxis++,
          yAxis: store.coordinate.yAxis++
        }
      };
    default:
      return store;
  }
};

export default rootReducer;