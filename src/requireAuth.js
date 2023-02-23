import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default ComposedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        // const message = "Login Require";
        // this.props.messages(message);
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextprops) {
      if (!nextprops.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  RequireAuth.propTypes = {
    auth: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => {
    return {
      auth: state.signUpReducer.auth
    };
  };

  return connect(
    mapStateToProps,
    null
  )(RequireAuth);
};
