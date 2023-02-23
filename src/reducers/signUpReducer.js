import { SIGN_IN, SIGN_OUT } from "../actions/allActionType.js";
const initialState = {
  signUpArray: [],
  auth: false,
  authPublic: false
};
var authCheck = "";
const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      // if (localStorage.getItem("isAdmin")) {
      //   authCheck = true;
      // } else {
      //   authCheck = false;
      // }
      return {
        ...state,
        auth: localStorage.getItem("isAdmin") ? true : false,
        authPublic: true,
        signUpArray: action.response
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        auth: false,
        authPublic: false,
        signUpArray: []
      };
    }
    default:
      return { ...state };
  }
};
export default signUpReducer;
