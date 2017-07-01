(function() {
  angular
    .module('slackOverFlowApp')
    .controller('videochatCtrl', videochatCtrl)

    videochatCtrl.$inject = ['store'];

    function videochatCtrl(store) {
      let email = store.get('profile').email

      function start() {
        var peer = (email, {key: 'r8tclr62do0f6r'});
        console.log('mypeer = ', peer)

      }

      function call() {

      }

      function hangup() {

      }

    }
})();