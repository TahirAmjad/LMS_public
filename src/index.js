import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Routes from "./routes";
import { SIGN_IN } from "./actions/allActionType.js";

// import store from "./components/publicComponents/byTayyab/store/store.js";
import Store from "./Store.js";
import { Provider } from "react-redux";
var viewType = "";

class App extends Component {
  constructor() {
    super();
    // var getUrl = window.location;
    // var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    // viewType = localStorage.getItem("viewType");
    // this.state = {
    //   viewType: viewType,
    //   baseUrl: finalurl
    // };
  }

  render() {
    if (localStorage.email) {
      const data = {
        email: localStorage.getItem("email")
        // userEmail: localStorage.getItem("userEmail")
      };
      Store.dispatch({ type: SIGN_IN, response: data });
    }
    return (
      <BrowserRouter>
        <Provider store={Store}>
          <Routes />
        </Provider>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
