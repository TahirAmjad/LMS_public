import axios from "axios";
import $ from "jquery";
import qs from "qs";
import { SIGN_UP } from "./allActionType";
import { toastr } from "react-redux-toastr";
import { posturl } from "../configuration.js";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const signUp = data => {
  console.log(data);
  return dispatch => {
    const url = `${posturl}/lms_admin/register`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        console.log(response);
        if (response.data.status == true) {
          dispatch({ type: SIGN_UP, response: response.data });
          toastr.success("success", "Register Successfully");
          // toastr.error("Error", response.data.message);
          // alert("Register Successfully");
        }
        if (response.data.status == false) {
          toastr.error("Error", response.data.message);
        }
        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
