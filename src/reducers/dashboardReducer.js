import { MERCHANT_DASHBOARD } from "../actions/allActionType.js";

const Initail_state = {
  dash_data: []
};

const dashboardReducer = (state = Initail_state, action) => {
  switch (action.type) {
    case MERCHANT_DASHBOARD: {
      return {
        ...state,
        dash_data: action.response
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default dashboardReducer;
