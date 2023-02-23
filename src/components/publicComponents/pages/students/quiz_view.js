import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";
import { Player } from "video-react";
import { posturl, currency } from "../../../../configuration.js";
import QuizResult from "./quiz_result.js";

var that = "";

class QuizView extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      videoURL: "",
      notFound: false,
      quiz_questions: [],
      total_correct_answers: "",
      total_questions: "",
      submitted_quiz_info: []
    };
  }
  getStarted = first_quiz_question => {
    $("#quiz-header").hide();
    $("#lesson-summary").hide();
    $("#question-number-" + first_quiz_question).show();
  };
  showNextQuestion = next_question => {
    console.log(next_question);
    var preQ = next_question - 1;
    console.log(preQ);
    // var valuee = $("quiz-id-" + preQ + "-option-id-" + preQ).val();
    // console.log($("#question-number-" + (next_question - 1)));

    // return false;
    $("#question-number-" + (next_question - 1)).hide();
    $("#question-number-" + next_question).show();
  };
  submitQuiz() {
    const insertUrl = posturl + "/lms_admin/submit_quiz/";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: $("form#quiz_form").serialize()
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
        if (response.found) {
          that.setState({
            total_questions: response.total_questions,
            total_correct_answers: response.total_correct_answers,
            submitted_quiz_info: response.submitted_quiz_info
          });
          $("#quiz-result").removeClass("hide");
          $("#quiz-body").hide();
        } else {
          this.setState({
            notFound: true
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });

    // $("#quiz-result").html("response");
  }
  enableNextButton = quizID => {
    $("#next-btn-" + quizID).prop("disabled", false);
  };
  getQuizData() {
    var les_id = this.props.les_id;
    const insertUrl = posturl + "/lms_admin/get_quiz_data/";
    new Promise((resolve, reject) => {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: { les_id: les_id }
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
        if (response.found) {
          this.setState({
            quiz_questions: response.quiz_questions,
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
    this.getQuizData();
  }
  retakeQuiz() {
    $("#quiz-result").addClass("hide");
    $("#quiz-body").show();
    $("#quiz_form")[0].reset();
    var last_question = this.state.quiz_questions.length;
    $("#question-number-" + last_question).hide();
    this.getStarted(1);
  }

  render() {
    return (
      <React.Fragment>
        <div id="quiz-body">
          <div className="" id="quiz-header">
            Quiz Title : <strong>{this.props.title}</strong>
            <br />
            Total Questions :<strong>{this.state.quiz_questions.length}</strong>
            <br />
            <button
              type="button"
              name="button"
              className="btn btn-sign-up mt-2"
              style={{ color: "#fff" }}
              onClick={() => this.getStarted(1)}
            >
              Get Started
            </button>
          </div>

          <form className="" id="quiz_form" action="" method="post">
            {this.state.quiz_questions.map((tit, index) => (
              <React.Fragment key={"outer-" + index}>
                <input
                  type="hidden"
                  name="lesson_id"
                  value={this.props.les_id}
                />
                <div
                  className="hidden quesDiv"
                  id={"question-number-" + (index + 1)}
                >
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card text-left">
                        <div className="card-body">
                          <h6 className="card-title">
                            Question {index + 1} : <strong>{tit.title}</strong>
                          </h6>
                        </div>
                        <ul className="list-group list-group-flush">
                          {JSON.parse(tit.options).map((tit1, index1) => (
                            <li
                              key={"inner-" + index1}
                              className="list-group-item quiz-options"
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={tit.id + "[]"}
                                  value={index1 + 1}
                                  id={
                                    "quiz-id-" +
                                    tit.id +
                                    "-option-id-" +
                                    (index1 + 1)
                                  }
                                  onClick={() => this.enableNextButton(tit.id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={
                                    "quiz-id-" +
                                    tit.id +
                                    "-option-id-" +
                                    (index1 + 1)
                                  }
                                >
                                  {tit1}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {this.state.quiz_questions.length == index + 1 ? (
                    <button
                      type="button"
                      name="button"
                      className="btn btn-sign-up mt-2 mb-2"
                      id={"next-btn-" + tit.id}
                      style={{ color: "#fff " }}
                      // disabled
                      onClick={() => this.submitQuiz()}
                    >
                      Check Result
                    </button>
                  ) : (
                    <button
                      type="button"
                      name="button"
                      className="btn btn-sign-up mt-2 mb-2"
                      id={"next-btn-" + tit.id}
                      style={{ color: "#fff " }}
                      // disabled
                      onClick={() => this.showNextQuestion(index + 2)}
                    >
                      Next
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </form>
        </div>
        <div id="quiz-result" className="text-left hide">
          <div className="row">
            <div className="col-lg-12">
              <div
                style={{ backgroundColor: " #007791", padding: "13px" }}
                className="card text-white bg-quiz-result-info mb-3"
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Review the course materials to expand your learning.
                  </h5>
                  <p className="card-text">
                    You got {this.state.total_correct_answers} out of{" "}
                    {this.state.total_questions} correct.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {this.state.submitted_quiz_info.map((tit, index) => (
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="card text-left card-with-no-color-no-border">
                  <div className="card-body">
                    <h6 className="card-title">
                      {tit.submitted_answer_status == 1 ? (
                        <img
                          src={
                            posturl +
                            "/lms_admin/assets/frontend/default/img/green-tick.png"
                          }
                          alt=""
                          height="15px;"
                        />
                      ) : (
                        <img
                          src={
                            posturl +
                            "/lms_admin/assets/frontend/default/img/red-cross.png"
                          }
                          alt=""
                          height="15px;"
                        />
                      )}
                      {tit.title}
                    </h6>

                    <p className="card-text">
                      {"- " + tit.correct_ans}
                      <img
                        src={
                          posturl +
                          "/lms_admin/assets/frontend/default/img/green-circle-tick.png"
                        }
                        alt=""
                        height="15px;"
                      />
                    </p>

                    <p className="card-text">
                      <strong>Submitted Answers : </strong> [ {tit.given_ans} ]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mb-4">
            <a
              type="button"
              onClick={() => this.retakeQuiz()}
              name="button"
              className="btn btn-sign-up mt-2"
              style={{ color: "#fff" }}
            >
              Take Again
            </a>
          </div>
          {/* <QuizResult /> */}
        </div>
      </React.Fragment>
    );
  }
}
export default QuizView;
