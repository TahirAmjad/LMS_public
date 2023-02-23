import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { posturl, currency } from "../../../../configuration.js";
import Slider from "react-slick";
import "../../../../innerAssets/frontend/default/css/slick.css";
import "../../../../innerAssets/frontend/default/js/slick.min.js";
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
class LatestCourse extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      courses: []
    };
  }
  getCourses() {
    let insertUrl = posturl + "/lms_admin/get_courses";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
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
            courses: result
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
  render() {
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
    return (
      <section className="course-carousel-area">
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <h2 className="course-carousel-title">Top 10 Latest courses</h2>
              <Slider className="course-carousel" {...settings}>
                {this.state.courses.map((tit, index) => (
                  <div key={"top-" + index} className="course-box-wrap">
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

                          <div className="rating">
                            <RatingPrint rating={tit.average_ceil_rating} />
                            <span className="d-inline-block average-rating">
                              {tit.average_ceil_rating}
                            </span>
                          </div>
                          <p className="price text-right">
                            {" "}
                            {currency + tit.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default LatestCourse;
