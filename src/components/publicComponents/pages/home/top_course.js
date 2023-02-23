import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-slick";
import { posturl, currency } from "../../../../configuration.js";
import { checkPropTypes } from "prop-types";
import slugify from "react-slugify";
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
class TopCourse extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      courses: []
    };
    //  this.getCourses();
  }
  getCourses() {
    let insertUrl = posturl + "/lms_admin/get_top_courses";
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
    var ratingCount = 5;

    return (
      <section className="course-carousel-area">
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <h2 className="course-carousel-title">Top courses</h2>
              <Slider className="course-carousel" {...settings}>
                {this.state.courses.map((tit, index) => (
                  <div key={"test-" + index} className="course-box-wrap">
                    <Link
                      to={"/course/" + slugify(tit.title)}
                      idd={tit.id}
                      className="has-popover"
                    >
                      <div className="course-box">
                        <div className="course-badge position best-seller">
                          Best seller
                        </div>
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
                            <small>{currency + tit.discounted_price}</small>{" "}
                            {currency + tit.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="webui-popover-content">
                      <div className="course-popover-content">
                        <div className="course-title">
                          <Link to={"/course/" + tit.courseSlug}>
                            {tit.titile}
                          </Link>
                        </div>
                      </div>
                    </div>
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
export default TopCourse;
