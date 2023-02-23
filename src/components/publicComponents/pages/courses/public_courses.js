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
      ratingStar.push(<i class="fas fa-star filled"></i>);
    } else {
      ratingStar.push(<i class="fas fa-star"></i>);
    }
  }
  return ratingStar;
};

class PublicCourses extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    that = this;
    this.state = {
      baseUrl: finalurl,
      courses: [],
      tempCourses: [],
      categories: [],
      sub_categories: [],
      total_lenght: "",
      hasMore: true,
      start: 0,
      limit: 3
    };
    //  this.getCourses();
  }
  get_menu_categories() {
    const insertUrl = posturl + "/lms_admin/get_menu_categories";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
      }).then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    })
      .then(response => {
        if (response) {
          this.setState({
            categories: response.categories,
            sub_categories: response.sub_categories
          });
        } else {
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  getCourses() {
    var start = this.state.start;
    var limit = this.state.limit;

    let insertUrl = posturl + "/lms_admin/get_load_more_course";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { limit: limit, start: start }
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
          console.log(this.state.categoryFilter);
          if (result.length == 0) {
            this.setState({ hasMore: false });
            return;
          }
          if (this.state.categoryFilter) {
            let usersOnline = result.filter(course => {
              if (this.state.categoryFilter == course.sub_category_id) {
                return course;
              }
            });
            this.setState({
              // courses: result
              courses: this.state.courses.concat(usersOnline),
              tempCourses: this.state.tempCourses.concat(result)
            });
            return;
          }

          this.setState({
            total_lenght: result.length
          });

          this.setState({
            // courses: result
            courses: this.state.courses.concat(result),
            tempCourses: this.state.tempCourses.concat(result)
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
    this.get_menu_categories();
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
  render() {
    console.log(this.props);
    var settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      swipe: false,
      touchMove: false,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    var ratingCount = 5;

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
                      <a href="#">Courses</a>
                    </li>
                    <li class="breadcrumb-item active">All Categories</li>
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
              <div class="col-lg-3 filter-area">
                <div class="card">
                  <a href="javascript::" style={{ color: "unset" }}>
                    <div
                      class="card-header filter-card-header"
                      id="headingOne"
                      data-toggle="collapse"
                      data-target="#collapseFilter"
                      aria-expanded="true"
                      aria-controls="collapseFilter"
                    >
                      <h6 class="mb-0">
                        Filter
                        <i
                          class="fas fa-sliders-h"
                          style={{ float: "right" }}
                        ></i>
                      </h6>
                    </div>
                  </a>
                  <div
                    id="collapseFilter"
                    class="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div class="card-body pt-0">
                      <div class="filter_type">
                        <h6>Categories</h6>
                        <ul>
                          <span class="parent-category">All Categories</span>
                          <li class="ml-2">
                            <div class="">
                              <input
                                type="radio"
                                id="category_all"
                                name="sub_category"
                                class="categories custom-radio"
                                value="all"
                                onClick={this.filter}
                                defaultChecked
                              />
                              <label for="category_all">All Categories</label>
                            </div>
                          </li>
                          {this.state.categories.map((tit, index) => (
                            <React.Fragment>
                              <span class="parent-category">{tit.name}</span>
                              {this.state.sub_categories.map(item =>
                                item.map((tit1, index1) =>
                                  tit.id == tit1.parent ? (
                                    <li class="ml-2">
                                      <div class="">
                                        <input
                                          type="radio"
                                          id={"sub_category-" + tit1.id}
                                          name="sub_category"
                                          class="categories custom-radio"
                                          value={tit1.id}
                                          onClick={this.filter}
                                        />
                                        <label
                                          htmlFor={"sub_category-" + tit1.id}
                                        >
                                          {tit1.name}
                                        </label>
                                      </div>
                                    </li>
                                  ) : null
                                )
                              )}
                            </React.Fragment>
                          ))}
                        </ul>
                        {/* <a href="javascript::" id = "city-toggle-btn" onclick="showToggle(this, 'hidden-categories')" style="font-size: 12px;"><?php echo $total_number_of_categories > $number_of_visible_categories ? get_phrase('show_more') : ""; ?></a> */}
                      </div>
                      {/* <hr /> */}
                      <div class="filter_type hide">
                        <div class="form-group">
                          <h6>Price</h6>
                          {/* <ul>
                                        <li>
                                            <div class="">
                                                <input type="radio" id="price_all" name="price" class="prices custom-radio" value="all" onclick="filter(this)" <?php if($selected_price == 'all') echo 'checked'; ?>>
                                                <label for="price_all"><?php echo get_phrase('all'); ?></label>
                                            </div>
                                            <div class="">
                                                <input type="radio" id="price_free" name="price" class="prices custom-radio" value="free" onclick="filter(this)" <?php if($selected_price == 'free') echo 'checked'; ?>>
                                                <label for="price_free"><?php echo get_phrase('free'); ?></label>
                                            </div>
                                            <div class="">
                                                <input type="radio" id="price_paid" name="price" class="prices custom-radio" value="paid" onclick="filter(this)" <?php if($selected_price == 'paid') echo 'checked'; ?>>
                                                <label for="price_paid"><?php echo get_phrase('paid'); ?></label>
                                            </div>
                                        </li>
                                    </ul> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-9">
                <div class="category-course-list">
                  <ul>
                    <InfiniteScroll
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
                    >
                      {this.state.courses.map((tit, index) => (
                        <li key={index}>
                          <div class="course-box-2">
                            <div class="course-image">
                              <Link to={"/course/" + tit.course_slug}>
                                <img
                                  src={tit.courseImage}
                                  alt=""
                                  class="img-fluid"
                                />
                              </Link>
                            </div>
                            <div class="course-details">
                              <Link
                                to={"/course/" + tit.course_slug}
                                class="course-title"
                              >
                                {tit.title}
                              </Link>
                              {/* <a
                              href="<?php echo site_url('home/instructor_page/'.$instructor_details['id']) ?>"
                              class="course-instructor"
                            >
                              <span class="instructor-name">Muhammad Adil</span>{" "}
                              -
                            </a> */}
                              <div class="course-subtitle">
                                {tit.short_description}
                              </div>
                              <div class="course-meta">
                                {/* <span class="">
                                <i class="fas fa-play-circle"></i>4 lessons
                              </span> */}
                                <span class="">
                                  <i class="far fa-clock"></i>
                                  {tit.date_add}
                                </span>
                                <span class="">
                                  <i class="fas fa-closed-captioning"></i>
                                  {tit.language}
                                </span>
                                <span class="">
                                  <i class="fa fa-level-up"></i>
                                  {tit.level}
                                </span>
                              </div>
                            </div>
                            <div class="course-price-rating">
                              <div class="course-price">
                                <span class="current-price">
                                  {currency + " " + tit.price}
                                </span>
                                {/* <span class="original-price">$ 200</span> */}
                              </div>
                              <div class="rating">
                                <RatingPrint rating={tit.average_ceil_rating} />
                                <span class="d-inline-block average-rating">
                                  {tit.average_ceil_rating}
                                </span>
                              </div>
                              {/* <div class="rating-number">3 rating</div> */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </InfiniteScroll>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default PublicCourses;
