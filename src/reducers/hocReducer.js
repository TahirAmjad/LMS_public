import { CHANGE_VIEW_TYPE } from "../actions/allActionType";

const INITAIL_STATE = {
  view_type: true,
  show: true
};

const hocReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case CHANGE_VIEW_TYPE: {
      return {
        ...state,
        view_type: !state.view_type
      };
    }
    default:
      return {
        ...state
      };
  }
};

export default hocReducer;
