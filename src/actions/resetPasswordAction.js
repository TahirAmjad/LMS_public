import axios from "axios";
import $ from "jquery";
import qs from "qs";
import {
  RESET_PASSOWRD,
  RESET_PASSOWRD_TO_CONFIRM,
  CHECK_FOR_TOKEN
} from "./allActionType";
import { toastr } from "react-redux-toastr";
let getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const resetpassord = data => {
  console.log(data);
  return dispatch => {
    const url = `${finalurl}/listjeannie_backend/signUpContler/c_siginUp/resetpassord`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        if (response.data.create == true) {
          dispatch({ type: RESET_PASSOWRD, response: response.data });
          toastr.success("success", response.data.message);
          // toastr.error("Error", response.data.message);
          // alert("Register Successfully");
        }
        if (response.data.create == false) {
          toastr.error("Error", response.data.message);
          //   // alert("User Name Allready Exist");
        }
        //$.LoadingOverlay("hide");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const resetpassordToConfirm = data => {
  console.log(data);
  return dispatch => {
    const url = `${finalurl}/listjeannie_backend/signUpContler/c_siginUp/resetpassordToConfirm`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        if (response.data.status == true) {
          console.log(response);
          dispatch({
            type: RESET_PASSOWRD_TO_CONFIRM,
            response: response.data
          });
          toastr.success("success", response.data.message);
        }
        if (response.data.status == false) {
          toastr.error("Error", response.data.message);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
export const checkForTaoken = emailEncrpt => {
  return dispatch => {
    const url = `${finalurl}/listjeannie_backend/signUpContler/c_siginUp/checkForTaoken`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ emailEncrpt }),
      url
    };

    axios(options)
      .then(response => {
        // $.LoadingOverlay("show");
        if (response.data == 1) {
          console.log(response.data)
          dispatch({
            type: CHECK_FOR_TOKEN,
            response: response.data
          });
          toastr.error("Error", "Session Is Out Send Mail Again");
       }
        // if(response.data.status == false){

        // }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
