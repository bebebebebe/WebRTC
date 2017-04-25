var localConnection;
var sendChannel;

function createConnection() {
  var servers = null;
  var pcConstraint = null;
  var dataConstraint = null;

  localConnection = new RTCPeerConnection(servers, pcConstraint);

  sendChannel = localConnection.createDataChannel('sendDataChannel', dataConstraint);
 
  sendChannel.onmessage = function(e) {
    console.log('msg:', e.data);
  };

  sendChannel.onopen = function() {
    console.log('send channel open');
  };

  localConnection.createOffer().then(
    function(desc) {
      console.log(desc);
      localConnection.setLocalDescription(desc, function(){}, function(){});
    },
    offerError
  );

  localConnection.onicecandidate = function(e) {
    console.log('onicecandidate');
    console.log('event', e);
    if (e.candidate !== null) return;

    var json = JSON.stringify(localConnection.localDescription);
    console.log('OFFER STRING:');
    console.log(JSON.stringify(json)); // twice stringified for excaping quote convenience on console log
  };
}

function answerHandle(answerString) {
  var answer = JSON.parse(answerString);
  localConnection.setRemoteDescription(answer);
}

// msg: String
function say(msg) {
  sendChannel.send(msg);
}

function offerError(err) {
  console.log('descrip error', err);
}
