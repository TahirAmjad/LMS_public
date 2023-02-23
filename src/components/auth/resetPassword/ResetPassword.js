import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetpassordToConfirm,
  checkForTaoken
} from "../../../actions/resetPasswordAction.js";
import MessagesAlrt from "../../widgets/messages/messagesAlrt";
import { Redirect } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import login from "../login/Login";
const action = {
  resetpassordToConfirm,
  checkForTaoken,
  login
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Confirm: "",
      lostpassword: false,
      token: "1",
      url: window.location.pathname
    };
  }
  setFocusToTextBox = () => {
    /// document.getElementById("mytext").focus();
  };

  componentDidMount() {
    this.setFocusToTextBox();
    const url = window.location.pathname;
    const FinalUrl = url.split("~");

    const emailEncrpt = FinalUrl[1];
    console.log(emailEncrpt);

    this.props.checkForTaoken(emailEncrpt);
  }
  onchaneHanlde = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onhanldeSubmint = e => {
    const url = window.location.pathname;
    const FinalUrl = url.split("~");

    e.preventDefault();
    const { password, Confirm } = this.state;
    if (password !== Confirm) {
      toastr.error("Error", "Password Not Match");
    } else {
      const data = {
        password: this.state.password,
        password1: this.state.Confirm,
        emailEncrpt: FinalUrl[1],
        TimeEncrpt: FinalUrl[3],
        token: this.state.token
      };
      this.props.resetpassordToConfirm(data);

      console.log(data);
    }

    //this.props.resetpassord(data);
  };

  render() {
    console.log(this.props.ResetArray);
    return (
      <section class="section-body-content in-left">
        <div class="login-page-bg">
          <div class="container">
            {/* {this.props.ResetArray.status === true ? ( */}
            <div class="row">
              <div class="col-md-6 col-sm-6 hiddenContent-footer">
                <div class="heading-left">
                  <h1>
                    Features of Free
                    <br /> Account
                  </h1>
                </div>

                <div class="feature-listing">
                  <ul>
                    <li>
                      <b>Revenue:</b> Make easy money from home with our
                      services.
                    </li>
                    <li>
                      <b>Time Saving:</b> ListJeannie process isn’t time
                      consuming at all! Just sign up & enjoy.
                    </li>
                    <li>
                      <b>Hassle-free:</b> Sit back and let us handle business
                      for you.
                    </li>
                  </ul>
                  <div class="clearfix" />
                </div>
              </div>

              <div class="col-md-6 col-sm-6">
                <div class="float-right">
                  <div class="Right-heading">
                    <h2>Reset Password</h2>
                    {/* <p>
                   Profit awaits, sign up now and increase your profit
                   through our best and one of its kind online services!
                 </p> */}
                  </div>

                  <form action="#" method="#" onSubmit={this.onhanldeSubmint}>
                    <div class="login-form">
                      <input
                        type="password"
                        id="mytext"
                        className="w-100"
                        value={this.state.password}
                        name="password"
                        placeholder="NEW PASSWORD"
                        onChange={this.onchaneHanlde}
                        required
                      />

                      <input
                        type="password"
                        id=""
                        className="w-100"
                        value={this.state.Confirm}
                        name="Confirm"
                        placeholder="CONFIRM PASSWORD"
                        onChange={this.onchaneHanlde}
                        required
                      />

                      <button
                        type="submit"
                        className="hvr-sweep-to-bottom float-right"
                        value=""
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>

                  <div className="clearfix" />

                  <div class="signup-bottom">
                    <p>
                      By creating an account, I agree to List Jeannie
                      <br /> <a href="#">Website terms</a> and{" "}
                      <a href="#">Privacy policy.</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-6 visibleContent-footer hidden-Desktop">
                <div class="heading-left">
                  <h1>
                    Features of free
                    <br /> account
                  </h1>
                </div>

                <div class="feature-listing">
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisc ing elit
                    </li>
                    <li>
                      List-Jennie lorem ipsum sed do eiusmod
                      <br /> dunt ut labore et dolore magna aliqua.
                    </li>
                    <li>
                      Product on list-Jennie lorem ipsum sed do
                      <br /> tempor incididunt ut labore.
                    </li>
                    <li>
                      Take photo via list-Jennie lorem ipsum
                      <br /> doei usmod tempor magna aliqua.
                    </li>
                  </ul>
                  <div class="clearfix" />
                </div>
              </div>
            </div>

            {/* ) : (
              <Redirect to="/login" />
            )} */}
          </div>
        </div>
        <MessagesAlrt />
      </section>
    );
  }
}

const mapToProps = state => {
  return {
    ResetPasssArray: state.signUpReducer.ResetPasssArray,
    ResetArray: state.resetReducer.ResetArray
  };
};

export default connect(
  mapToProps,
  action
)(ResetPassword);
