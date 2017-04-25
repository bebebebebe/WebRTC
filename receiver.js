var receiverConnection;
var receiveChannel;

function start(offerString) {
  initReceiver();
  offerHandle(offerString);
}

function initReceiver() {
  receiverConnection = new RTCPeerConnection(null, null);

  receiverConnection.onicecandidate = function(e) {
    if (e.candidate !== null) return;

    var json = JSON.stringify(receiverConnection.localDescription);
    console.log('ANSWER STRING:'),
    console.log(JSON.stringify(json)); // double stringify easier for console log escaping quotes
  };

  receiverConnection.ondatachannel = function(e) {
    receiveChannel = e.channel;

    receiveChannel.onmessage = function(e) {
      console.log('msg: ', e.data);
    };

    receiveChannel.onopen = function() {
      console.log('receive channel open');
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
