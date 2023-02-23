import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";
import { Player } from "video-react";
import { posturl, currency } from "../../../../configuration.js";

var that = "";

class QuizResult extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      videoURL: "",
      notFound: false,
      quiz_questions: []
    };
  }
  getStarted = first_quiz_question => {
    $("#quiz-header").hide();
    $("#lesson-summary").hide();
    $("#question-number-" + first_quiz_question).show();
  };
  showNextQuestion = next_question => {
    console.log(next_question);
    $("#question-number-" + (next_question - 1)).hide();
    $("#question-number-" + next_question).show();
  };
  submitQuiz() {
    const insertUrl = posturl + "/lms_admin/submit_quiz/";
    $.ajax({
      url: insertUrl,
      type: "post",
      data: $("form#quiz_form").serialize(),
      success: function(response) {
        $("#quiz-body").hide();
        $("#quiz-result").html(response);
      }
    });
    $("#quiz-result").html("response");
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

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="row">
          <div class="col-lg-12">
            <div class="card text-white bg-quiz-result-info mb-3">
              <div class="card-body">
                <h5 class="card-title">
                  Review the course materials to expand your learning.
                </h5>
                <p class="card-text">You got 1 out of 2 correct.</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default QuizResult;
