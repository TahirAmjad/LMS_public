import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { posturl } from "../../../../configuration.js";
import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../../adminHeader/headerTop.js";
import "../../../../innerAssets/backend/plugins/datatable/dataTables.bootstrap4.min.js";

import "../../../../innerAssets/backend/plugins/fileuploads/js/dropify.min.js";
import "../../../../innerAssets/backend/plugins/fileuploads/css/dropify.css";
// import "../../../innerAssets/backend/css/dashboard.css";

export class CourseLesson extends Component {
  constructor() {
    super();
    this.state = {
      courseLesson: [],
      courseSections: [],
      sectionTitle: "",
      editSectionTitle: "",
      courseId: "",
      sectionId: "",
      lessonTitle: "",
      lessonSection: "",
      lessonType: "",
      lessonProvider: "",
      lessonVideoUrl: "",
      lessonDuration: "",
      lessonSummary: "",
      lessonVideo: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getUrlDuration = this.getUrlDuration.bind(this);
    this.videoSelectedHandler = this.videoSelectedHandler.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  videoSelectedHandler = e => {
    this.setState({
      lessonVideo: [...this.state.lessonVideo, ...e.target.files]
    });

    console.log(e.target.files);
    var idd =
      '<video id="mytest" width="320" height="240" controls><source src="' +
      e.target.files[0].name +
      '"></video>';
    var myVid = idd;
    console.log(myVid.duration);
  };
  getUrlDuration = e => {
    this.setState({ [e.target.name]: e.target.value });
    // const { getVideoDurationInSeconds } = require("get-video-duration");
    // getVideoDurationInSeconds(
    //   "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    // ).then(duration => {
    //   console.log(duration);
    // });
    return false;
    let insertUrl = posturl + "/lms_admin/admin/get_url_duration";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          videoUrl: e.target.value
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
        } else {
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  handleCreateSubmit = e => {
    e.preventDefault();
    var lessonTitle = this.state.lessonTitle;
    var lessonSection = this.state.lessonSection;
    var lessonType = this.state.lessonType;
    var lessonProvider = this.state.lessonProvider;
    var lessonVideoUrl = this.state.lessonVideoUrl;
    var lessonSummary = this.state.lessonSummary;
    var courseId = this.state.courseId;
    var lessonVideo = this.state.lessonVideo;
    if (lessonTitle == "") {
      alert("Name required");
      return false;
    }
    var formData = new FormData();

    formData.append("lessonTitle", lessonTitle);
    formData.append("lessonSection", lessonSection);
    formData.append("lessonType", lessonType);
    formData.append("lessonProvider", lessonProvider);
    formData.append("lessonVideoUrl", lessonVideoUrl);
    formData.append("lessonSummary", lessonSummary);
    formData.append("courseId", courseId);
    formData.append("lessonVideo", lessonVideo[0]);

    let insertUrl = posturl + "/lms_admin/admin/create_lesson";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: formData
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
          $("#createLessonModal .close").click();
          this.getLessons();
        } else {
          Swal.fire({
            title: "warning ",
            text: result.message,
            timer: 2000,
            showConfirmButton: true
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
    $("#global-loader").addClass("preLoader");
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
          $("#global-loader").removeClass("preLoader");
          this.setState({
            lessonTitle: "",
            lessonSection: "",
            lessonType: "",
            lessonProvider: "",
            lessonVideoUrl: "",
            lessonDuration: "",
            lessonSummary: ""
          });
          Swal.fire({
            title: "Success ",
            text: result.message,
            timer: 2000,
            showConfirmButton: false
          });
          $("#addNewSection")[0].reset();
          $("#editLessonModal .close").click();
          this.getLessons();
        } else {
          $("#global-loader").removeClass("preLoader");
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

  getLessons() {
    const courseId = this.props.match.params.id;
    this.$el = $(this.el);
    this.$el
      .DataTable()
      .destroy()
      .clear();
    let insertUrl = posturl + "/lms_admin/admin/get_lessons";
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
            courseLesson: result
          });
          this.$el.DataTable({
            searching: false
          });
        } else {
          this.setState({
            courseLesson: []
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getSections() {
    const courseId = this.props.match.params.id;
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
            courseSections: result
          });
        } else {
          this.setState({
            courseSections: []
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
    this.getLessons();
    this.getSections();
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop a file here or click",
        replace: "Drag and drop or click to replace",
        remove: "Remove",
        error: "Ooops, something wrong appended."
      },
      error: {
        fileSize: "The file size is too big (2M max)."
      }
    });
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
                      Course Lesson
                    </li>
                  </ol>
                  <div class="btn-group mb-0">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm "
                      data-toggle="modal"
                      data-target="#createLessonModal"
                      aria-expanded="false"
                    >
                      Add New Lesson
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
                                <th class="wd-15p">Title</th>
                                <th class="wd-15p">Section</th>
                                <th class="wd-15p">Lesson Type</th>
                                <th class="wd-25p">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.courseLesson.map((tit, index) => (
                                <tr key={index}>
                                  <td>{tit.lessonTitle}</td>
                                  <td>{tit.lessonSectionId}</td>
                                  <td>{tit.lessonType}</td>
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
                                          data-target="#editLessonModal"
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
          id="createLessonModal"
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
                    Add New Lesson
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lessonTitle"
                          onChange={this.handleChange}
                          placeholder="Lesson Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Section</label>
                        <select
                          name="lessonSection"
                          id="select-countries"
                          class="form-control custom-select"
                          onChange={this.handleChange}
                        >
                          <option key="00" value="">
                            Select
                          </option>
                          {this.state.courseSections.map((tit, index) => (
                            <option key={index} value={tit.sectionId}>
                              {tit.sectionTitle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Lesson Type</label>
                        <select
                          name="lessonType"
                          id="select-countries"
                          class="form-control custom-select"
                          onChange={this.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="videoUrl">Video Url</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Lesson Provider</label>
                        <select
                          name="lessonProvider"
                          id="select-countries"
                          class="form-control custom-select"
                          onChange={this.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="HTML5">HTML5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Video Url</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lessonVideoUrl"
                          onChange={this.getUrlDuration}
                          placeholder="Lesson URL"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Duration</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lessonDuration"
                          onChange={this.handleChange}
                          placeholder="Lesson URL"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Summary</label>
                        <textarea
                          className="form-control"
                          name="lessonSummary"
                          onChange={this.handleChange}
                          placeholder="Lesson URL"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="card shadow">
                        <div class="card-header">
                          <h2 class="mb-0">Video</h2>
                        </div>
                        <div class="card-body">
                          <input
                            type="file"
                            name="lessonVideo"
                            onChange={this.videoSelectedHandler}
                            class="dropify"
                            accept="video/*"
                            data-height="300"
                          />
                        </div>
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
          id="editLessonModal"
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

export default CourseLesson;
