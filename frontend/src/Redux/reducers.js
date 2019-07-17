import { SET_RESULTS, SET_MODALCLOTHE } from "./actions";

const searchReducers = (state = [], action) => {
  switch (action.type) {
    case SET_RESULTS:
      return (state = action.results);
    case SET_MODALCLOTHE:
      return (state = action.resultsModalClothe);
    default:
      return state;
  }
};

export default searchReducers;
