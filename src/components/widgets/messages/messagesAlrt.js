import React, { Component } from "react";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";

class MessagesAlrt extends Component {
  //   constructor (props) {
  //     super(props)
  //   }

  render() {
    return (
      <div>
        {/* {this.props.open == true && this.props.status == 'success' ? ( */}
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          //   progressBar
          closeOnToastrClick
          onCloseButtonClick
        />
        {/* ) : (
          ''
        )} */}
      </div>
    );
  }
}

export default MessagesAlrt;
