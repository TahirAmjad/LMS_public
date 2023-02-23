import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sigIn } from "../../../actions/sigInAction.js";
import { resetpassord } from "../../../actions/resetPasswordAction.js";
import { change_view_type } from "../../../actions/hocActions.js";
import { toastr } from "react-redux-toastr";
import MessagesAlrt from "../../widgets/messages/messagesAlrt";
import TCO from "2co-react";
import { SECRETKEY } from "../../../constant.js";
import $ from "jquery";
import { posturl } from "../../../configuration.js";
const Cryptr = require("cryptr");
const cryptr = new Cryptr(SECRETKEY);
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      biography: "",
      userData: "",
      last_name: "",
      password: "",
      new_password: "",
      confirm_password: "",
      phone: "",
      number: "",
      location: "",
      user_image: "",
      imageName: "",
      imageType: "",
      imageSize: "",
      selectFile: null,
      resetPass: false,
      status: false,
      tabValue: 1
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }
  //   notify = () => toast("Your Request Is Submited !");
  fileSelectedHandler = e => {
    this.setState({ user_image: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  uploadImage = file => {
    var reader = new FileReader();
    var data = "";
    reader.onload = function(e) {
      data = e.target.result;
      $(".avatar").attr("src", e.target.result);
    };
    reader.readAsDataURL(file);
    this.setState({
      imageName: file.name,
      imageSize: file.size,
      imageType: file.type,
      selectFile: file
    });
    console.log(data);
    data = new FormData();
    data.append("file", file);
    let insertUrl = posturl + "/listjeannie_backend/api/save_image";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        processData: false,
        contentType: false,
        data: data
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(userData => {
        if (userData.upload) {
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  get_profile_info = () => {
    // var temp = localStorage.getItem("userName");
    var user_email = localStorage.getItem("email");
    var user_id = localStorage.getItem("user_id");
    let insertUrl = posturl + "/lms_admin/get_profile_info";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { user_email: user_email, user_id: user_id }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(response => {
        // console.log(userData);
        if (response) {
          this.setState({
            userData: response,
            biography: response.biography,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  componentDidMount() {
    if (!localStorage.getItem("email")) {
      this.props.history.push("/login");
    } else {
      this.get_profile_info();
    }
  }
  onhanldeSubmint = e => {
    e.preventDefault();
    var tabValue = this.state.tabValue;

    var data = "";
    if (tabValue == 1) {
      if (
        $.trim(this.state.first_name) == "" ||
        $.trim(this.state.last_name) == "" ||
        $.trim(this.state.biography) == ""
      ) {
        toastr.warning("Warning !", "All Flieds Required!");
        return false;
      }

      data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        biography: this.state.biography,
        id: this.state.userData.id,
        tabValue: 1
      };
    } else if (tabValue == 2) {
      if (
        $.trim(this.state.password) == "" ||
        $.trim(this.state.new_password) == "" ||
        $.trim(this.state.confirm_password) == ""
      ) {
        toastr.warning("Warning !", "All Flieds Required!");
        return false;
      }
      if (
        $.trim(this.state.new_password) != $.trim(this.state.confirm_password)
      ) {
        toastr.warning("Warning !", "New and confirm password doesn't match!");
        return false;
      }

      data = {
        password: this.state.password,
        new_password: this.state.new_password,
        confirm_password: this.state.confirm_password,
        id: this.state.userData.id,
        tabValue: 2
      };
    } else {
      if (!this.state.user_image) {
        toastr.warning("Warning !", "Please select image!");
        return false;
      }
      data = {
        user_image: this.state.user_image,
        id: this.state.userData.id,
        tabValue: 3
      };
    }
    console.log(data);
    // return false;

    let insertUrl = posturl + "/lms_admin/save_profile_info";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: data
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(response => {
        console.log(response.update);
        if (response.update) {
          this.setState({
            userData: response.data
          });
          toastr.success("Success !", response.message);
        } else {
          toastr.error("Error !", response.message);
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  onhanldeSubmintPhoto = e => {
    e.preventDefault();
    var tabValue = this.state.tabValue;

    var data = "";
    if (!this.state.user_image) {
      toastr.warning("Warning !", "Please select image!");
      return false;
    }

    var formData = new FormData();

    formData.append("user_image", this.state.user_image);
    formData.append("id", this.state.userData.id);
    formData.append("tabValue", 3);

    console.log(data);
    // return false;

    let insertUrl = posturl + "/lms_admin/save_profile_info";
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
      .then(response => {
        console.log(response.update);
        if (response.update) {
          this.setState({
            userData: response.data
          });
          toastr.success("Success !", response.message);
        } else {
          toastr.error("Error !", response.message);
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };

  changeTab = para => {
    if (para == "info") {
      this.setState({
        tabValue: 1
      });
      $(".listInfo").addClass("active");
      $(".listAccount").removeClass("active");
      $(".listPhoto").removeClass("active");

      $(".infoTab").removeClass("hide");
      $(".accountTab").addClass("hide");
      $(".photoTab").addClass("hide");
    } else if (para == "account") {
      this.setState({
        tabValue: 2
      });
      $(".listInfo").removeClass("active");
      $(".listAccount").addClass("active");
      $(".listPhoto").removeClass("active");

      $(".infoTab").addClass("hide");
      $(".accountTab").removeClass("hide");
      $(".photoTab").addClass("hide");
    } else {
      this.setState({
        tabValue: 3
      });
      $(".listInfo").removeClass("active");
      $(".listAccount").removeClass("active");
      $(".listPhoto").addClass("active");

      $(".infoTab").addClass("hide");
      $(".accountTab").addClass("hide");
      $(".photoTab").removeClass("hide");
    }
  };

  render() {
    return (
      <React.Fragment>
        <section className="page-header-area my-course-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="page-title">Profile</h1>
                <ul>
                  <li>
                    <Link to="/my_courses">All Courses</Link>
                  </li>
                  <li className="active">
                    <Link to="/profile">User Profile </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="user-dashboard-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="user-dashboard-box">
                  <div className="user-dashboard-sidebar">
                    <div className="user-box">
                      {this.state.userData.imageFound == "yes" ? (
                        <img
                          src={
                            posturl +
                            "/lms_admin/uploads/user_image/" +
                            this.state.userData.user_image
                          }
                          alt="ad"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src="assets/uploads/user_image/placeholder.png"
                          alt="ad"
                          className="img-fluid"
                        />
                      )}
                      <div className="name">
                        <div className="name">
                          {this.state.userData.first_name +
                            " " +
                            this.state.userData.last_name}
                        </div>
                      </div>
                    </div>
                    <div className="user-dashboard-menu">
                      <ul>
                        <li className="active listInfo cursor_add">
                          <a onClick={() => this.changeTab("info")}>Profile</a>
                        </li>
                        <li className="listAccount cursor_add">
                          <a onClick={() => this.changeTab("account")}>
                            Account
                          </a>
                        </li>
                        <li className="listPhoto cursor_add">
                          <a onClick={() => this.changeTab("photo")}>Photo</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="user-dashboard-content infoTab">
                    <div className="content-title-box">
                      <div className="title">Profile</div>
                      <div className="subtitle">
                        Add information about yourself to share on your profile.
                      </div>
                    </div>
                    <form onSubmit={this.onhanldeSubmint}>
                      <div className="content-box">
                        <div className="basic-group">
                          <div className="form-group">
                            <label htmlFor="FristName">Basic:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              id="FristName"
                              onChange={this.onChangeHandle}
                              placeholder="First Name"
                              value={this.state.first_name}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              onChange={this.onChangeHandle}
                              placeholder="Last Name"
                              value={this.state.last_name}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="Biography1">Biography:</label>
                            <textarea
                              rows="3"
                              className="form-control "
                              onChange={this.onChangeHandle}
                              name="biography"
                              value={this.state.biography}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-update-box">
                        <button type="submit" className="btn">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="user-dashboard-content accountTab hide">
                    <div className="content-title-box">
                      <div className="title">Account</div>
                      <div className="subtitle">
                        Edit Your Account Settings.
                      </div>
                    </div>
                    <form onSubmit={this.onhanldeSubmint}>
                      <div className="content-box">
                        <div className="email-group">
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder=""
                              value={this.state.email}
                            />
                          </div>
                        </div>
                        <div className="password-group">
                          <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                              type="password"
                              className="form-control"
                              id="current_password"
                              name="password"
                              placeholder="Enter Current Password"
                              onChange={this.onChangeHandle}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              name="new_password"
                              placeholder="Enter New Password"
                              onChange={this.onChangeHandle}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              name="confirm_password"
                              placeholder="Re Type Your Password"
                              onChange={this.onChangeHandle}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-update-box">
                        <button type="submit" className="btn">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="user-dashboard-content photoTab hide">
                    <div className="content-title-box">
                      <div className="title">Photo</div>
                      <div className="subtitle">Update Your Photo.</div>
                    </div>
                    <form onSubmit={this.onhanldeSubmintPhoto}>
                      <div className="content-box">
                        <div className="email-group">
                          <div className="form-group">
                            <label htmlFor="user_image">Upload Image:</label>
                            <input
                              type="file"
                              className="form-control"
                              // name="user_image"
                              onChange={this.fileSelectedHandler}
                              id="user_image"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-update-box">
                        <button type="submit" className="btn">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <MessagesAlrt />
      </React.Fragment>
    );
  }
}

export default Profile;
