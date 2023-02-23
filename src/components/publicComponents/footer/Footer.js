import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <footer className="footer-area d-print-none">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-6">
              <p className="copyright-text">
                <a href="#">
                  <img
                    src="uploads/system/logo-dark.png"
                    alt=""
                    className="d-inline-block"
                    width="110"
                  />
                </a>
                <a href="http://creativeitem.com/" target="_blank"></a>
              </p>
            </div>
            <div className="col-md-6">
              <ul className="nav justify-content-md-end footer-menu">
                <li className="nav-item">
                  <a className="nav-link" href="home/about_us.html">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="home/privacy_policy.html">
                    Privacy policy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="home/terms_and_condition.html">
                    Terms & condition
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
