import { CHECK_FOR_TOKEN } from "../actions/allActionType.js";
const initialState = {
  ResetArray: [],
};
const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_FOR_TOKEN: {
      return {
        ...state,
        auth: true,
        ResetArray: action.response
      };
    }
    
    default:
     return { ...state };
  }
};
export default resetReducer;
