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
      ratingStar.push(<i key={i} class="fas fa-star filled"></i>);
    } else {
      ratingStar.push(<i key={i} class="fas fa-star"></i>);
    }
  }
  return ratingStar;
};

class SearchResult extends Component {
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

    let insertUrl = posturl + "/lms_admin/search";
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
        <section class="category-header-area">
          <div class="container-lg">
            <div class="row">
              <div class="col">
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Link to="/">
                        <i class="fas fa-home"></i>
                      </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Search Result</a>
                    </li>
                    <li class="breadcrumb-item active">
                      {this.props.match.params.string}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section class="category-course-list-area">
          <div class="container">
            <div class="category-filter-box filter-box clearfix">
              <span>Showing On This Page : {this.state.courses.length}</span>
              {/* <a href="javascript::" onclick="toggleLayout('grid')" style="float: right; font-size: 19px; margin-left: 5px;"><i class="fas fa-th"></i></a>
            <a href="javascript::" onclick="toggleLayout('list')" style="float: right; font-size: 19px;"><i class="fas fa-th-list"></i></a>
            <a href="<?php echo site_url('home/courses'); ?>" style="float: right; font-size: 19px; margin-right: 5px;"><i class="fas fa-sync-alt"></i></a> */}
            </div>
            <div class="row">
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
                <div key={"search-" + index} class="col-md-4 col-lg-4">
                  <div class="course-box-wrap">
                    <Link to={"/course/" + tit.course_slug}>
                      <div class="course-box">
                        <div class="course-image">
                          <img src={tit.courseImage} alt="" class="img-fluid" />
                        </div>
                        <div class="course-details">
                          <h5 class="title">{tit.title}</h5>
                          <p class="instructors">{tit.short_description}</p>
                          <div class="rating">
                            <RatingPrint rating={tit.average_ceil_rating} />
                            <span class="d-inline-block average-rating">
                              {tit.average_ceil_rating}
                            </span>
                          </div>

                          <p class="price text-right">
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
export default SearchResult;
