import React, { Component } from "react";

class Banner extends Component {
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

  render() {
    return (
      <section className="home-banner-area">
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <div className="home-banner-wrap">
                <h2>Learn on your schedule</h2>
                <p>
                  Study any topic, anytime. Explore thousands of courses for the
                  lowest price ever!
                </p>
                {/* <form className="" onSubmit={this.searchData}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="searchKey1"
                      name="searchKey"
                      placeholder="What do you want to learn?"
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Banner;
