import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";
import { Player } from "video-react";
import SimpleReactValidator from "simple-react-validator";
import { posturl, currency } from "../../../../configuration.js";
var that = "";

var HtmlToReactParser = require("html-to-react").Parser;
var htmlToReactParser = new HtmlToReactParser();
var dateFormat = require("dateformat");

export const RatingPrint = rating => {
  var ratingStar = [];
  var i = 0;
  for (i = 0; i < 5; i++) {
    if (i < rating.rating) {
      ratingStar.push(
        <i
          key={i}
          className="fas fa-star filled"
          style={{ color: "#f5c85b" }}
        ></i>
      );
    } else {
      ratingStar.push(
        <i key={i} className="fas fa-star" style={{ color: "#abb0bb" }}></i>
      );
    }
  }
  return ratingStar;
};
export const RatingPrintFull = rating => {
  var ratingStar = [];
  var i = 0;
  for (i = 0; i < 5; i++) {
    if (i < rating.rating) {
      ratingStar.push(
        <i
          key={i}
          className="fas fa-star filled"
          style={{ color: "#f5c85b" }}
        ></i>
      );
    } else {
      ratingStar.push(
        <i key={i} className="fas fa-star" style={{ color: "#abb0bb" }}></i>
      );
    }
  }
  return ratingStar;
};

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.validator = new SimpleReactValidator();
    this.state = {
      courseDetail: [],
      courseLessons: [],
      courseSection: [],
      courseRatings: [],
      courseInstructor: [],
      courseRelated: [],
      starBar: [],
      videoURL: "",
      notFound: false,
      course_id: ""
    };
  }
  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getCourseDetails(course_slug = "") {
    window.scrollTo(500, 0);
    var courseSlug = "";
    if (course_slug) {
      courseSlug = course_slug;
    } else {
      courseSlug = this.props.match.params.string;
    }
    var user_id = localStorage.getItem("user_id");
    // console.log(user_id)
    const insertUrl = posturl + "/lms_admin/course_details/";

    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { courseSlug: courseSlug, user_id: user_id }
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
        if (response.data) {
          this.setState({
            courseDetail: response.data,
            courseLessons: response.lessons,
            courseSection: response.sections,
            courseRatings: response.ratings,
            courseInstructor: response.instructor_details,
            courseRelated: response.other_realted_courses,
            starBar: response.starBar,
            notFound: false
          });
        } else {
          this.setState({
            notFound: true
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  showVideo = videoURL => {
    this.setState({
      videoURL: videoURL
    });
  };
  componentDidMount() {
    window.scrollTo(500, 0);
    this.getCourseDetails();
    $(document).ready(function() {
      $(".view-more").click(function() {
        var clickDiv = $(this).attr("target");
        console.log(clickDiv);
        if (clickDiv == "description") {
          $(".description-box").addClass("expanded");
          $(this).remove();
        } else if (clickDiv == "compare") {
          $(".compare-box").addClass("expanded");
          $(this).remove();
        } else if (clickDiv == "instructor") {
          $(".instructor-box").addClass("expanded");
          $(this).remove();
        }
      });
    });
    const script = document.createElement("script");

    script.src = "https://www.2checkout.com/checkout/api/2co.min.js";

    document.body.appendChild(script);
  }
  getEnrolled = course_id => {
    this.setState({
      course_id: course_id
    });
    $("#first_name").focus();
    // return false;
    // const insertUrl = posturl + "/lms_admin/get_enrolled/";
    // new Promise((resolve, reject) => {
    //   $.ajax({
    //     url: insertUrl,
    //     dataType: "json",
    //     type: "POST",
    //     data: { course_id: course_id }
    //   }).then(
    //     data => {
    //       resolve(data);
    //     },
    //     err => {
    //       reject(err);
    //     }
    //   );
    // })
    //   .then(response => {
    //     if (response.enroll) {
    //       alert("Enrolled");
    //     } else {
    //       alert("Already enrolled");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  };
  paymentSubmit = e => {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
    }
    var first_name = this.state.first_name;
    var last_name = this.state.last_name;
    var address = this.state.address;
    var city = this.state.city;
    var state = this.state.state;
    var zipCode = this.state.zipCode;
    var country = this.state.country;
    var email = this.state.email;
    var phone = this.state.phone;
    var course_price = this.state.courseDetail.price;
    // return false;
    var user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("You need to sign up first ");
      $("#payment .close").click();
      this.props.history.push("/login");
      return false;
    }

    var token = "";
    var payWithCard = data => {
      token = data.response.token.token;
      if (token) {
        var course_id = this.state.course_id;
        const insertUrl = posturl + "/lms_admin/get_enrolled/";

        new Promise((resolve, reject) => {
          $.ajax({
            url: insertUrl,
            dataType: "json",
            type: "POST",
            data: {
              first_name: first_name,
              last_name: last_name,
              address: address,
              city: city,
              state: state,
              zipCode: zipCode,
              country: country,
              email: email,
              phone: phone,
              user_id: user_id,
              course_id: course_id,
              course_price: course_price,
              token: token
            }
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
            if (response.enroll) {
              this.getCourseDetails();
              $("#payment .close").click();
              alert("Enrolled");
            } else {
              alert("Already enrolled");
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        alert("Something went wrong");
      }
    };
    var error = error => {
      console.log(error);
      return false;
    };
    var args = {
      sellerId: "901416345",
      publishableKey: "2270902A-D85C-47AC-A5BF-F2FB5397E325",
      ccNo: $("#ccNo").val(),
      cvv: $("#cvv").val(),
      expMonth: $("#expMonth").val(),
      expYear: $("#expYear").val()
    };

    window.TCO.loadPubKey("sandbox", () => {
      window.TCO.requestToken(payWithCard, error, args);
    });
  };

  render() {
    if (this.state.notFound == false) {
      return (
        <React.Fragment>
          <section className="course-header-area">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="course-header-wrap">
                    <h1 className="title">{this.state.courseDetail.title}</h1>
                    <p className="subtitle">
                      {this.state.courseDetail.short_description}
                    </p>
                    <div className="rating-row">
                      <span className="course-badge best-seller">
                        {this.state.courseDetail.level}
                      </span>
                      <RatingPrint
                        rating={this.state.courseDetail.average_ceil_rating}
                      />
                      <span className="d-inline-block average-rating">
                        {this.state.courseDetail.average_ceil_rating}
                      </span>
                      <span></span>
                      {/* <span className="enrolled-num">
                        1 Students enrolled          </span> */}
                    </div>
                    <div className="created-row">
                      {/* <span className="last-updated-date">Last updated Sat, 06-Jul-2019</span> */}
                      <span className="comment">
                        <i className="fas fa-comment"></i>
                        {this.state.courseDetail.language}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4"></div>
              </div>
            </div>
          </section>
          <section className="course-content-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {/* <div className="what-you-get-box">
                     <div className="what-you-get-title">What will i learn?</div>
                     <ul className="what-you-get__items">
                        <li>By the end of this course, you will have a basic & thorough understanding of HTML & CSS</li>
                        <li>Upon completion, you will have coded a handful of useful HTML & CSS examples</li>
                        <li>In the last section of this course, you focus on building a beautiful, semantic, HTML & CSS web page</li>
                        <li>By the end of this course, you will have impressed yourself, and will be able to hit the ground running with your newly acquired skillset</li>
                        <li>Start building beautiful websites</li>
                        <li>Build a portfolio website, so you can highlight your best web work</li>
                     </ul>
                  </div> */}
                  <br />
                  <div className="course-curriculum-box">
                    <div className="course-curriculum-title clearfix">
                      <div className="title float-left">
                        Curriculum for this course
                      </div>
                      <div className="float-right">
                        <span className="total-lectures">
                          {this.state.courseLessons.length} Lessons{" "}
                        </span>
                        {/* <span className="total-time">
                           01:24:28 Hours              </span> */}
                      </div>
                    </div>
                    <div className="course-curriculum-accordion">
                      <div className="lecture-group-wrapper">
                        {this.state.courseSection.map((tit, index) => (
                          <React.Fragment key={"sec-" + index}>
                            <div
                              className="lecture-group-title clearfix"
                              data-toggle="collapse"
                              data-target={"#" + index}
                              aria-expanded={index == 0 ? "true" : "false"}
                            >
                              <div className="title float-left">
                                {tit.title}
                              </div>
                              <div className="float-right">
                                {/* <span className="total-lectures">
                                 1 Lessons                  </span> */}
                              </div>
                            </div>
                            <div
                              id={index}
                              className={
                                index == 0
                                  ? "lecture-list collapse show"
                                  : "lecture-list collapse"
                              }
                            >
                              <ul>
                                {this.state.courseLessons.map((tit1, index) =>
                                  tit.id == tit1.section_id ? (
                                    <li
                                      key={"inner" + index}
                                      className="lecture has-preview"
                                    >
                                      <span className="lecture-title">
                                        {tit1.title}
                                      </span>
                                      {/* <span className="lecture-time float-right">00:09:51</span> */}
                                      <span className="lecture-preview float-right">
                                        Preview
                                      </span>
                                    </li>
                                  ) : null
                                )}
                              </ul>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="requirements-box">
                     <div className="requirements-title">Requirements</div>
                     <div className="requirements-content">
                        <ul className="requirements__list">
                           <li>Internet Connection</li>
                           <li>Willingness to Learn</li>
                           <li>A Text Editor (Free Resources Provided)</li>
                        </ul>
                     </div>
                  </div> */}
                  <div className="description-box view-more-parent">
                    <div className="view-more" target="description">
                      + View more
                    </div>
                    <div className="description-title">Description</div>
                    <div className="description-content-wrap">
                      <div className="description-content">
                        {htmlToReactParser.parse(
                          this.state.courseDetail.description
                        )}
                        {/* <h5 xss="removed">
                              <p xss="removed">HTML and CSS are the two most important languages for a new web developer to learn. They are also the easiest. If you’ve always wanted to build webpages, but were intimidated by the code, this course will help you learn your first two languages quickly and easily.</p>
                              <p xss="removed">Taking a step-by-step approach, this course will have you learning by doing, building several mini-websites from scratch.</p>
                           </h5>
                           <h4 xss="removed">Learn the Two Most Important Languages to Web Design Quickly and Easily.</h4>
                           <h5 xss="removed">
                              <ul xss="removed">
                                 <li>HTML Foundations</li>
                                 <li>Parent/Child Structure</li>
                                 <li>CSS Foundations</li>
                                 <li>ID Selectors</li>
                                 <li>Coding and Styling</li>
                                 <li>What Web Pages are Built Of</li>
                              </ul>
                              <p xss="removed">Every webpage that you see on the net is built using a language or code. There are many different programming languages that can make your website do various things, but the two most important to learn are HTML and CSS. In fact, even people who plan on allowing someone else to build their website should have a basic grasp of both languages. This way you can tweak things behind the scenes, or change some of your formatting without having to always rely on others.</p>
                           </h5>
                           <h4 xss="removed">Contents and Overview</h4>
                           <h5 xss="removed">
                              <p xss="removed">This course of more than 77 lectures and 8 hours of content gives you a basic, yet thorough understanding of both HTML and CSS. The course focuses on having you begin writing code right away so you can learn through doing, and build your own completely functional HTML and CSS webpage at the end.</p>
                              <p xss="removed">You’ll begin by learning what HTML and CSS are, so you can get an understanding of what it is that they do. During the course you’ll build several mini-websites that take what it is that you’ve learned and apply it to real world exercises to help cement the skills.</p>
                              <p xss="removed">Everyone from aspiring web designers to bloggers, programmers to business owners can benefit from learning some HTML and CSS. Learn to begin building your own dynamic webpages or manage the page that you already have. If you plan on becoming a web programmer or a web designer yourself, HTML and CSS are the first two languages you’ll need to succeed. In fact HTML is required for anyone that wants to get into web development from any angle. Learning it simultaneously with CSS allows you to hit the ground running with page design.</p>
                           </h5> */}
                      </div>
                    </div>
                  </div>
                  {this.state.courseRelated.length > 1 ? (
                    <div className="compare-box view-more-parent">
                      <div className="view-more" target="compare">
                        + View more
                      </div>

                      <div className="compare-title">Other related courses</div>
                      <div className="compare-courses-wrap">
                        {this.state.courseRelated.map((tit, index) =>
                          this.state.courseDetail.id != tit.id &&
                          tit.status == "active" ? (
                            <div
                              key={"rel-" + index}
                              className="course-comparism-item-container this-course"
                            >
                              <Link
                                onClick={() =>
                                  this.getCourseDetails(tit.course_slug)
                                }
                                to={"/course/" + tit.course_slug}
                              >
                                <div className="course-comparism-item clearfix">
                                  <div className="item-title float-left">
                                    <div className="title">{tit.title}</div>
                                    <div className="updated-time">
                                      Updated Tue, 06-Aug-2019
                                    </div>
                                  </div>
                                  <div className="item-details float-left">
                                    <span className="item-rating">
                                      {tit.short_description}
                                    </span>
                                    <span className="item-price">
                                      <span className="current-price">
                                        {currency + " " + tit.price}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  ) : null}
                  {/* <div className="about-instructor-box">
                     <div className="about-instructor-title">
                        About the instructor    
                     </div>
                     <div className="row">
                        <div className="col-lg-4">
                           <div className="about-instructor-image">
                              <img src="/assets/uploads/user_image/1.jpg" alt="" className="img-fluid" />
                              <ul>
                                 <li><i className="fas fa-comment"></i><b>
                                    5            </b> Reviews
                                 </li>
                                 <li><i className="fas fa-user"></i><b>
                                    3            </b> Students
                                 </li>
                                 <li><i className="fas fa-play-circle"></i><b>
                                    11            </b> Courses
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-lg-8">
                           <div className="about-instructor-details view-more-parent">
                              <div className="view-more" target="instructor">+ View more</div>
                              <div className="instructor-name">
                                 <a href="../../instructor_page/1.html">{this.state.courseInstructor.first_name + " "+ this.state.courseInstructor.last_name}</a>
                              </div>
                              <div className="instructor-title">
                                 {this.state.courseInstructor.title}
                              </div>
                              <div className="instructor-bio">
                                 {this.state.courseInstructor.biography}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                   */}
                  <div className="student-feedback-box">
                    <div className="student-feedback-title">
                      Student feedback
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="average-rating">
                          <div className="num">
                            {this.state.courseDetail.average_ceil_rating}
                          </div>
                          <div className="rating">
                            <RatingPrint
                              rating={
                                this.state.courseDetail.average_ceil_rating
                              }
                            />
                            {/* <i className="fas fa-star" style={{color: '#abb0bb' }}></i>
                                 <i className="fas fa-star" style={{color: '#abb0bb' }}></i>
                                 <i className="fas fa-star" style={{color: '#abb0bb' }}></i>
                                 <i className="fas fa-star" style={{color: '#abb0bb' }}></i>
                                 <i className="fas fa-star" style={{color: '#abb0bb' }}></i> */}
                          </div>
                          <div className="title">Average rating</div>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="individual-rating">
                          <ul>
                            {this.state.starBar.map((star, index) => (
                              <li>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    style={{ width: star + "%" }}
                                  ></div>
                                </div>
                                <div>
                                  <span className="rating">
                                    {index == 0 ? (
                                      <React.Fragment>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star filled"></i>
                                      </React.Fragment>
                                    ) : index == 1 ? (
                                      <React.Fragment>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                      </React.Fragment>
                                    ) : index == 2 ? (
                                      <React.Fragment>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                      </React.Fragment>
                                    ) : index == 3 ? (
                                      <React.Fragment>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                        <i className="fas fa-star filled"></i>
                                      </React.Fragment>
                                    )}
                                  </span>
                                  <span>{star + "%"}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="reviews">
                      <div className="reviews-title">Reviews</div>
                      <ul>
                        {this.state.courseRatings.map((tit, index) => (
                          <li key={"rating-" + index}>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="reviewer-details clearfix">
                                  <div className="reviewer-img float-left">
                                    <img src={tit.userImage} alt="" />
                                  </div>
                                  <div className="review-time">
                                    <div className="time">{tit.date_add}</div>
                                    <div className="reviewer-name">
                                      {tit.userName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-8">
                                <div className="review-details">
                                  <div className="rating">
                                    <RatingPrint rating={tit.rating} />
                                  </div>
                                  <div className="review-text">
                                    {tit.review}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="course-sidebar natural">
                    <div className="preview-video-box">
                      <a
                        data-toggle="modal"
                        onClick={() =>
                          this.showVideo(this.state.courseDetail.video_url)
                        }
                        data-target="#CoursePreviewModal"
                      >
                        <img
                          src={this.state.courseDetail.courseImage}
                          alt=""
                          className="img-fluid"
                        />
                        <span className="preview-text">
                          Preview this course
                        </span>
                        <span className="play-btn"></span>
                      </a>
                    </div>
                    <div className="course-sidebar-text-box">
                      <div className="price">
                        <span className="current-price">
                          <span className="current-price">
                            {currency + " " + this.state.courseDetail.price}
                          </span>
                        </span>
                      </div>
                      {this.state.courseDetail.is_purchased ? (
                        <div className="buy-btns">
                          <Link to="/my_courses" className="btn btn-buy-now">
                            My Courses
                          </Link>
                        </div>
                      ) : (
                        <div className="buy-btns">
                          <a
                            data-toggle="modal"
                            data-target="#payment"
                            onClick={() =>
                              this.getEnrolled(this.state.courseDetail.id)
                            }
                            className="btn btn-buy-now"
                          >
                            Get enrolled
                          </a>
                        </div>
                      )}
                      <div className="includes">
                        {/* <div className="title"><b>Includes:</b></div>
                           <ul>
                              <li><i className="far fa-file-video"></i>
                                 01:24:28 Hours On demand videos          
                              </li>
                              <li><i className="far fa-file"></i>8 Lessons</li>
                              <li><i className="far fa-compass"></i>Full lifetime access</li>
                              <li><i className="fas fa-mobile-alt"></i>Access on mobile and tv</li>
                           </ul> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* model  */}
          <div
            className="modal fade"
            id="CoursePreviewModal"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content course-preview-modal">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <span>Course preview:</span>
                    {this.state.courseDetail.title}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="course-preview-video-wrap">
                    <div className=" embed-responsive-16by9">
                      <div className="plyr__video-embed" id="player">
                        <iframe
                          height="500"
                          src={posturl + "/lms_admin/" + this.state.videoURL}
                          allowFullScreen
                          allowtransparency="true"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* payment */}
          <div
            className="modal fade"
            id="payment"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <form id="myCCForm" onSubmit={this.paymentSubmit}>
                <input id="token" name="token" type="hidden" value="" />
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Enrollement Info
                    </h5>
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
                          <label
                            htmlFor="first_name"
                            className="col-form-label"
                          >
                            First Name:
                          </label>
                          <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            autoFocus
                            className="form-control"
                            onChange={this.onChangeHandle}
                          />
                          {this.validator.message(
                            "first_name",
                            this.state.first_name,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="last_name" className="col-form-label">
                            Last Name:
                          </label>
                          <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "last_name",
                            this.state.last_name,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="address" className="col-form-label">
                            Address:
                          </label>
                          <input
                            id="address"
                            type="text"
                            name="address"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "address",
                            this.state.address,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="city" className="col-form-label">
                            City:
                          </label>
                          <input
                            id="city"
                            type="text"
                            name="city"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "city",
                            this.state.city,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="state" className="col-form-label">
                            State:
                          </label>
                          <input
                            id="state"
                            type="text"
                            name="state"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "state",
                            this.state.state,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="zipCode" className="col-form-label">
                            ZipCode:
                          </label>
                          <input
                            id="zipCode"
                            type="text"
                            name="zipCode"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "zipCode",
                            this.state.zipCode,
                            "required"
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="country" className="col-form-label">
                            Country:
                          </label>
                          <input
                            id="country"
                            type="text"
                            name="country"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "country",
                            this.state.country,
                            "required"
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email" className="col-form-label">
                            Email:
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "email",
                            this.state.email,
                            "required|email"
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone" className="col-form-label">
                            Phone:
                          </label>
                          <input
                            id="phone"
                            type="text"
                            name="phone"
                            onChange={this.onChangeHandle}
                            className="form-control"
                          />
                          {this.validator.message(
                            "phone",
                            this.state.phone,
                            "required|numeric"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="ccNo" className="col-form-label">
                            Card Number:
                          </label>
                          <input
                            id="ccNo"
                            type="text"
                            size="20"
                            autoComplete="off"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="expMonth" className="col-form-label">
                            Expiry Month:
                          </label>
                          <input
                            type="text"
                            size="2"
                            length="2"
                            className="form-control"
                            id="expMonth"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="expMonth" className="col-form-label">
                            Expiry Year:
                          </label>
                          <input
                            type="text"
                            size="2"
                            length="4"
                            className="form-control"
                            id="expYear"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="cvc" className="col-form-label">
                            CVC:
                          </label>
                          <input
                            type="text"
                            size="4"
                            length="4"
                            className="form-control"
                            id="cvv"
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
                      Get Enrolled
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default CourseDetails;
