import { GET_USER } from "./actions";

const initialState = {
  isLoggedIn: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

export default loginReducer;
