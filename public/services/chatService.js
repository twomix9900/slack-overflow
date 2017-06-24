(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {
      const vm = this;
      vm.socket = window.io('localhost:3456/');
      vm.users = [];
      vm.email;
      vm.messages = [];
      


      vm.joinChatServer = (email) => {
        vm.socket.emit("join", email);
        vm.updateUsers();
        vm.email = email;
        vm.socket.on(vm.email, function(messageBody) {
          console.log('IS THIS TRIGGEREDDDDDDD, ROOTSCOPE');
          console.log('MEESSSAGE BODY', messageBody);
          $rootScope.$emit(vm.email, messageBody);

        });
      };

      vm.exitChatServer = (email) => {
        vm.socket.emit("exit", email);
        vm.updateUsers();
      };

      vm.sendMessage = (messageBody) => {
        console.log('SEND MESSAGE IN SERVICE', messageBody);
        vm.email = messageBody.email;
        vm.message = messageBody.message;
        console.log('SEND TO ', vm.email, 'THE MESSAGE IS ', vm.message);
        vm.socket.emit('newMessage', messageBody);
      }

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