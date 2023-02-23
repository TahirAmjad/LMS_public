import React, { Component } from "react";

import PublicHeader from "../../components/publicComponents/header/Header";
import PublicFooter from "../../components/publicComponents/footer/Footer";
import AdminHeader from "../../components/adminComponents/adminHeader/adminHeader";
// import AdminHeaderMenu from "../../components/adminComponents/adminHeader/adminHeaderMenu";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { change_view_type } from "../../actions/hocActions.js";
import $ from "jquery";
var res;
class Layout extends Component {
  constructor(props) {
    super(props);
    var getUrl = window.location;
  }
  componentWillMount() {
    var str = this.props.location.pathname;
    res = str.split("/");
    if (res[1] == "admin") {
      if (localStorage.getItem("isAdmin")) {
        this.props.history.push(this.props.location.pathname);
        this.props.change_view_type(false, null);
      }
    }
  }

  render() {
    console.log(this.props);
    return this.props.view_type == false ? (
      <React.Fragment>
        <div className="page">
          <AdminHeader />
          {this.props.children}
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <PublicHeader />
        {this.props.children}
        <PublicFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    view_type: state.hocReducer.view_type
  };
};

export default withRouter(
  connect(mapStateToProps, { change_view_type })(Layout)
);
