import React, { Component } from "react";
import { Link } from "react-router-dom";
import { change_view_type } from "../../../actions/hocActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOut } from "../../../actions/sigInAction";

// import "../../../../public/assets/adminAssets/css/dashboard.css";
class AdminHeaderMenu extends Component {
  changeViewType = () => {
    this.props.change_view_type(true, this.props.location.pathname);
  };
  Logout = e => {
    // e.preventDefault();
    this.props.change_view_type(true, this.props.location.pathname);
    this.props.history.push("/login");
    this.props.signOut();
  };
  render() {
    return (
      <React.Fragment>
        <aside className="app-sidebar ">
          <div className="sidebar-img">
            <Link className="navbar-brand" to="/">
              <img
                alt="..."
                className="navbar-brand-img main-logo"
                src="/assets/backend/img/brand/logo-dark.png"
              />
            </Link>
            <ul className="side-menu">
              <li className="slide">
                <Link className="side-menu__item" to="/">
                  <i className="side-menu__icon fe fe-home" />
                  <span className="side-menu__label">Dahboard</span>
                </Link>
              </li>
              <li className="slide">
                <a className="side-menu__item" data-toggle="slide" href="#">
                  <i className="side-menu__icon  fa fa-question-circle" />
                  <span className="side-menu__label">Courses</span>
                  <i className="angle fa fa-angle-right" />
                </a>
                <ul className="slide-menu">
                  <li>
                    <Link to="/admin/categories" className="slide-item">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/courses" className="slide-item">
                      Courses
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="slide">
                <a className="side-menu__item" data-toggle="slide" href="#">
                  <i className="side-menu__icon  fa fa-question-circle" />
                  <span className="side-menu__label">Settings</span>
                  <i className="angle fa fa-angle-right" />
                </a>
                <ul className="slide-menu">
                  <li>
                    <Link to="/admin/students" className="slide-item">
                      Students
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/teachers" className="slide-item">
                      Teachers
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}
// const mapStateToProps = state => {

// };
export default withRouter(
  connect(
    null,
    { change_view_type, signOut }
  )(AdminHeaderMenu)
);
