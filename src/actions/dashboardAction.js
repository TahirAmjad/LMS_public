import axios from "axios";
import $ from "jquery";
import qs from "qs";
import { MERCHANT_DASHBOARD } from "./allActionType";
import { toastr } from "react-redux-toastr";
import history from "../history";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const get_recent_orders = data => {
  //   console.log(data);
  return dispatch => {
    const url = `${finalurl}/listjeannie_backend/api/merchant_dashboard`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        if (response.data.exist == true) {
          console.log(response);
          dispatch({
            type: MERCHANT_DASHBOARD,
            response: response.data.merhc_dash
          });
        } else {
        }
        //$.LoadingOverlay("show");
        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
