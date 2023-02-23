import React, { Component } from "react";
import { signUp } from "../../../actions/signUpAction.js";
import { connect } from "react-redux";
import MessagesAlrt from "../../widgets/messages/messagesAlrt";
const action = {
  signUp
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",

      password: "",
      email: ""
    };
  }
  setFocusToTextBox = () => {
    // document.getElementById("mytext").focus();
  };
  componentDidMount() {
    this.setFocusToTextBox();
  }
  handleOnsubmit = e => {
    e.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email
    };

    this.props.signUp(data);
  };
  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="category-header-area">
          <div className="container-lg">
            <div className="row">
              <div className="col">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <i className="fas fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Sign up</a>
                    </li>
                  </ol>
                </nav>
                <h1 className="category-name">Register yourself </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="category-course-list-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="user-dashboard-box mt-3">
                  <div className="user-dashboard-content w-100 register-form">
                    <div className="content-title-box">
                      <div className="title">Registration form</div>
                      <div className="subtitle">
                        Sign up and start learning.
                      </div>
                    </div>
                    <form onSubmit={this.handleOnsubmit} id="signUpId">
                      <div className="content-box">
                        <div className="basic-group">
                          <div className="form-group">
                            <label htmlFor="first_name">
                              <span className="input-field-icon">
                                <i className="fas fa-user"></i>
                              </span>{" "}
                              First name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              onChange={this.onChangeHandle}
                              id="first_name"
                              placeholder="First name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="last_name">
                              <span className="input-field-icon">
                                <i className="fas fa-user"></i>
                              </span>{" "}
                              Last name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              onChange={this.onChangeHandle}
                              id="last_name"
                              placeholder="Last name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="registration-email">
                              <span className="input-field-icon">
                                <i className="fas fa-envelope"></i>
                              </span>{" "}
                              Email:
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              onChange={this.onChangeHandle}
                              id="registration-email"
                              placeholder="Email"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="registration-password">
                              <span className="input-field-icon">
                                <i className="fas fa-lock"></i>
                              </span>{" "}
                              Password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              onChange={this.onChangeHandle}
                              id="registration-password"
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-update-box">
                        <button type="submit" className="btn">
                          Sign up
                        </button>
                      </div>
                      <div className="account-have text-center">
                        Already have an account? <a>Login</a>
                      </div>
                    </form>
                  </div>

                  <div className="user-dashboard-content w-100 forgot-password-form hidden">
                    <div className="content-title-box">
                      <div className="title">Forgot password</div>
                      <div className="subtitle">
                        Provide your email address to get password.
                      </div>
                    </div>
                    <form
                      action="http://demo.academy-lms.com/default/login/forgot_password/frontend"
                      method="post"
                    >
                      <div className="content-box">
                        <div className="basic-group">
                          <div className="form-group">
                            <label htmlFor="forgot-email">
                              <span className="input-field-icon">
                                <i className="fas fa-envelope"></i>
                              </span>{" "}
                              Email:
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="forgot-email"
                              placeholder="Email"
                              required
                            />
                            <small className="form-text text-muted">
                              Provide your email address to get password.
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="content-update-box">
                        <button type="submit" className="btn">
                          Reset password
                        </button>
                      </div>
                      <div className="forgot-pass text-center">
                        Want to go back? <a>Login</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MessagesAlrt />
        </section>
      </React.Fragment>
    );
  }
}
const mapToProps = state => {
  return {
    signUpArray: state.signUpReducer.signUpArray
  };
};

export default connect(mapToProps, action)(SignUp);
