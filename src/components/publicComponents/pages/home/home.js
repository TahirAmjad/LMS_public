import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Banner from "./banner";
import FactArea from "./fact_area";
import TopCourse from "./top_course";
import LatestCourse from "./latest_course";
import $ from "jquery";
// import "../../../../innerAssets/frontend/default/css/slick.css";
// import "../../../../innerAssets/frontend/default/js/slick.min.js";

class Home extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      totalEbayGroups: 0,
      totalGoogleGroups: 0,
      totalSMS: 0
    };
  }
  componentDidMount() {
    // $(".course-carousel").slick({
    //   dots: false,
    //   infinite: false,
    //   speed: 300,
    //   slidesToShow: 6,
    //   slidesToScroll: 6,
    //   swipe: false,
    //   touchMove: false,
    //   responsive: [
    //     {
    //       breakpoint: 1300,
    //       settings: {
    //         slidesToShow: 5,
    //         slidesToScroll: 5
    //       }
    //     },
    //     {
    //       breakpoint: 1100,
    //       settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 4
    //       }
    //     },
    //     {
    //       breakpoint: 840,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3
    //       }
    //     },
    //     {
    //       breakpoint: 620,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
    // });
  }
  render() {
    return (
      <React.Fragment>
        <Banner />
        <FactArea />
        <TopCourse />
        <LatestCourse />
      </React.Fragment>
    );
  }
}
export default Home;
