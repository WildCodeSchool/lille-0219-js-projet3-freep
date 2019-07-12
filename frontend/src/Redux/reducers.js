import { SET_RESULTS } from "./actions";

const searchReducers = (state = [], action) => {
  switch (action.type) {
    case SET_RESULTS:
      return (state = action.results);
    default:
      return state;
  }
};

const modalClothe = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return (modalClothe = true);
    case "CLOSE":
      return (modalClothe = false);
    default:
      return state;
  }
};

export default searchReducers;
modalClothe;
