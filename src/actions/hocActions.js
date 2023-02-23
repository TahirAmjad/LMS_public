import { CHANGE_VIEW_TYPE } from "./allActionType";
import history from "../history";

export const change_view_type = (data, location) => {
  return dispatch => {
    dispatch({
      type: CHANGE_VIEW_TYPE
    });
    console.log(data);
    if (data == false) {
      localStorage.setItem("viewType", "adminSite");
    } else {
      localStorage.setItem("viewType", "publicSite");
    }
  };
};
