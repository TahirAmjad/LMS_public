import React, { Component } from "react";
import { Link } from "react-router-dom";
import { posturl, currency } from "../../../../configuration.js";
import $ from "jquery";
export const RatingPrint = rating => {
  var ratingStar = [];
  var i = 0;
  for (i = 0; i < 5; i++) {
    if (i < rating.rating) {
      ratingStar.push(<i className="fas fa-star filled"></i>);
    } else {
      ratingStar.push(<i className="fas fa-star"></i>);
    }
  }
  return ratingStar;
};
class MyCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseDetails: [],
      courseCategories: [],
      notFound: false,
      model_course_image: "",
      model_course_instructor: "",
      model_course_title: "",
      model_course_id: ""
    };
  }
  getCourseDetails() {
    var user_id = localStorage.getItem("user_id");
    const insertUrl = posturl + "/lms_admin/my_courses/";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { user_id: user_id }
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
            courseDetails: response.my_courses,
            courseCategories: response.categories,
            // courseSection: response.sections,
            // courseRatings: response.ratings,
            // courseInstructor: response.instructor_details,
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
  componentDidMount() {
    window.scrollTo(500, 0);
    this.getCourseDetails();
  }
  getCourseDetailsForRatingModal = (
    course_id,
    title,
    courseImage,
    instructor
  ) => {
    console.log(course_id);
    this.setState({
      model_course_image: courseImage,
      model_course_instructor: instructor,
      model_course_title: title,
      model_course_id: course_id
    });
    $(".modelStep").text("Step 1 of 2");
    $(".modelRating").removeClass("hide");
    $("#step1").removeClass("hide");
    $(".modelReviews").addClass("hide");
    $("#step2").addClass("hide");
    $("#submitRating").addClass("hide");
  };
  nextPrevious = data => {
    $(".modelStep").text("Step " + data + " of 2");
    if (data == 2) {
      $(".modelRating").addClass("hide");
      $("#step1").addClass("hide");
      $(".modelReviews").removeClass("hide");
      $("#step2").removeClass("hide");
      $("#submitRating").removeClass("hide");
    } else {
      $(".modelRating").removeClass("hide");
      $("#step1").removeClass("hide");
      $(".modelReviews").addClass("hide");
      $("#step2").addClass("hide");
      $("#submitRating").addClass("hide");
    }
  };
  submitReviewRating = () => {
    var rating_star = $("input[name='rating']:checked").val();
    var review_of_a_course = $("#review_of_a_course").val();
    var course_id = this.state.model_course_id;
    var user_id = localStorage.getItem("user_id");
    const insertUrl = posturl + "/lms_admin/rating_and_reviews/";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          user_id: user_id,
          course_id: course_id,
          rating_star: rating_star,
          review_of_a_course: review_of_a_course
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
        if (response.rating) {
          $("#EditRatingModal  .close").click();
          const courseDetails = this.state.courseDetails.map(item => {
            if (item.id == course_id) {
              return {
                ...item,
                average_ceil_rating: rating_star
              };
            } else {
              return {
                ...item
              };
            }
          });
          console.log(courseDetails);
          this.setState({
            courseDetails
          });
          $("input[name='rating']:checked").val("");
          $("#review_of_a_course").val("");
        } else {
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <React.Fragment>
        <section className="page-header-area my-course-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="page-title">My Courses</h1>
                <ul>
                  <li className="active">
                    <a href="">All Courses</a>
                  </li>
                  <li>
                    <Link to="/profile">User Profile </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="my-courses-area">
          <div className="container">
            <div className="row no-gutters" id="my_courses_area">
              {this.state.courseDetails.map((tit, index) => (
                <div key={"outerr" + index} className="col-lg-3">
                  <div className="course-box-wrap">
                    <div className="course-box">
                      <Link to={"/lessons/" + tit.course_slug}>
                        <div className="course-image">
                          <img
                            src={tit.courseImage}
                            alt=""
                            className="img-fluid"
                          />
                          {/* <span className="play-btn"></span> */}
                        </div>
                      </Link>
                      <div className="course-details">
                        <a href="">
                          <h5 className="title">{tit.title}</h5>
                        </a>
                        <a href="">
                          <p className="instructors">{tit.instructor}</p>
                        </a>

                        <div
                          className="rating your-rating-box"
                          onClick={() =>
                            this.getCourseDetailsForRatingModal(
                              tit.id,
                              tit.title,
                              tit.courseImage,
                              tit.instructor
                            )
                          }
                          data-toggle="modal"
                          data-target="#EditRatingModal"
                        >
                          <RatingPrint rating={tit.average_ceil_rating} />
                          <p
                            className="your-rating-text"
                            id={tit.id}
                            onClick={() =>
                              this.getCourseDetailsForRatingModal(
                                tit.id,
                                tit.title,
                                tit.courseImage,
                                tit.instructor
                              )
                            }
                          >
                            <span className="your">Your </span>
                            <span className="edit"> Edit </span>
                            Rating
                          </p>
                        </div>
                      </div>
                      <div className="row" style={{ padding: "5px" }}>
                        <div className="col-md-6">
                          <Link
                            to={"/course/" + tit.course_slug}
                            className="btn"
                          >
                            Details
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link
                            to={"/course/lessons/" + tit.course_slug}
                            className="btn"
                          >
                            Start Lesson
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* model */}
        <div
          className="modal fade multi-step"
          id="EditRatingModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          reset-on-close="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content edit-rating-modal">
              <div className="modal-header">
                <h5 className="modal-title step-1 modelStep"></h5>
                <h5 className="m-progress-stats modal-title">
                  {/* &nbsp;of&nbsp;  */}
                  <span className="m-progress-total"></span>
                </h5>

                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="m-progress-bar-wrapper">
                <div className="m-progress-bar"></div>
              </div>
              <div className="modal-body step step-1">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 modelRating">
                      <div className="modal-rating-box">
                        <h4 className="rating-title">
                          How would you rate this course overall ?
                        </h4>
                        <fieldset className="your-rating">
                          <input
                            type="radio"
                            id="star5"
                            name="rating"
                            value="5"
                          />
                          <label className="full" htmlFor="star5"></label>

                          <input
                            type="radio"
                            id="star4"
                            name="rating"
                            value="4"
                          />
                          <label className="full" htmlFor="star4"></label>

                          <input
                            type="radio"
                            id="star3"
                            name="rating"
                            value="3"
                          />
                          <label className="full" htmlFor="star3"></label>

                          <input
                            type="radio"
                            id="star2"
                            name="rating"
                            value="2"
                          />
                          <label className="full" htmlFor="star2"></label>

                          <input
                            type="radio"
                            id="star1"
                            name="rating"
                            value="1"
                          />
                          <label className="full" htmlFor="star1"></label>
                        </fieldset>
                      </div>
                    </div>
                    <div className="col-md-6 modelReviews hide">
                      <div className="modal-rating-comment-box">
                        <h4 className="rating-title">Your Review</h4>
                        <textarea
                          id="review_of_a_course"
                          name="review_of_a_course"
                          placeholder=""
                          maxLength="65000"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="modal-course-preview-box">
                        <div className="card">
                          <img
                            className="card-img-top img-fluid"
                            src={this.state.model_course_image}
                            id="course_thumbnail_1"
                            alt=""
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              className="course_title_for_rating"
                              id="course_title_1"
                            >
                              {this.state.model_course_title}
                            </h5>
                            <p className="card-text" id="instructor_details">
                              {this.state.model_course_instructor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="hidden"
                name="course_id"
                id="course_id_for_rating"
                value=""
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary next step step-1"
                  data-step="1"
                  id="step1"
                  onClick={() => this.nextPrevious(2)}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="btn btn-primary previous step step-2 mr-auto hide"
                  data-step="2"
                  id="step2"
                  onClick={() => this.nextPrevious(1)}
                >
                  Previus
                </button>
                <button
                  type="button"
                  className="btn btn-primary publish step step-2 hide"
                  onClick={this.submitReviewRating}
                  id="submitRating"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end model */}
      </React.Fragment>
    );
  }
}

export default MyCourses;
