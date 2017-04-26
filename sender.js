var senderConnection;
var sendChannel;

var WELCOME_MSG = 'Welcome! Type `init()` to generate an offer string!';
var COPY_MSG = 'Copy, paste, and somehow give the OFFER_STRING below to the receiver:';
var GET_ANSWER_MSG = '\n\n When you get an ANSWER_STRING from the receiver, copy and paste it wrapped in connect(), like this \n `connect(ANSWER_STRING)`';
var READY_MSG = 'Channel ready. To send a message "hi", type `say("hi")`';
var MSG_HEADER = 'msg:'

var SIGNALING_INFO = '\n You have generated an "offer", which has info including your ip address. By giving it to the receiver by some means of your choice, you are playing the role of a "Signaling Server," which sets up connections.';
var SIGNALING_INFO_MORE = '\n The receiver will record the info about your ip, and send you some info about how to contact it. \n ';

console.log(WELCOME_MSG);

function init() {
  var servers = null;
  var pcConstraint = null;
  var dataConstraint = null;

  senderConnection = new RTCPeerConnection(servers, pcConstraint);

  sendChannel = senderConnection.createDataChannel('sendDataChannel', dataConstraint);
 
  sendChannel.onmessage = function(e) {
    console.log(MSG_HEADER, e.data);
  };

  sendChannel.onopen = function() {
    console.log(READY_MSG);
  };

  senderConnection.createOffer().then(
    function(desc) {
      senderConnection.setLocalDescription(desc, function(){}, function(){});
    },
    offerError
  );

  senderConnection.onicecandidate = function(e) {
    if (e.candidate !== null) return;

    var json = JSON.stringify(senderConnection.localDescription);
    console.log(COPY_MSG);
    console.log(JSON.stringify(json)); // twice stringified for escaping quote convenience on console log

    console.info(SIGNALING_INFO);
    console.info(SIGNALING_INFO_MORE);

    console.log(GET_ANSWER_MSG);
  };
}

function connect(answerString) {
  var answer = JSON.parse(answerString);
  senderConnection.setRemoteDescription(answer);
}

// msg: String
function say(msg) {
  sendChannel.send(msg);
}

function offerError(err) {
  console.log('descrip error', err);
}
