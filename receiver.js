var receiverConnection;
var receiveChannel;

var WELCOME_MSG = 'Welcome! When you get an OFFER_STRING from a sender, copy and paste it wrapped with init, below, like this: \n init(OFFER_STRING)';
var COPY_MSG = 'Great!, Now, copy, paste, and somehow give the ANSWER_STRING below to the receiver.';
var COPY_MSG_MORE = ' If you, in another browser window, are playing the role of sender, just copy the string and head back over to the sender window.' +
  '\n If someone on a different machine is playing the role of the sender, you will have to send them this string, for instance by email.';

var MSG_HEADER = 'sender: ';
var READY_MSG = 'Channel ready for browser to browser message passing! To send a message "hi", type \n say("hi")';

var SIGNALING_INFO = '\nThe OFFER_STRING from the sender has info in Session Description Protocol (SDP) format, including its ip address, which you have now recorded. \nIt also includes some session info, and could have info about whether it is allowing you access to its camera for example.';
var SIGNALING_INFO_MORE = ' You have generated an "answer", which has similar info about yourself. \n By giving it to the sender by some means of your choice, you are playing the role of a "Signaling Server," which sets up connections.\n';


logDir(WELCOME_MSG);

function init(offerString) {
  initReceiver();
  offerHandle(offerString);
}

function initReceiver() {
  receiverConnection = new RTCPeerConnection(null, null);

  receiverConnection.onicecandidate = function(e) {
    if (e.candidate !== null) return;

    var json = JSON.stringify(receiverConnection.localDescription);
    logDir(COPY_MSG);
    logDirDetails(COPY_MSG_MORE);
    logData(JSON.stringify(json)); // twice stringified for escaping quote convenience on console log

    logInfo(SIGNALING_INFO);
    logInfoDetails(SIGNALING_INFO_MORE);
  };

  receiverConnection.ondatachannel = function(e) {
    receiveChannel = e.channel;

    receiveChannel.onmessage = function(e) {
      logMsg(e.data);
    };

    receiveChannel.onopen = function() {
      logDir(READY_MSG);
    }
  }
}

function offerHandle(offerString) {
  var offerDesc = JSON.parse(offerString);
  receiverConnection.setRemoteDescription(offerDesc);

  receiverConnection.createAnswer().then(
    function(answerDesc) {
      receiverConnection.setLocalDescription(answerDesc, function(){}, function(){});
    },
    function(err) {console.log(err);}
  );
}

function say(msg) {
  receiveChannel.send(msg);
}
