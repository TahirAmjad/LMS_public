import React, { Component } from "react";
import { connect } from "react-redux";
import { sigIn } from "../../../actions/sigInAction.js";
import { resetpassord } from "../../../actions/resetPasswordAction.js";
import { change_view_type } from "../../../actions/hocActions.js";
// import { posturl } from "../../../configuration";
const action = {
  sigIn,
  resetpassord
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      lostpassword: false,
      token: "0",
      status: false
    };
  }
  componentWillMount() {
    // 
    // 
    if (localStorage.getItem("isAdmin")) {
      this.props.change_view_type(true, this.props.location.pathname);
      this.props.history.push("/admin/dashboard");
    } else if (localStorage.getItem("email")) {
      this.props.history.push("/");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth && this.props.auth == true) {
      if (localStorage.getItem("isAdmin")) {
        
        this.props.change_view_type(true, this.props.location.pathname);
        this.props.history.push("/admin/dashboard");
      } else if (localStorage.getItem("email")) {
        this.props.history.push("/");
      }
    }
    if (
      prevProps.authPublic !== this.props.authPublic &&
      this.props.authPublic == true
    ) {
      if (localStorage.getItem("email")) {
        this.props.history.push("/");
      }
    }
  }
  setFocusToTextBox = () => {
    // document.getElementById("mytext").focus();
  };
  componentDidMount() {
    this.setFocusToTextBox();
  }
  onchaneHanlde = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onhanldeSubmint = e => {
    e.preventDefault();
    if (this.state.lostpassword === false) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.sigIn(data);
      this.setState({
        status: true
      });
    } else {
      const data = {
        email: this.state.email,
        token: this.state.token
      };
      //  
      this.props.resetpassord(data);
    }
  };

  lostPassword = () => {
    this.setState({
      lostpassword: true
    });
  };
  lostPassword2 = () => {
    this.setState({
      lostPassword2: false
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
            <li className="breadcrumb-item"><a href="../home.html"><i className="fas fa-home"></i></a></li>
            <li className="breadcrumb-item">
              <a href="#">
              Login                            </a>
            </li>
          </ol>
        </nav>
        <h1 className="category-name">
        Registered user                </h1>
      </div>
    </div>
  </div>
</section>

<section className="category-course-list-area">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-9">
        <div className="user-dashboard-box mt-3">
          <div className="user-dashboard-content w-100 login-form">
            <div className="content-title-box">
              <div className="title">Login</div>
              <div className="subtitle">Provide your valid login credentials.</div>
            </div>
            <form onSubmit={this.onhanldeSubmint} method="post">
              <div className="content-box">
                <div className="basic-group">
                  <div className="form-group">
                    <label for="login-email"><span className="input-field-icon"><i className="fas fa-envelope"></i></span> Email:</label>
                    <input type="email" className="form-control" name = "email" onChange={this.onchaneHanlde} id="email" placeholder="Email"  required />
                  </div>
                  <div className="form-group">
                    <label for="login-password"><span className="input-field-icon"><i className="fas fa-lock"></i></span> Password:</label>
                    <input type="password" className="form-control" name = "password" onChange={this.onchaneHanlde} placeholder="Password"  required id="password" />
                  </div>
                </div>
              </div>
              <div className="content-update-box">
                <button type="submit" className="btn">Login</button>
              </div>


              
              {/* <style type="text/css">
                .btn-demo {
                  background-color: #77838f;
                  color: #fff;
                  border: 0px;
                  padding: 5px 13px;
                  font-weight: 500;
                  margin: 2px;
                  border-radius: 20px;
                }
              </style> */}
              {/* <script type="text/javascript">

                function admin_login() {
                  document.getElementById('email').value = 'admin@example.com';
                  document.getElementById('password').value = '1234';
                }
                function student_login() {
                  document.getElementById('email').value = 'student@example.com';
                  document.getElementById('password').value = '1234';
                }
                function instructor_login() {
                  document.getElementById('email').value = 'instructor@example.com';
                  document.getElementById('password').value = '1234';
                }

              </script> */}


              <div className="forgot-pass text-center">
                <span>or</span>
                <a href="#" >Forgot password</a>
              </div>
              <div className="account-have text-center">
                Do not have an account? <a >Sign up</a>
              </div>
            </form>
          </div>
          <div className="user-dashboard-content w-100 register-form hidden">
            <div className="content-title-box">
              <div className="title">Registration form</div>
              <div className="subtitle">Sign up and start learning.</div>
            </div>
            <form action="http://demo.academy-lms.com/default/login/register" method="post">
              <div className="content-box">
                <div className="basic-group">
                  <div className="form-group">
                    <label for="first_name"><span className="input-field-icon"><i className="fas fa-user"></i></span> First name:</label>
                    <input type="text" className="form-control" name = "first_name" id="first_name" placeholder="First name"  required />
                  </div>
                  <div className="form-group">
                    <label for="last_name"><span className="input-field-icon"><i className="fas fa-user"></i></span> Last name:</label>
                    <input type="text" className="form-control" name = "last_name" id="last_name" placeholder="Last name"  required />
                  </div>
                  <div className="form-group">
                    <label for="registration-email"><span className="input-field-icon"><i className="fas fa-envelope"></i></span> Email:</label>
                    <input type="email" className="form-control" name = "email" id="registration-email" placeholder="Email"  required />
                  </div>
                  <div className="form-group">
                    <label for="registration-password"><span className="input-field-icon"><i className="fas fa-lock"></i></span> Password:</label>
                    <input type="password" className="form-control" name = "password" id="registration-password" placeholder="Password"  required />
                  </div>
                </div>
              </div>
              <div className="content-update-box">
                <button type="submit" className="btn">Sign up</button>
              </div>
              <div className="account-have text-center">
                Already have an account? <a href="javascript::" onclick="toggoleForm('login')">Login</a>
              </div>
            </form>
          </div>

          <div className="user-dashboard-content w-100 forgot-password-form hidden">
            <div className="content-title-box">
              <div className="title">Forgot password</div>
              <div className="subtitle">Provide your email address to get password.</div>
            </div>
            <form action="http://demo.academy-lms.com/default/login/forgot_password/frontend" method="post">
              <div className="content-box">
                <div className="basic-group">
                  <div className="form-group">
                    <label for="forgot-email"><span className="input-field-icon"><i className="fas fa-envelope"></i></span> Email:</label>
                    <input type="email" className="form-control" name = "email" id="forgot-email" placeholder="Email"  required />
                    <small className="form-text text-muted">Provide your email address to get password.</small>
                  </div>
                </div>
              </div>
              <div className="content-update-box">
                <button type="submit" className="btn">Reset password</button>
              </div>
              <div className="forgot-pass text-center">
                Want to go back? <a href="javascript::" onclick="toggoleForm('login')">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </React.Fragment>
      );
  }
}

const mapToProps = state => {
  return {
    siginArray: state.signUpReducer.siginArray,
    auth: state.signUpReducer.auth,
    authPublic: state.signUpReducer.authPublic
  };
};

export default connect(
  mapToProps,
  { change_view_type, action, sigIn }
)(Login);
