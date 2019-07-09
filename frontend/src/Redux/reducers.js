import { SET_RESULTS } from "./actions";

const searchReducers = (state = [], action) => {
  switch (action.type) {
    case SET_RESULTS:
      console.log("-----------------");
      console.log(action.results);
      console.log("-----------------");

      return (state = action.results);
    default:
      return state;
  }
};

export default searchReducers;
