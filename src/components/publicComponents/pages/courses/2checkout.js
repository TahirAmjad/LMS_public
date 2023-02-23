/* eslint-disable */
import jQuery from "jquery";

var successCallback = function(data) {
  var myForm = document.getElementById("myCCForm");

  // Set the token as the value for the token input
  myForm.token.value = data.response.token.token;

  // IMPORTANT: Here we call `submit()` on the form element directly instead of using jQuery to prevent and infinite token request loop.
  myForm.submit();
};

// Called when token creation fails.
var errorCallback = function(data) {
  if (data.errorCode === 200) {
    tokenRequest();
    console.log(tokenRequest());
  } else {
    alert(data.errorMsg);
  }
};

var tokenRequest = function() {
  // Setup token request arguments
  var args = {
    sellerId: "901416345",
    publishableKey: "2270902A-D85C-47AC-A5BF-F2FB5397E325",
    ccNo: $("#ccNo").val(),
    cvv: $("#cvv").val(),
    expMonth: $("#expMonth").val(),
    expYear: $("#expYear").val()
  };

  // Make the token request
  TCO.requestToken(successCallback, errorCallback, args);
};

$(function() {
  // Pull in the public encryption key for our environment
  TCO.loadPubKey("sandbox");

  $("#myCCForm").submit(function(e) {
    // Call our token request function
    tokenRequest();

    // Prevent form from submitting
    return false;
  });
});
