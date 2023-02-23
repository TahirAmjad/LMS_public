import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-slick";
import { posturl, currency } from "../../../../configuration.js";
import { checkPropTypes } from "prop-types";
import slugify from "react-slugify";
import InfiniteScroll from "react-infinite-scroll-component";

var that = "";
export const RatingPrint = rating => {
  var ratingStar = [];
  var i = 0;
  for (i = 0; i < 5; i++) {
    if (i < rating.rating) {
      ratingStar.push(<i key={i} className="fas fa-star filled"></i>);
    } else {
      ratingStar.push(<i key={i} className="fas fa-star"></i>);
    }
  }
  return ratingStar;
};

class SingleCategoryCourse extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    that = this;
    this.state = {
      baseUrl: finalurl,
      courses: [],
      tempCourses: [],
      total_lenght: "",
      hasMore: true,
      start: 0,
      limit: 3
    };
    //  this.getCourses();
  }
  getCourses() {
    var searchKey = this.props.match.params.string;
    var limit = this.state.limit;

    let insertUrl = posturl + "/lms_admin/category_courses";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { searchKey: searchKey }
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
            // courses: result
            courses: result,
            tempCourses: result
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
  componentWillMount() {
    console.log(posturl);
    this.getCourses();
  }
  fetchMoreData = () => {
    this.setState({
      start: this.state.start + 3
      // hasMore: true
    });

    setTimeout(() => {
      this.getCourses();
    }, 500);
  };
  filter = () => {
    var slectedCategory = "";
    $(".categories:checked").each(function() {
      slectedCategory = $(this).attr("value");
      that.setState({
        categoryFilter: slectedCategory
      });
    });
    if (slectedCategory == "all") {
      this.setState({
        courses: this.state.tempCourses
      });
    } else {
      let usersOnline = this.state.tempCourses.filter(course => {
        if (slectedCategory == course.sub_category_id) {
          return course;
        }
      });
      if (usersOnline.length == 0) {
        this.setState({
          courses: usersOnline
        });

        this.fetchMoreData();
        return;
      }

      this.setState({
        courses: usersOnline
        // hasMore: false
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.string != this.props.match.params.string &&
      this.props.match.params.string != ""
    ) {
      this.getCourses();
    }
  }
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
                      <Link to="/">
                        <i className="fas fa-home"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Category</a>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.string}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="category-course-list-area">
          <div className="container">
            <div className="category-filter-box filter-box clearfix">
              <span>Showing On This Page : {this.state.courses.length}</span>
              {/* <a href="javascript::" onclick="toggleLayout('grid')" style="float: right; font-size: 19px; margin-left: 5px;"><i className="fas fa-th"></i></a>
            <a href="javascript::" onclick="toggleLayout('list')" style="float: right; font-size: 19px;"><i className="fas fa-th-list"></i></a>
            <a href="<?php echo site_url('home/courses'); ?>" style="float: right; font-size: 19px; margin-right: 5px;"><i className="fas fa-sync-alt"></i></a> */}
            </div>
            <div className="row">
              {/* <InfiniteScroll
                dataLength={this.state.courses.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              > */}
              {this.state.courses.map((tit, index) => (
                <div key={"search-" + index} className="col-md-4 col-lg-4">
                  <div className="course-box-wrap">
                    <Link to={"/course/" + tit.course_slug}>
                      <div className="course-box">
                        <div className="course-image">
                          <img
                            src={tit.courseImage}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="course-details">
                          <h5 className="title">{tit.title}</h5>
                          <p className="instructors">{tit.short_description}</p>
                          <div className="rating">
                            <RatingPrint rating={tit.average_ceil_rating} />
                            <span className="d-inline-block average-rating">
                              {tit.average_ceil_rating}
                            </span>
                          </div>

                          <p className="price text-right">
                            <small>23</small>32
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
              {/* </InfiniteScroll> */}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default SingleCategoryCourse;
