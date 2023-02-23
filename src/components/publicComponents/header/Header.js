import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { posturl } from "../../../configuration.js";
import { change_view_type } from "../../../actions/hocActions.js";
import { withRouter } from "react-router-dom";
import { signOut } from "../../../actions/sigInAction";
import $ from "jquery";
import history from "../../../history.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: true,
      categories: [],
      sub_categories: [],
      searchkey: ""
    };
  }

  toggleButton = () => {
    this.props.change_view_type(false, this.props.location.pathname);
  };

  checkLogin = () => {
    if (localStorage.getItem("userName")) {
      this.props.change_view_type(false, this.props.location.pathname);
    } else {
      this.props.history.push("/login");
    }
  };
  Logout = e => {
    e.preventDefault();
    this.props.history.push("/login");
    this.props.signOut();
  };
  get_menu_categories() {
    const insertUrl = posturl + "/lms_admin/get_menu_categories";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
      }).then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    })
      .then(response => {
        if (response) {
          this.setState({
            categories: response.categories,
            sub_categories: response.sub_categories
          });
        } else {
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  componentDidMount() {
    this.get_menu_categories();
  }
  searchData = e => {
    e.preventDefault();
    var searchKey = $("#searchKey").val();
    if ($.trim(searchKey) == "") {
      $("#searchKey").focus();
      return false;
    }
    console.log(searchKey);
    this.props.history.push("/search/" + searchKey);
  };
  render() {
    return (
      <section className="menu-area">
        <div className="container-xl">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="mobile-header-buttons">
                  <li>
                    <a
                      className="mobile-nav-trigger"
                      href="#mobile-primary-nav"
                    >
                      Menu<span></span>
                    </a>
                  </li>
                  <li>
                    <a className="mobile-search-trigger" href="#mobile-search">
                      Search<span></span>
                    </a>
                  </li>
                </ul>
                <Link to="/" className="navbar-brand">
                  <img
                    src="/assets/uploads/system/logo-dark.png"
                    alt=""
                    height="35"
                  />
                </Link>
                <div className="main-nav-wrap">
                  <div className="mobile-overlay"></div>
                  <ul className="mobile-main-nav">
                    <div className="mobile-menu-helper-top"></div>
                    <li className="has-children">
                      <a href="#">
                        <i className="fas fa-th d-inline"></i>
                        <span>Courses</span>
                        <span className="has-sub-category">
                          <i className="fas fa-angle-right"></i>
                        </span>
                      </a>
                      <ul className="category corner-triangle top-left is-hidden">
                        <li className="go-back">
                          <a href="#">
                            <i className="fas fa-angle-left"></i>Menu
                          </a>
                        </li>
                        {this.state.categories.map((tit, index) => (
                          <li key={index} className="has-children">
                            <a href="#">
                              <span className="icon">
                                <i className={tit.font_awesome_class}></i>
                              </span>
                              <span>{tit.name}</span>
                              <span className="has-sub-category">
                                <i className="fas fa-angle-right"></i>
                              </span>
                            </a>
                            <ul className="sub-category is-hidden">
                              <li className="go-back-menu">
                                <a href="#">
                                  <i className="fas fa-angle-left"></i>Menu
                                </a>
                              </li>
                              <li className="go-back">
                                <a href="#">
                                  <i className="fas fa-angle-left"></i>
                                  <span className="icon">
                                    <i className="fas fa-desktop"></i>
                                  </span>
                                  {tit.name}
                                </a>
                              </li>
                              {this.state.sub_categories.map(item =>
                                item.map((tit1, index1) =>
                                  tit.id == tit1.parent ? (
                                    <li key={"menu-" + index1}>
                                      <Link
                                        to={"/courses/" + tit1.slug}
                                        prop={tit1.id}
                                      >
                                        {tit1.name}
                                      </Link>
                                    </li>
                                  ) : null
                                )
                              )}
                            </ul>
                          </li>
                        ))}

                        <li className="all-category-devided">
                          <Link to="/courses">
                            <span className="icon">
                              <i className="fa fa-align-justify"></i>
                            </span>
                            <span>All courses</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <div className="mobile-menu-helper-bottom"></div>
                  </ul>
                </div>
                <form
                  id="searchBar"
                  className="inline-form"
                  onSubmit={this.searchData}
                  style={{ width: "100%" }}
                >
                  <div className="input-group search-box mobile-search">
                    <input
                      type="text"
                      name="searchKey"
                      id="searchKey"
                      className="form-control"
                      placeholder="search for courses"
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <div
                  className="cart-box menu-icon-box"
                  id="cart_items"
                  style={{ display: "none" }}
                >
                  <div className="icon">
                    <a>
                      <i className="fas fa-shopping-cart"></i>
                    </a>
                    <span className="number">1</span>
                  </div>

                  <div
                    className="dropdown course-list-dropdown corner-triangle top-right"
                    // style={{ display: "none" }}
                  >
                    <div className="list-wrapper">
                      <div className="item-list">
                        <ul>
                          <li>
                            <div className="item clearfix">
                              <div className="item-image">
                                <a href="#">
                                  <img
                                    src="/assets/frontend/default/img/course_thumbnail_placeholder.jpg"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </a>
                              </div>
                              <div className="item-details">
                                <a href="#">
                                  <div className="course-name"></div>
                                  <div className="instructor-name">
                                    John Doe
                                  </div>
                                  <div className="item-price">
                                    <span className="current-price"></span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-footer">
                        <div className="cart-total-price clearfix">
                          <span>Total:</span>
                          <div className="float-right">
                            <span className="current-price"></span>
                            <span className="original-price">$94.99</span>
                          </div>
                        </div>
                        <a href="home/shopping_cart.html">Go to cart</a>
                      </div>
                    </div>
                    <div className="empty-box text-center d-none">
                      <p>Your cart is empty.</p>
                      <a href="#">Keep Shopping</a>
                    </div>
                  </div>
                  {/* <script type="text/javascript">
                           function showCartPage() {
                            window.location.replace("home/shopping_cart.html");
                           }
                        </script> */}
                </div>
                <span className="signin-box-move-desktop-helper"></span>
                <div className="sign-in-box btn-group">
                  {this.props.authPublic == false ? (
                    <React.Fragment>
                      <Link to="/login" className="btn btn-sign-in">
                        Log in
                      </Link>
                      <Link to="/register" className="btn btn-sign-up">
                        Sign up
                      </Link>
                    </React.Fragment>
                  ) : this.props.auth == false ? (
                    <React.Fragment>
                      <a
                        onClick={this.Logout}
                        className="btn btn-sign-in curser_add"
                      >
                        Logout
                      </a>
                      <Link to="/profile" className="btn btn-sign-up">
                        Profile
                      </Link>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <a
                        onClick={this.Logout}
                        className="btn btn-sign-in curser_add"
                      >
                        Logout
                      </a>
                      <Link to="/profile" className="btn btn-sign-up">
                        Profile
                      </Link>
                      {/* <Link
                        to="/admin/dashboard"
                        onClick={this.toggleButton}
                        className="btn btn-sign-up"
                      >
                        Dashbaord
                      </Link> */}
                    </React.Fragment>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    view_type: state.hocReducer.view_type,
    auth: state.signUpReducer.auth,
    authPublic: state.signUpReducer.authPublic
  };
};
export default withRouter(
  connect(mapStateToProps, { change_view_type, signOut })(Header)
);
