import { SET_RESULTS } from "./actions";

const searchReducers = (state = [], action) => {
  switch (action.type) {
    case SET_RESULTS:
      return (state = action.results);
    default:
      return state;
  }
};

export default searchReducers;
