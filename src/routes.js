import React, { Component } from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  withRouter,
  Redirect
} from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import PublicIndex from "./components/publicComponents/pages/home/home";
import signUp from "./components/auth/signUp/SignUp.js";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/adminComponents/pages/Dashboard/dashboard";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import RequireAuth from "./requireAuth.js";
import AuthNotRequire from "./authNotRequire.js";
import { connect } from "react-redux";
import Profile from "./components/publicComponents/pages/profile";
import CourseDetails from "./components/publicComponents/pages/courses/course_details";
import Categories from "./components/adminComponents/pages/categories";
import Courses from "./components/adminComponents/pages/course/courses";
import CreateCourse from "./components/adminComponents/pages/course/create_course";
import CourseSection from "./components/adminComponents/pages/course/section_course";
import CourseLesson from "./components/adminComponents/pages/course/course_lesson";
import MyCourses from "./components/publicComponents/pages/students/my_courses";
import PublicCourses from "./components/publicComponents/pages/courses/public_courses";
import CourseLessons from "./components/publicComponents/pages/students/course_lessons";
import SearchResult from "./components/publicComponents/pages/courses/search_result";
import SingleCategoryCourse from "./components/publicComponents/pages/courses/single_category_course";
export class Routes extends Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props);
    const url = window.location.pathname;
    if (this.props.view_type == false) {
      return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                exact
                path="/"
                component={RequireAuth(() => (
                  <Redirect to="/admin/dashboard" />
                ))}
              />
              <Route
                path="/admin/dashboard"
                exact
                component={RequireAuth(Dashboard)}
              />
              <Route path="/admin/dashboard" exact component={Dashboard} />
              <Route path="/admin/categories" exact component={Categories} />
              <Route path="/admin/courses" exact component={Courses} />
              <Route
                path="/admin/create_course"
                exact
                component={CreateCourse}
              />
              <Route
                path="/admin/section/:id"
                exact
                component={CourseSection}
              />
              <Route path="/admin/lessons/:id" exact component={CourseLesson} />
            </Switch>
          </Layout>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                exact
                path="/home"
                component={RequireAuth(() => (
                  <div>Hello</div>
                ))}
              />
              <Route path="/" exact component={PublicIndex} />
              <Route path="/profile" exact component={Profile} />
              <Route
                layoutType={this.props.viewType}
                path="/register"
                exact
                component={signUp}
              />
              <Route
                layoutType={this.props.viewType}
                path="/course/:string"
                exact
                component={CourseDetails}
              />
              <Route
                layoutType={this.props.viewType}
                path="/lessons/:string"
                exact
                component={CourseLessons}
              />
              <Route
                layoutType={this.props.viewType}
                path="/my_courses"
                exact
                component={MyCourses}
              />
              <Route
                layoutType={this.props.viewType}
                path="/login"
                exact
                component={Login}
              />
              <Route
                layoutType={this.props.viewType}
                path="/reset-password"
                exact
                component={ResetPassword}
              />
              <Route
                layoutType={this.props.viewType}
                path="/courses"
                exact
                component={PublicCourses}
              />
              <Route
                layoutType={this.props.viewType}
                path="/courses/:string"
                exact
                component={SingleCategoryCourse}
              />
              <Route
                layoutType={this.props.viewType}
                path="/search/:string"
                exact
                component={SearchResult}
              />

              <Route path="*" exact={true} component={signUp} />
            </Switch>
          </Layout>
        </BrowserRouter>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    view_type: state.hocReducer.view_type
  };
};
export default withRouter(connect(mapStateToProps, null)(Routes));
