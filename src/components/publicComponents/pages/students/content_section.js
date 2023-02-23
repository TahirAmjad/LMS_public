import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Link } from "react-router-dom";
import { Player } from "video-react";
import { posturl, currency } from "../../../../configuration.js";
import Plyr from "plyr";
var that = "";

class ContentSection extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      videoURL: "",
      notFound: false,
      showVideoPlayer: false,
      show_video_type: "",
      show_video_url: "",
      show_lesson_type: "",
      show_attachment: "",
      show_attachment_type: ""
    };
  }

  componentDidMount() {
    console.log("render");
  }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.data != this.props.data && this.props.data != "") {
  //       console.log("lun khaye ga ");
  //     }
  //   }
  //   showLessonContent = (
  //     video_type,
  //     video_url,
  //     lesson_type,
  //     attachment,
  //     attachment_type
  //   ) => {
  //     this.setState({
  //       showVideoPlayer: false,
  //       show_video_url: ""
  //     });
  //     const player = new Plyr("video", { captions: { active: true } });

  //     // Expose player so it can be used from the console
  //     window.player = player;
  //     console.log(video_type);
  //     console.log(lesson_type);
  //     console.log(video_url);
  //     console.log(attachment);
  //     console.log(attachment_type);
  //     this.setState({
  //       showVideoPlayer: true,
  //       show_video_url: video_url
  //     });
  //   };
  render() {
    console.log(this.props.data);
    var player = new Plyr();

    player = new Plyr("#player");
    player.source = {
      type: "video",
      sources: [
        {
          src: this.props.data,
          type: "video/mp4",
          size: 360
        },
        {
          src: this.props.data,
          type: "video/mp4",
          size: 480
        },
        {
          src: this.props.data,
          type: "video/mp4",
          size: 720
        },
        {
          src: this.props.data,
          type: "video/webm",
          size: 1080
        }
      ]
    };
    window.player = player;
    return (
      <React.Fragment>
        <div class="col-lg-9" id="video_player_area">
          <div class="text-center" style={{ marginTop: "10px" }}>
            <h4>Content</h4>
          </div>

          <div class="" style={{ textAlign: "center" }}>
            {/* <div class="plyr__video-embed" id="player">
                      <iframe
                        height="500"
                        src={this.state.show_video_url}
                        allowfullscreen
                        allowtransparency
                        controls
                        controlsList="nodownload"
                        allow="autoplay"
                      ></iframe> 
                    </div> */}

            <video
              poster={
                posturl +
                "/lms_admin/uploads/thumbnails/lesson_thumbnails/8.jpg"
              }
              id="player"
              playsInline
              width="100%"
              controls
              controlsList="nodownload"
            >
              {/* <source src={this.props.data} type="video/mp4" /> */}
            </video>

            <div class="mt-5">{/* <?php include 'quiz_view.php'; ?> */}</div>
          </div>
          <div class="" style={{ margin: "20px 0" }} id="lesson-summary">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Type:</h5>
                <p class="card-text">Summary</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ContentSection;
