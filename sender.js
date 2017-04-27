var senderConnection;
var sendChannel;

var WELCOME_MSG = 'Welcome! Type \n init()\nto generate an offer string!';
var COPY_MSG = 'Copy, paste, and somehow give the OFFER_STRING below to the receiver.';
var COPY_MSG_MORE = ' If you, in another browser window, are playing the role of receiver, just copy the string and head over to the receiver window.' +
  '\n If someone on a different machine is playing the role of the receiver, you will have to send them this string, for instance by email.';

var GET_ANSWER_MSG = '\nWhen you get an ANSWER_STRING from the receiver, copy and paste it wrapped in connect(), like this \n connect(ANSWER_STRING)';
var READY_MSG = 'Channel ready for browser to browser message passing! To send a message "hi", type \n say("hi")';
var MSG_HEADER = 'receiver: '

var SIGNALING_INFO = '\nYou have generated an "offer", which has info in Session Description Protocol (SDP) format, including your ip address.';
var SIGNALING_INFO_MORE = ' It also includes some session info, and could have info about whether you are allowing access to your camera for example.' +
  '\n By giving it to the receiver by some means of your choice, you are playing the role of a "Signaling Server," which sets up connections.';
var SIGNALING_INFO_MORE_YET = '\n\nThe receiver will record the info you have sent, and send you some similar info about itself. \n ';

logDir(WELCOME_MSG);

function init() {
  var servers = null;
  var pcConstraint = null;
  var dataConstraint = null;

  senderConnection = new RTCPeerConnection(servers, pcConstraint);

  sendChannel = senderConnection.createDataChannel('sendDataChannel', dataConstraint);
 
  sendChannel.onmessage = function(e) {
    logMsg(e.data);
  };

  sendChannel.onopen = function() {
    logDir(READY_MSG);
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

    logDir(COPY_MSG);
    logDirDetails(COPY_MSG_MORE);
    logData(JSON.stringify(json)); // twice stringified for escaping quote convenience on console log

    logInfo(SIGNALING_INFO);
    logInfoDetails(SIGNALING_INFO_MORE);
    logInfo(SIGNALING_INFO_MORE_YET);

    logDir(GET_ANSWER_MSG);
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
