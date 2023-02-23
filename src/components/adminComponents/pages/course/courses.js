import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { posturl } from "../../../../configuration.js";
import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../../adminHeader/headerTop.js";
import "../../../../innerAssets/backend/plugins/datatable/dataTables.bootstrap4.min.js";
// import "../../../innerAssets/backend/css/dashboard.css";
export class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      categoryName: "",
      isChlid: false,
      categoryParent: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.isChlid = this.isChlid.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  isChlid = e => {
    console.log(e.target.value);
    if (e.target.value == "Yes") {
      this.setState({ isChlid: true });
    } else {
      this.setState({ isChlid: false });
    }
  };
  handleCreateSubmit = e => {
    e.preventDefault();
    var categoryName = this.state.categoryName;
    var categoryParent = this.state.categoryParent;
    var isChild = this.state.isChild;
    if (categoryName == "") {
      alert("Name required");
      return false;
    }
    if (isChild == true) {
      if (categoryParent == "") {
        alert("parent Category required");
        return false;
      }
    }
    // state assign

    let insertUrl = posturl + "/lms_admin/admin/create_category";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          categoryName: categoryName,
          categoryParent: categoryParent,
          isChild: isChild
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        if (result.create) {
          $("#createCategoryModal .close").click();
          // this.getTableData();
        } else {
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  getCourses() {
    this.$el = $(this.el);
    this.$el
      .DataTable()
      .destroy()
      .clear();
    let insertUrl = posturl + "/lms_admin/admin/get_courses";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        if (result) {
          this.setState({
            courses: result
          });
          this.$el.DataTable({
            searching: true
          });
        } else {
          this.setState({
            courses: []
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  courseStatus = (courseId, status) => {
    console.log(courseId);
    $("#global-loader").addClass("preLoader");
    let insertUrl = posturl + "/lms_admin/admin/course_status";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { courseId: courseId, status: status }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $("#global-loader").removeClass("preLoader");
        if (result.update) {
          Swal.fire({
            title: "Status",
            text: "Status updated successfully",
            timer: 2000,
            showConfirmButton: false
          });
          this.getCourses();
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    console.log(posturl);
    this.getCourses();
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-content ">
          <div className="side-app">
            <div className="main-content">
              <HeaderTop />
              <div className="container-fluid pt-8">
                <div className="page-header mt-0 shadow p-3">
                  <ol className="breadcrumb mb-sm-0">
                    <li className="breadcrumb-item active" aria-current="page">
                      Courses
                    </li>
                  </ol>
                  <div className="btn-group mb-0">
                    <Link
                      type="button"
                      to="/admin/create_course"
                      className="btn btn-primary btn-sm "
                    >
                      Add New Course
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card shadow">
                      {/* <div className="card-header">
                       <h2 className="mb-0">Data Table</h2>
                    </div> */}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            ref={el => (this.el = el)}
                            id="example"
                            className="table table-striped table-bordered w-100 text-nowrap"
                          >
                            <thead>
                              <tr>
                                <th className="wd-15p">Name</th>
                                <th className="wd-15p">Category</th>
                                <th className="wd-15p">Sub Category</th>
                                <th className="wd-20p">Price</th>
                                <th className="wd-20p">Level</th>
                                <th className="wd-20p">Status</th>
                                <th className="wd-25p">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.courses.map((tit, index) => (
                                <tr key={index} id={tit.courseId}>
                                  <td>{tit.title}</td>
                                  <td>{tit.parent_cat}</td>
                                  <td>{tit.child_cat}</td>
                                  <td>{tit.price}</td>
                                  <td>{tit.level}</td>
                                  <td>
                                    {tit.status == "active"
                                      ? "Active"
                                      : "Pending"}
                                  </td>
                                  <td>
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
                                        <a
                                          class="dropdown-item"
                                          onClick={() =>
                                            this.courseStatus(
                                              tit.courseId,
                                              tit.status
                                            )
                                          }
                                        >
                                          {tit.status == "active" ? (
                                            <i class="icon-close mr-2"></i>
                                          ) : (
                                            <i class="icon-check mr-2"></i>
                                          )}
                                          {tit.status == "active"
                                            ? "Deactive"
                                            : "Active"}
                                        </a>
                                        <Link
                                          class="dropdown-item"
                                          to={"/admin/section/" + tit.courseId}
                                        >
                                          <i class="fas fa-plus mr-2"></i>
                                          Section
                                        </Link>
                                        <Link
                                          class="dropdown-item"
                                          to={"/admin/lessons/" + tit.courseId}
                                        >
                                          <i class="fas fa-plus mr-2"></i>
                                          Lessons
                                        </Link>
                                        {/* <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">
                                          <i class="fas fa-cog mr-2"></i>{" "}
                                          Settings
                                        </a> */}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* add new cliend modal */}
        <div
          className="modal fade"
          id="createCategoryModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form
                method="post"
                id="addNewClient"
                onSubmit={this.handleCreateSubmit}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLabel">
                    Add New Category
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="categoryName"
                          onChange={this.handleChange}
                          placeholder="Category Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Is Child</label>
                        <select
                          name="isChild"
                          id="select-countries"
                          className="form-control custom-select"
                          onChange={this.isChlid}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                    {this.state.isChlid == true ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Parent Category</label>
                          <select
                            name="categoryParent"
                            id="select-countries"
                            className="form-control custom-select"
                            onChange={this.handleChange}
                          >
                            <option key="00">Select</option>
                            {this.state.categories.map((tit, index) =>
                              tit.categoryParent == 0 ? (
                                <option key={index} value={tit.categoryId}>
                                  {tit.categoryName}
                                </option>
                              ) : null
                            )}
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end of add new cliend modal */}
      </React.Fragment>
    );
  }
}

export default Courses;
