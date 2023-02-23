import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminPageInfo from "../adminHelmet/adminPageInfo";
import AdminHeaderMenu from "./adminHeaderMenu";
import $ from "jquery";
class AdminHeader extends Component {
  componentDidMount() {
    $("#global-loader").addClass("hide");
  }
  render() {
    return (
      <React.Fragment>
        <AdminPageInfo />
        <div className="hideOnLogin">
          <div id="global-loader" />
          <div className="app-sidebar__overlay" data-toggle="sidebar" />
          <AdminHeaderMenu />
        </div>
      </React.Fragment>
    );
  }
}

export default AdminHeader;
