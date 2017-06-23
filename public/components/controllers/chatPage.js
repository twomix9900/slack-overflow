(function() {
  'use strict';
  angular
  .module('slackOverflowApp')

  .controller('chatPageController', ['store', '$scope', '$timeout', '$mdSidenav', 'chatService', function (store, $scope, $timeout, $mdSidenav, chatService) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    const vm = this;
    vm.users = chatService.users;
    vm.messages = [{email: 'inseok', message: 'hello'}, {email: 'lois', message: 'hi!'}];
    vm.newMessage = undefined;
    vm.newMessageBody = undefined;

    vm.sendMessage = function() {
      console.log('SENDING');
      console.log('THIS IS MESSAGE', vm.newMessage);
      console.log('THIS IS SEND TO USER', vm.clickedUser);
      vm.newMessageBody = {email: vm.clickedUser, message: vm.newMessage}
      console.log('THIS IS MESSAGE BODY', vm.newMessageBody);
      chatService.sendMessage(vm.newMessageBody)
      vm.newMessage = '';
    };

    vm.clickedUser;
    vm.clickUser = function(user) {
      console.log('CLICKED USER', user);
      vm.clickedUser = user;
      console.log('IS IT SET CORRECTLY', vm.clickedUser);
    }


    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  }])

})();


