import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";
import { posturl, currency } from "../../../../configuration.js";
import FileViewer from "react-file-viewer";
import Plyr from "plyr";
import QuizView from "./quiz_view.js";
var that = "";
var HtmlToReactParser = require("html-to-react").Parser;
var htmlToReactParser = new HtmlToReactParser();
var dateFormat = require("dateformat");
var player;
class CourseLessons extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      courseDetail: [],
      courseLessons: [],
      courseSection: [],
      courseRatings: [],
      courseInstructor: [],
      courseRelated: [],
      videoURL: "",
      notFound: false,
      showContent: false,
      showVideoPlayer: false,
      show_video_type: "",
      show_video_url: "",
      show_lesson_type: "",
      show_attachment: "",
      show_attachment_type: "",
      show_title: "",
      show_summary: "",
      showQuiz: false,
      quiz_les_id: ""
    };
  }
  getCourseDetails(course_slug = "") {
    window.scrollTo(500, 0);
    var courseSlug = "";
    if (course_slug) {
      courseSlug = course_slug;
    } else {
      courseSlug = this.props.match.params.string;
    }
    console.log(this.props);
    const insertUrl = posturl + "/lms_admin/course_lesson_details/";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { courseSlug: courseSlug }
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
  }

  showLessonContent = (
    title,
    video_type,
    video_url,
    lesson_type,
    attachment,
    les_id,
    fileExtension,
    summary
  ) => {
    that.setState({
      showContent: true,
      show_summary: summary
    });
    $("#video_player_area").removeClass("hide");
    // return false;
    // other case
    if (lesson_type == "other") {
      if (that.state.show_video_url) {
        player.destroy();
      }
      $(".videoSection").hide();
      $(".imageSection").show();
      $(".quizSection").hide();
      this.setState({
        show_attachment: attachment,
        showVideoPlayer: false,
        showContent: true,
        show_title: title,
        showQuiz: false
      });
      return false;
    }
    if (lesson_type == "quiz") {
      this.setState({
        showQuiz: true,
        quiz_les_id: les_id,
        show_title: title
      });
      $(".quizSection").show();
      $(".videoSection").hide();
      $(".imageSection").hide();
    }

    if (lesson_type == "video") {
      $(".videoSection").show();
      $(".imageSection").hide();
      $(".quizSection").hide();
      if (video_url) {
        that.setState({
          showVideoPlayer: true,
          showQuiz: false
        });
      } else {
        that.setState({
          showVideoPlayer: false,
          showQuiz: false
        });
      }
      setTimeout(function() {
        if (that.state.show_video_url) {
          player.destroy();
        }
        player = new Plyr("#player");
        player.source = {
          type: "video",
          title: "Example title",
          sources: [
            {
              src: posturl + "/lms_admin/" + video_url,
              type: "video/mp4",
              size: 360
            },
            {
              src: posturl + "/lms_admin/" + video_url,
              type: "video/mp4",
              size: 480
            },
            {
              src: posturl + "/lms_admin/" + video_url,
              type: "video/mp4",
              size: 720
            },
            {
              src: posturl + "/lms_admin/" + video_url,
              type: "video/webm",
              size: 1080
            }
          ]
        };
        window.player = player;
        if (video_url) {
          that.setState({
            show_video_url: posturl + "/lms_admin/" + video_url
          });
        } else {
          that.setState({
            show_video_url: ""
          });
        }
      }, 1000);
    }
  };
  render() {
    if (this.state.notFound == false) {
      return (
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="text-center" style={{ marginTop: "10px" }}>
                  <h4>{this.state.courseDetail.title}</h4>
                </div>
                <div className="accordion" id="accordionExample">
                  {this.state.courseSection.map((sec, secInd) => (
                    <div
                      key={"sec-" + secInd}
                      className="card"
                      style={{ margin: "10px 0px" }}
                    >
                      <div className="card-header" id={"heading-" + sec.id}>
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link w-100 text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target={"#collapse-" + sec.id}
                            aria-expanded="true"
                            aria-controls={"collapse-" + sec.id}
                            style={{
                              color: "#535a66",
                              background: "none",
                              border: " none",
                              whiteSpace: "normal"
                            }}
                          >
                            <h6
                              style={{ color: "#686f7a ", fontSize: " 15px" }}
                            >
                              {" Section " + (secInd + 1)}
                            </h6>
                            {sec.title}
                          </button>
                        </h5>
                      </div>
                      <div
                        id={"collapse-" + sec.id}
                        className={secInd == 0 ? "collapse show" : "collapse"}
                        aria-labelledby={"heading-" + sec.it}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body" style={{ padding: "0px" }}>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {this.state.courseLessons.map((les, lesInd) =>
                                sec.id == les.section_id ? (
                                  <tr
                                    key={"les-" + lesInd}
                                    style={{
                                      width: "100%",
                                      padding: "5px 0px"
                                    }}
                                  >
                                    <td
                                      style={{
                                        textAlign: "left",
                                        padding: "10px",
                                        borderBottom: "1px solid #ccc"
                                      }}
                                    >
                                      <a
                                        href="#"
                                        onClick={() =>
                                          this.showLessonContent(
                                            les.title,
                                            les.video_type,
                                            les.video_url,
                                            les.lesson_type,
                                            les.attachment,
                                            les.id,
                                            les.fileExtension,
                                            les.summary
                                          )
                                        }
                                        id={les.id}
                                      >
                                        <i
                                          className="fa fa-play"
                                          style={{
                                            fontSize: "12px",
                                            color: "#909090",
                                            padding: "10px"
                                          }}
                                        ></i>
                                        {les.title}
                                      </a>
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "right",
                                        padding: "10px",
                                        borderBottom: "1px solid #ccc"
                                      }}
                                    >
                                      <span className="lesson_duration">
                                        {les.lesson_type == "video" ||
                                        les.lesson_type == "" ||
                                        les.lesson_type == null ? (
                                          les.duration
                                        ) : les.lesson_type == "quiz" ? (
                                          <i className="far fa-question-circle"></i>
                                        ) : les.fileExtension == "jpg" ||
                                          les.fileExtension == "jpeg" ||
                                          les.fileExtension == "png" ||
                                          les.fileExtension == "bmp" ||
                                          les.fileExtension == "svg" ? (
                                          <i className="fas fa-camera-retro"></i>
                                        ) : les.fileExtension == "pdf" ? (
                                          <i className="far fa-file-pdf"></i>
                                        ) : les.fileExtension == "doc" ||
                                          les.fileExtension == "docx" ? (
                                          <i className="far fa-file-word"></i>
                                        ) : les.fileExtension == "txt" ? (
                                          <i className="far fa-file-alt"></i>
                                        ) : (
                                          <i className="fa fa-file"></i>
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                ) : null
                              )}
                              {/* <?php endforeach; ?> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <?php endforeach; ?> */}
                </div>
              </div>

              {/* {this.state.showContent ? ( */}
              <div className="col-lg-9 hide" id="video_player_area">
                <div className="text-center" style={{ marginTop: "10px" }}>
                  <h4>Content</h4>
                </div>
                <div className="" style={{ textAlign: "center" }}>
                  <React.Fragment>
                    <div className="videoSection">
                      <video
                        id="player"
                        playsInline
                        width="100%"
                        controls
                        controlsList="nodownload"
                      ></video>
                    </div>
                  </React.Fragment>

                  <div className="mt-5" className="imageSection">
                    <a
                      href={
                        posturl +
                        "/lms_admin/uploads/lesson_files/" +
                        this.state.show_attachment
                      }
                      target="_blank"
                      className="btn btn-sign-up"
                      download
                      style={{ color: "#fff" }}
                    >
                      <i
                        className="fa fa-download"
                        style={{ fontSize: "20px" }}
                      ></i>
                      {"Download " + this.state.show_title}
                    </a>
                  </div>
                  {this.state.showQuiz ? (
                    <div className="quizSection">
                      <QuizView
                        les_id={this.state.quiz_les_id}
                        title={this.state.show_title}
                      />
                    </div>
                  ) : null}
                  {/* )} */}
                </div>

                <div
                  className=""
                  style={{ margin: "20px 0" }}
                  id="lesson-summary"
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Notes:</h5>
                      <p className="card-text">{this.state.show_summary}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default CourseLessons;
