export const SET_INPUT = "SET_INPUT";
export const MOVE_COORDINATE = "MOVE_COORDINATE";

export const setInput = (input) => {
  return {
    type: SET_INPUT,
    payload: input
  };
}

export const moveCoordinate = () => {
  return { type: MOVE_COORDINATE };
};
