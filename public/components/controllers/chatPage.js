(function() {
  'use strict';
  angular
  .module('slackOverflowApp')

  .controller('chatPageController', ['store', '$scope', '$timeout', '$mdSidenav', 'chatService', '$rootScope', function (store, $scope, $timeout, $mdSidenav, chatService, $rootScope) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    const vm = this;
    vm.users = chatService.users;
    vm.messages = [{email: 'inseok', message: 'hello'}, {email: 'lois', message: 'hi!'}];
    vm.newMessage = undefined;
    vm.newMessageBody = undefined;
    vm.email = store.get('profile').email;

    vm.sendMessage = function() {
      console.log('THE MESSAGE: ', vm.newMessage, ' IS BEING SENT TO: ', vm.clickedUser);
      vm.newMessageBody = {email: vm.clickedUser, message: vm.newMessage}
      console.log('THIS IS MESSAGE BODY BEING SENT: ', vm.newMessageBody);
      chatService.sendMessage(vm.newMessageBody)
      vm.newMessage = '';
    };

    vm.clickedUser;
    vm.clickUser = function(user) {
      console.log('CLICKED USER: ', user);
      vm.clickedUser = user;
      console.log('VM.CLICKEDUSER: ', vm.clickedUser);
      $scope.toggleLeft();
    };

    $rootScope.$on(vm.email, function(event, data) {
      console.log('(chatPage) Receiving Message', data);
      $scope.$apply(function() {
        console.log('(chatPage) updating vm.messages: ', vm.messages);
        vm.messages.push(data);
        console.log('(chatPage) updated vm.messages: ', vm.messages)
      })
    });




    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  }])

})();


