(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {

      this.joinChatServer = () => {
        const socket = window.io('localhost:3456/');
        socket.emit("test", "we are passing in a message");
      };
    }])
})(window, window.angular);