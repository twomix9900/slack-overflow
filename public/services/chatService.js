(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {
      this.socket = window.io('localhost:3456/');

      this.joinChatServer = (email) => {
        this.socket.emit("join", email);
      };

      this.exitChatServer = (email) => {
        this.socket.emit("exit", email)
      }
    }])
})(window, window.angular);