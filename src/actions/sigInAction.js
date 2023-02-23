import axios from "axios";
import $ from "jquery";
import qs from "qs";
import { SECRETKEY } from "../constant.js";
import { SIGN_IN, SIGN_OUT } from "./allActionType";

import { toastr } from "react-redux-toastr";
import { posturl } from "../configuration.js";
import history from "../history";
// let getUrl = window.location;
// let finalurl = getUrl.protocol + "//" + getUrl.hostname;

export const sigIn = data => {
  console.log(data);
  return dispatch => {
    const url = `${posturl}/lms_admin/login`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url
    };

    axios(options)
      .then(response => {
        console.log(response);
        //$.LoadingOverlay("show");
        if (response.data.status == true) {
          // const Cryptr = require("cryptr");
          // const cryptr = new Cryptr(SECRETKEY);
          // const encryptedString = cryptr.encrypt('bacon');
          // console.log(response);
          const data = {
            email: response.data.data.email
            // userEmail: response.data.data[0].EMAIL
          };
          // toastr.success("success", response.data.message);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("user_id", response.data.data.id);
          localStorage.setItem("role_id", response.data.data.role_id);

          if (response.data.data.role_id == 1) {
            localStorage.setItem("isAdmin", response.data.data.role_id);
            localStorage.setItem("viewType", "adminSite");
            history.push("/admin/dashboard");
            // window.location.reload();
          } else {
            // window.location("/admin/dashboard");
            // history.push("/");
            // window.location.reload();
          }

          dispatch({ type: SIGN_IN, response: data });
        }
        if (response.data.status == false) {
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

export const signOut = () => {
  console.log("herwer");
  localStorage.clear();
  return dispatch => {
    dispatch({
      type: SIGN_OUT
    });

    // history.push("/login");
    // window.location.reload();
  };
};
