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
    vm.sendMessage = function() {
      console.log('SENDING');
      console.log(vm.newMessage);
      vm.newMessage = '';
    }


    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  }])

})();


