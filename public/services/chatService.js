(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {
      const vm = this;
      vm.socket = window.io('localhost:3456/');
      vm.users = [];


      vm.joinChatServer = (email) => {
        vm.socket.emit("join", email);
        vm.updateUsers();
      };

      vm.exitChatServer = (email) => {
        vm.socket.emit("exit", email);
        vm.updateUsers();
      };

      vm.updateUsers = () => {
        vm.socket.on('users', function(data) {
          for (var i = 0; i < data.length; i++) {
            console.log('vm is users on list', data[i]);
            vm.users.push(data[i]);
            console.log('USERSSSSSSSS', vm.users);
          }
        });
      };



    }])
})(window, window.angular);