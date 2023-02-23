import hocReducer from "./reducers/hocReducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as toastrReducer } from "react-redux-toastr";
import signUpReducer from "./reducers/signUpReducer";
import resetReducer from "./reducers/resetReducer";
import dashboardReducer from "./reducers/dashboardReducer";

const rootReducer = combineReducers({
  hocReducer,
  signUpReducer,
  resetReducer,
  dashboardReducer,
  toastr: toastrReducer
});
const composeEnhancers = composeWithDevTools({
  serialize: true
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;
