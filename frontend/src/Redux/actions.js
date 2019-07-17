const SET_RESULTS = "SET_RESULTS";

const SET_MODALCLOTHE = "SET_MODALCLOTHE";

const setResultsActions = results => ({
  type: SET_RESULTS,
  results
});

const setResultsModalClotheActions = resultsModalClothe => ({
  type: SET_MODALCLOTHE,
  resultsModalClothe
});

module.exports = {
  SET_RESULTS,
  setResultsActions,
  SET_MODALCLOTHE,
  setResultsModalClotheActions
};
