import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class FactArea extends Component {
  constructor() {
    super();
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl
    };
  }

  render() {
    return (
      <section className="home-fact-area">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-4 d-flex">
              <div className="home-fact-box mr-md-auto ml-auto mr-auto">
                <i className="fas fa-bullseye float-left"></i>
                <div className="text-box">
                  <h4>12 Online courses</h4>
                  <p>Explore a variety of fresh topics</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="home-fact-box mr-md-auto ml-auto mr-auto">
                <i className="fa fa-check float-left"></i>
                <div className="text-box">
                  <h4>Expert instruction</h4>
                  <p>Find the right course for you</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="home-fact-box mr-md-auto ml-auto mr-auto">
                <i className="fa fa-clock float-left"></i>
                <div className="text-box">
                  <h4>Lifetime access</h4>
                  <p>Learn on your schedule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default FactArea;
