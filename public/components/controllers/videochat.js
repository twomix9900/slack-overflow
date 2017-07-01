(function () {
  angular
    .module('slackOverflowApp')
    .controller('videochatCtrl', videochatCtrl)

  videochatCtrl.$inject = ['store', '$state'];

  function videochatCtrl(store, $state) {
    const vm = this;
    let email = store.get('profile').email
    var connectButton = document.getElementById('connectButton');
    var startButton = document.getElementById('startButton');
    var callButton = document.getElementById('callButton');
    var hangupButton = document.getElementById('hangupButton');
    // callButton.disabled = true;
    // hangupButton.disabled = true;
    // startButton.onclick = start;
    callButton.onclick = call;
    hangupButton.onclick = hangup;
    // connectButton.onclick = connect;

    var startTime;
    var localVideo = document.getElementById('localVideo');
    var remoteVideo = document.getElementById('remoteVideo');

    vm.otherPeerId;

    vm.peer = new Peer({ key: 'r8tclr62do0f6r' });
    console.log(email)
    setTimeout(() => {
      vm.myPeerId = vm.peer.id
      console.log(vm.myPeerId)
    }, 2000)

    vm.peer.on('connection', function(connect) {
      console.log('connection??')
      connect.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    function connect() {
      console.log('clicked')
      var conn = vm.peer.connect(vm.otherPeerId);
      conn.on('open', function(){
        console.log('sending')
        conn.send('hi!');
      });
    }

    vm.peer.on('call', function(call) {
      navigator.getUserMedia({video: true}, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          window.localVideo = stream;
          localVideo.src= URL.createObjectURL(stream)
          localVideo.play();
          remoteVideo.src= URL.createObjectURL(remoteStream)
          remoteVideo.play();
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });

    function start() {
      window.getUserMedia({video: true, audio: true}, function(stream) {
          localVideo.src= URL.createObjectURL(streamtream)
          localVideo.play();
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    }

    function call() {
      console.log('calling')
      // console.log(navigator.getUserMedia())
      // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({video: true}, function(stream) {
        console.log('sending call')
        var call = vm.peer.call(vm.otherPeerId, stream);
        call.on('stream', function(remoteStream) {
          window.localVideo = stream;
          localVideo.src= URL.createObjectURL(stream)
          localVideo.play();
          remoteVideo.src= window.URL.createObjectURL(remoteStream)
          remoteVideo.play();
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    }

    function hangup() {
      console.log(window.localVideo.getVideoTracks())
      window.localVideo.getVideoTracks()[0].stop();
      $state.go('chatPage');
    }

  }
})();
// (function() {
//   'use strict';
//   angular
//     .module('slackOverflowApp')
//     .controller('videochatCtrl', function($state) {
//       var vm = this;
//       var isChannelReady = false;
//       var isInitiator = false;
//       var isStarted = false;
//       var localStream;
//       var pc;
//       var remoteStream;
//       var turnReady;

//       var pcConfig = {
//         'iceServers': [{
//           'urls': 'stun:stun.l.google.com:19302'
//         }]
//       };

//       // Set up audio and video regardless of what devices are present.
//       var sdpConstraints = {
//         offerToReceiveAudio: true,
//         offerToReceiveVideo: true
//       };

//       /////////////////////////////////////////////

//       var room = 'foo';
//       // Could prompt for room name:
//       // room = prompt('Enter room name:');
//       var socket = io.connect();

//       // function start(){
//       //   socket.connect();
//       // }


//       if (room !== '') {
//         console.log('I GOT HIT')
//         socket.emit('create or join', room);
//         console.log('Attempted to create or  join room', room);
//       }

//       socket.on('created', function(room) {
//         console.log('Created room ' + room);
//         isInitiator = true;
//       });

//       socket.on('full', function(room) {
//         console.log('Room ' + room + ' is full');
//       });

//       socket.on('join', function (room){
//         console.log('Another peer made a request to join room ' + room);
//         console.log('This peer is the initiator of room ' + room + '!');
//         isChannelReady = true;
//       });

//       socket.on('joined', function(room) {
//         console.log('joined: ' + room);
//         isChannelReady = true;
//       });

//       socket.on('log', function(array) {
//         console.log.apply(console, array);
//       });

//       ////////////////////////////////////////////////

//       function sendMessage(message) {
//         console.log('Client sending message: ', message);
//         socket.emit('message', message);
//       }

//       // This client receives a message
//       socket.on('message', function(message) {
//         console.log('is started', isStarted)
//         console.log('Client received message:', message);
//         if (message === 'got user media') {
//           maybeStart();
//         } else if (message.type === 'offer') {
//           if (!isInitiator && !isStarted) {
//             maybeStart();
//           }
//           pc.setRemoteDescription(new RTCSessionDescription(message));
//           doAnswer();
//         } else if (message.type === 'answer' && isStarted) {
//           pc.setRemoteDescription(new RTCSessionDescription(message));
//         } else if (message.type === 'candidate' && isStarted) {
//           var candidate = new RTCIceCandidate({
//             sdpMLineIndex: message.label,
//             candidate: message.candidate
//           });
//           pc.addIceCandidate(candidate);
//         } else if (message === 'bye' && isStarted) {
//           handleRemoteHangup();
//         }
//       });

//       ////////////////////////////////////////////////////

//       var localVideo = document.querySelector('#localVideo');
//       var remoteVideo = document.querySelector('#remoteVideo');

//       navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: true
//       })
//       .then(gotStream)
//       .catch(function(e) {
//         alert('getUserMedia() error: ' + e.name);
//       });

//       function gotStream(stream) {
//         console.log('Adding local stream.', stream);
//         var localTrack = stream.getVideoTracks();
//         console.log('track = ',localTrack)
//         localVideo.srcObject = window.localStream = stream;
//         localStream = stream;
//         sendMessage('got user media');
//         if (isInitiator) {
//           maybeStart();
//         }
//       }

//       var constraints = {
//         video: true
//       };

//       console.log('Getting user media with constraints', constraints);

//       if (location.hostname !== 'localhost') {
//         requestTurn(
//           'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
//         );
//       }

//       function maybeStart() {
//         console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
//         if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
//           console.log('>>>>>> creating peer connection');
//           createPeerConnection();
//           pc.addStream(localStream);
//           isStarted = true;
//           console.log('isInitiator', isInitiator);
//           if (isInitiator) {
//             doCall();
//           }
//         }
//       }

//       window.onbeforeunload = function() {
//         sendMessage('bye');
//       };

//       /////////////////////////////////////////////////////////

//       function createPeerConnection() {
//         try {
//           pc = new RTCPeerConnection(null);
//           pc.onicecandidate = handleIceCandidate;
//           pc.onaddstream = handleRemoteStreamAdded;
//           pc.onremovestream = handleRemoteStreamRemoved;
//           console.log('Created RTCPeerConnnection');
//         } catch (e) {
//           console.log('Failed to create PeerConnection, exception: ' + e.message);
//           alert('Cannot create RTCPeerConnection object.');
//           return;
//         }
//       }

//       function handleIceCandidate(event) {
//         console.log('icecandidate event: ', event);
//         if (event.candidate) {
//           sendMessage({
//             type: 'candidate',
//             label: event.candidate.sdpMLineIndex,
//             id: event.candidate.sdpMid,
//             candidate: event.candidate.candidate
//           });
//         } else {
//           console.log('End of candidates.');
//         }
//       }

//       function handleRemoteStreamAdded(event) {
//         console.log('Remote stream added.');
//         remoteVideo.srcObject = event.stream;
//         remoteStream = event.stream;
//       }

//       function handleCreateOfferError(event) {
//         console.log('createOffer() error: ', event);
//       }

//       function doCall() {
//         console.log('Sending offer to peer');
//         pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
//       }

//       function doAnswer() {
//         console.log('Sending answer to peer.');
//         pc.createAnswer().then(
//           setLocalAndSendMessage,
//           onCreateSessionDescriptionError
//         );
//       }

//       function setLocalAndSendMessage(sessionDescription) {
//         // Set Opus as the preferred codec in SDP if Opus is present.
//         //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
//         pc.setLocalDescription(sessionDescription);
//         console.log('setLocalAndSendMessage sending message', sessionDescription);
//         sendMessage(sessionDescription);
//       }

//       function onCreateSessionDescriptionError(error) {
//         trace('Failed to create session description: ' + error.toString());
//       }

//       function requestTurn(turnURL) {
//         var turnExists = false;
//         for (var i in pcConfig.iceServers) {
//           if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
//             turnExists = true;
//             turnReady = true;
//             break;
//           }
//         }
//         if (!turnExists) {
//           console.log('Getting TURN server from ', turnURL);
//           // No TURN server. Get one from computeengineondemand.appspot.com:
//           var xhr = new XMLHttpRequest();
//           xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//               var turnServer = JSON.parse(xhr.responseText);
//               console.log('Got TURN server: ', turnServer);
//               pcConfig.iceServers.push({
//                 'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
//                 'credential': turnServer.password
//               });
//               turnReady = true;
//             }
//           };
//           xhr.open('GET', turnURL, true);
//           xhr.send();
//         }
//       }

//       function handleRemoteStreamAdded(event) {
//         console.log('Remote stream added.');
//         remoteVideo.srcObject = event.stream;
//         remoteStream = event.stream;
//       }

//       function handleRemoteStreamRemoved(event) {
//         console.log('Remote stream removed. Event: ', event);
//       }

//       function hangup() {
//         console.log('Hanging up.');
//         localStream.getVideoTracks()[0].stop();
//         $state.go('chatPage');
//         stop();
//         // socket.emit('disconnect');
//         sendMessage('bye');
//       }

//       function handleRemoteHangup() {
//         console.log('Session terminated.');
//         stop();
//         isInitiator = false;
//         localStream.getVideoTracks()[0].stop();
//         // socket.emit('disconnect');
//         $state.go('chatPage')
//       }

//       function stop() {
//         isStarted = false;
//         // isAudioMuted = false;
//         // isVideoMuted = false;
//         pc.close();
//         pc = null;
//       }

//       function click() {
//         console.log('im clicked')
//       }

//       ///////////////////////////////////////////

//       // Set Opus as the default audio codec if it's present.
//       function preferOpus(sdp) {
//         var sdpLines = sdp.split('\r\n');
//         var mLineIndex;
//         // Search for m line.
//         for (var i = 0; i < sdpLines.length; i++) {
//           if (sdpLines[i].search('m=audio') !== -1) {
//             mLineIndex = i;
//             break;
//           }
//         }
//         if (mLineIndex === null) {
//           return sdp;
//         }

//         // If Opus is available, set it as the default in m line.
//         for (i = 0; i < sdpLines.length; i++) {
//           if (sdpLines[i].search('opus/48000') !== -1) {
//             var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
//             if (opusPayload) {
//               sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
//                 opusPayload);
//             }
//             break;
//           }
//         }

//         // Remove CN in m line and sdp.
//         sdpLines = removeCN(sdpLines, mLineIndex);

//         sdp = sdpLines.join('\r\n');
//         return sdp;
//       }

//       function extractSdp(sdpLine, pattern) {
//         var result = sdpLine.match(pattern);
//         return result && result.length === 2 ? result[1] : null;
//       }

//       // Set the selected codec to the first in m line.
//       function setDefaultCodec(mLine, payload) {
//         var elements = mLine.split(' ');
//         var newLine = [];
//         var index = 0;
//         for (var i = 0; i < elements.length; i++) {
//           if (index === 3) { // Format of media starts from the fourth.
//             newLine[index++] = payload; // Put target payload to the first.
//           }
//           if (elements[i] !== payload) {
//             newLine[index++] = elements[i];
//           }
//         }
//         return newLine.join(' ');
//       }

//       // Strip CN from sdp before CN constraints is ready.
//       function removeCN(sdpLines, mLineIndex) {
//         var mLineElements = sdpLines[mLineIndex].split(' ');
//         // Scan from end for the convenience of removing an item.
//         for (var i = sdpLines.length - 1; i >= 0; i--) {
//           var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
//           if (payload) {
//             var cnPos = mLineElements.indexOf(payload);
//             if (cnPos !== -1) {
//               // Remove CN payload from m line.
//               mLineElements.splice(cnPos, 1);
//             }
//             // Remove CN line in sdp
//             sdpLines.splice(i, 1);
//           }
//         }

//         sdpLines[mLineIndex] = mLineElements.join(' ');
//         return sdpLines;
//       }
//       ///////////////////////////////////////////////////////////////////////
//       var startButton = document.getElementById('startButton');
//       var callButton = document.getElementById('callButton');
//       var hangupButton = document.getElementById('hangupButton');
//       // callButton.disabled = true;
//       // hangupButton.disabled = true;
//       // startButton.onclick = click;
//       // callButton.onclick = call;
//       hangupButton.onclick = hangup;
//     })
// })()
