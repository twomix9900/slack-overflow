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