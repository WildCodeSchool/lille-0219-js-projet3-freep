import { combineReducers } from "redux";
import searchReducers from "./reducers";
import loginReducer from "./loginReducer";

export default combineReducers({ searchReducers, loginReducer });
