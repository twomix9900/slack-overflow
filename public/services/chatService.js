(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {

      this.joinChatServer = (email) => {
        const socket = window.io('localhost:3456/');
        socket.emit("join", email);
      };
    }])
})(window, window.angular);