import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { posturl } from "../../../../configuration.js";
import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../../adminHeader/headerTop.js";
import "../../../../innerAssets/backend/plugins/datatable/dataTables.bootstrap4.min.js";
// import "../../../innerAssets/backend/css/dashboard.css";
export class CourseSection extends Component {
  constructor() {
    super();
    this.state = {
      courseSection: [],
      sectionTitle: "",
      editSectionTitle: "",
      courseId: "",
      sectionId: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateSubmit = e => {
    e.preventDefault();
    var sectionTitle = this.state.sectionTitle;
    var courseId = this.state.courseId;
    if (sectionTitle == "") {
      alert("Name required");
      return false;
    }
    let insertUrl = posturl + "/lms_admin/admin/create_section";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          sectionTitle: sectionTitle,
          courseId: courseId
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
          Swal.fire({
            title: "Created",
            text: result.message,
            timer: 2000,
            showConfirmButton: false
          });
          this.setState({
            sectionTitle: ""
          });
          $("#addNewSection")[0].reset();
          $("#createSectionModal .close").click();
          this.getSections();
        } else {
          Swal.fire({
            title: "warning ",
            text: result.message,
            timer: 2000,
            showConfirmButton: false
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  handleUpdateSubmit = e => {
    e.preventDefault();

    var sectionId = this.state.sectionId;
    var sectionTitle = this.state.editSectionTitle;
    var courseId = this.state.courseId;
    if (sectionTitle == "") {
      alert("Name required");
      return false;
    }
    let insertUrl = posturl + "/lms_admin/admin/update_section";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          sectionTitle: sectionTitle,
          sectionId: sectionId,
          courseId: courseId
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
        if (result.update) {
          Swal.fire({
            title: "Update",
            text: result.message,
            timer: 2000,
            showConfirmButton: false
          });
          this.setState({
            sectionTitle: ""
          });
          $("#addNewSection")[0].reset();
          $("#editSectionModal .close").click();
          this.getSections();
        } else {
          Swal.fire({
            title: "warning ",
            text: result.message,
            timer: 2000,
            showConfirmButton: false
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  getSections() {
    const courseId = this.props.match.params.id;
    this.$el = $(this.el);
    this.$el
      .DataTable()
      .destroy()
      .clear();
    let insertUrl = posturl + "/lms_admin/admin/get_sections";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { courseId: courseId }
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
          console.log(result);

          this.setState({
            courseSection: result
          });
          this.$el.DataTable({
            searching: false
          });
        } else {
          this.setState({
            courseSection: []
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getSection = sectionId => {
    this.setState({
      sectionId: sectionId
    });
    let insertUrl = posturl + "/lms_admin/admin/get_section";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          sectionId: sectionId
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
        if (result) {
          this.setState({
            editSectionTitle: result.sectionTitle
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  componentDidMount() {
    this.setState({
      courseId: this.props.match.params.id
    });
    // console.log(this.props.match.params.id);
    this.getSections();
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
                    <li class="breadcrumb-item active" aria-current="page">
                      Course Section
                    </li>
                  </ol>
                  <div class="btn-group mb-0">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm "
                      data-toggle="modal"
                      data-target="#createSectionModal"
                      aria-expanded="false"
                    >
                      Add New Section
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="card shadow">
                      {/* <div class="card-header">
                       <h2 class="mb-0">Data Table</h2>
                    </div> */}
                      <div class="card-body">
                        <div class="table-responsive">
                          <table
                            ref={el => (this.el = el)}
                            id="example"
                            class="table table-striped table-bordered w-100 text-nowrap"
                          >
                            <thead>
                              <tr>
                                <th class="wd-15p">Section Title</th>
                                <th class="wd-15p">Course Name</th>
                                <th class="wd-25p">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.courseSection.map((tit, index) => (
                                <tr key={index}>
                                  <td>{tit.sectionTitle}</td>
                                  <td>{tit.courseName}</td>
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
                                        {/* <a class="dropdown-item" href="#">
                                          <i class="fas fa-plus mr-2"></i>Add
                                          new Page
                                        </a>
                                        <a class="dropdown-item" href="#">
                                          <i class="fas fa-eye mr-2"></i>View
                                          the page Details
                                        </a> */}
                                        <a
                                          class="dropdown-item"
                                          data-toggle="modal"
                                          data-target="#editSectionModal"
                                          aria-expanded="false"
                                          onClick={() =>
                                            this.getSection(tit.sectionId)
                                          }
                                        >
                                          <i class="fas fa-edit mr-2"></i>Edit
                                        </a>
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
          id="createSectionModal"
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
                id="addNewSection"
                onSubmit={this.handleCreateSubmit}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLabel">
                    Add New Section
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
                          name="sectionTitle"
                          onChange={this.handleChange}
                          placeholder="Section Name"
                        />
                      </div>
                    </div>
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
        {/* edit section */}
        <div
          className="modal fade"
          id="editSectionModal"
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
                id="addNewSection"
                onSubmit={this.handleUpdateSubmit}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLabel">
                    Update Section
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
                          name="editSectionTitle"
                          onChange={this.handleChange}
                          placeholder="Section Name"
                          value={this.state.editSectionTitle}
                        />
                      </div>
                    </div>
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* end edit section */}
      </React.Fragment>
    );
  }
}

export default CourseSection;
