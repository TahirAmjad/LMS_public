import React, { Component } from "react";
// import { Route, Switch } from "react-router-dom";
// import AdminPageInfo from "../../adminHelmet/adminPageInfo";
// import $ from "jquery";
import { connect } from "react-redux";
// import { get_recent_orders } from "../../../../actions/dashboardAction.js";
import HeaderTop from "../../adminHeader/headerTop.js";
export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    const data = {
      isAdmin: localStorage.getItem("isAdmin")
    };
  }
  render() {
    return (
      <React.Fragment>
        <div class="app-content ">
          <div class="side-app">
            <div class="main-content">
              <HeaderTop />
              <div class="container-fluid pt-8">
                <div class="page-header mt-0 shadow p-3">
                  <ol class="breadcrumb mb-sm-0">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Sales Dashboard
                    </li>
                  </ol>
                  <div class="btn-group mb-0">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Actions
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-plus mr-2"></i>Add new Page
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-eye mr-2"></i>View the page Details
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-edit mr-2"></i>Edit Page
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-cog mr-2"></i> Settings
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card shadow overflow-hidden">
                  <div class="">
                    <div class="row">
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-chart-line mr-2"></i>
                            Today sales
                          </p>
                          <h2 class="text-primary text-xxl">1235</h2>
                          <a
                            href="#"
                            class="btn btn-outline-primary btn-pill btn-sm"
                          >
                            30% decrease
                          </a>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-users mr-2"></i>
                            New Users
                          </p>
                          <h2 class="text-yellow text-xxl">523</h2>
                          <a
                            href="#"
                            class="btn btn-outline-yellow btn-pill btn-sm"
                          >
                            10% increase
                          </a>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-cart-arrow-down mr-2"></i>
                            Today Orders
                          </p>
                          <h2 class="text-warning text-xxl">785</h2>
                          <a
                            href="#"
                            class="btn btn-outline-warning btn-pill btn-sm"
                          >
                            9% decrease
                          </a>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-signal mr-2"></i>
                            Today sales Revenue
                          </p>
                          <h2 class="text-danger text-xxl">$ 125</h2>
                          <a
                            href="#"
                            class="btn btn-outline-danger btn-pill btn-sm"
                          >
                            10% decrease
                          </a>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-dollar-sign mr-2"></i>
                            Today Profit
                          </p>
                          <h2 class="text-success text-xxl">$ 30</h2>
                          <a
                            href="#"
                            class="btn btn-outline-success btn-pill btn-sm"
                          >
                            5% increase
                          </a>
                        </div>
                      </div>
                      <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6 stats">
                        <div class="text-center">
                          <p class="text-light">
                            <i class="fas fa-briefcase mr-2"></i>
                            Market Value
                          </p>
                          <h2 class="text-primary text-xxl">12</h2>
                          <a
                            href="#"
                            class="btn btn-outline-primary btn-pill btn-sm"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     dash_data: state.dashboardReducer.dash_data
//   };
// };
export default Dashboard;
// export default connect(
//   mapStateToProps,
//   { get_recent_orders }
// )(Dashboard);
