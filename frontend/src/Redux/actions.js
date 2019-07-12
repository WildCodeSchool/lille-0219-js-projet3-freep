const SET_RESULTS = "SET_RESULTS";

const setResultsActions = results => ({
  type: SET_RESULTS,
  results
});

module.exports = { SET_RESULTS, setResultsActions };
