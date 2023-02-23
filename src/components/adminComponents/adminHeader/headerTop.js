import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Script from "react-load-script";
import $ from "jquery";

class HeaderTop extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
      user_name: ""
    };
    // localStorage.removeItem("LOGIN");
  }

  hideSideBar = () => {
    $('[data-toggle="sidebar"]').click(function(event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });

    if ($(window).width() > 739) {
      $(".app-sidebar").hover(function(event) {
        event.preventDefault();
        $(".app").removeClass("sidenav-toggled");
      });
    }
  };

  render() {
    return (
      <div>
        <Script url="/assets/backend/plugins/toggle-sidebar/js/sidemenu.js" />
        <div className="p-2 d-block d-sm-none navbar-sm-search">
          <form className="navbar-search navbar-search-dark form-inline ml-lg-auto">
            <div className="form-group mb-0">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-search" />
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>

        <nav
          className="navbar navbar-top  navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              onClick={this.hideSideBar()}
              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-toggle="sidebar"
              href="#"
            />

            <a className="navbar-brand pt-0 d-md-none" href="index-2.html">
              <img
                src="assets/img/brand/logo-light.png"
                className="navbar-brand-img"
                alt="..."
              />
            </a>

            <form className="navbar-search navbar-search-dark form-inline mr-3  ml-lg-auto">
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>
            </form>

            <ul className="navbar-nav align-items-center ">
              <li className="nav-item dropdown">
                <a
                  aria-expanded="false"
                  aria-haspopup="true"
                  className="nav-link pr-md-0"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="Image placeholder"
                        src="assets/img/faces/male/profile.png"
                      />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 ">{this.state.user_name}</span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div className=" dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </div>
                  {/* <a className="dropdown-item" href="user-profile.html">
											<i className="ni ni-single-02" /> <span>My profile</span>
										</a>
										<a className="dropdown-item" href="#">
											<i className="ni ni-settings-gear-65" />{" "}
											<span>Settings</span>
										</a> */}
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" onClick={() => this.logout()}>
                    <i className="ni ni-user-run" /> <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderTop;
