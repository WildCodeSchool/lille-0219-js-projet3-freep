const SET_RESULTS = "SET_RESULTS";
const GET_USER = "GET_USER";

const setResultsActions = results => ({
  type: SET_RESULTS,
  results
});

const loggedInUserActions = user => ({
  type: GET_USER,
  user
});

module.exports = {
  SET_RESULTS,
  setResultsActions,
  loggedInUserActions,
  GET_USER
};
