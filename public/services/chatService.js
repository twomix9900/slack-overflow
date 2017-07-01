(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('chatService', ['$rootScope', function($rootScope) {
      const vm = this;
      // vm.socket = window.io('localhost:3456/');
      vm.users = [];
      vm.email;
      vm.messages = {};
      


      // vm.joinChatServer = (email) => {
      //   vm.email = email;
      //   vm.socket.emit("join", email);
      //   vm.messages[vm.email] = [];
        
      //   vm.socket.on('users', function(data) {
      //     console.log('updating users', vm.users);
      //     vm.users = data;
      //     console.log('updated users', vm.users);
      //     $rootScope.$emit('updateUsers', vm.users);
      //   });

      //   vm.socket.on(vm.email, function(messageBody) {
      //     console.log('(chatService) Received Message to: ', messageBody.email, ' The Message: ', messageBody.message, ' From: ', messageBody.from);
      //     console.log('(chatService) Is $rootScope.$emit working?');
      //     vm.messages[vm.email].push(messageBody);
      //     console.log('VM MESSAGEEEEEEEEE IN CHAT SERVICE', vm.messages);
      //     $rootScope.$emit(vm.email, messageBody);
      //   });
      // };

      // vm.exitChatServer = (email) => {
      //   vm.socket.emit('exitChatServer', email);
      // };

      // vm.sendMessage = (messageBody) => {
      //   console.log('(chatService) Sending Message, messageBody: ', messageBody);
      //   console.log('(chatService) SEND TO: ', vm.email, ' THE MESSAGE IS ', vm.message);
      //   vm.socket.emit('newMessage', messageBody);
      // }

      // vm.updateUsers = () => {
      //   vm.socket.on('users', function(data) {
      //     if (vm.users.length === 0) {
      //       vm.users.push(data[0]);
      //     }
      //     for (var i = 0; i < data.length; i++) {
      //       for (var j = 0; j < vm.users.length; j++) {
      //         if (data[i] !== vm.users[j]) {
      //           vm.users.push(data[i]);
      //         }
      //       }
      //     }
      //   });
      // };



    }])
})(window, window.angular);