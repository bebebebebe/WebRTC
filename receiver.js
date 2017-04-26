var receiverConnection;
var receiveChannel;

var WELCOME_MSG = 'Welcome! When you get an OFFER_STRING from a sender, copy and paste it wrapped with init, below, like this: \n `init(OFFER_STRING)`';
var COPY_MSG = 'Great!, Now, copy, paste, and somehow give the ANSWER_STRING below to the receiver:';
var MSG_HEADER = 'msg: ';
var READY_MSG = 'Channel ready. To send a message "hi", type `say("hi")`';

var SIGNALING_INFO = '\n The OFFER_STRING from the sender has info about its ip, which you have now recorded.';
var SIGNALING_INFO_MORE = '\n You have generated an "answer", which has info including your ip address. By giving it to the sender by some means of your choice, you are playing the role of a "Signaling Server," which sets up connections.\n';

console.log(WELCOME_MSG);

function init(offerString) {
  initReceiver();
  offerHandle(offerString);
}

function initReceiver() {
  receiverConnection = new RTCPeerConnection(null, null);

  receiverConnection.onicecandidate = function(e) {
    if (e.candidate !== null) return;

    var json = JSON.stringify(receiverConnection.localDescription);
    console.log(COPY_MSG),
    console.log(JSON.stringify(json)); // twice stringified for escaping quote convenience on console log

    console.info(SIGNALING_INFO);
    console.info(SIGNALING_INFO_MORE);
  };

  receiverConnection.ondatachannel = function(e) {
    receiveChannel = e.channel;

    receiveChannel.onmessage = function(e) {
      console.log(MSG_HEADER, e.data);
    };

    receiveChannel.onopen = function() {
      console.log(READY_MSG);
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
