(function() {
  'use strict';
  angular
  .module('slackOverflowApp')

  .controller('chatPageController', ['store', '$scope', '$timeout', '$mdSidenav', 'chatService', '$rootScope', function (store, $scope, $timeout, $mdSidenav, chatService, $rootScope) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    const vm = this;
    vm.users = chatService.users;
    vm.newMessage = undefined;
    vm.newMessageBody = undefined;
    vm.email = store.get('profile').email;
    vm.messages = chatService.messages[vm.email];

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

    $rootScope.$on(vm.email, function(event, messageBody) {
      console.log('(chatPage) Receiving Message, messageBody: ', messageBody);
      $scope.$apply(function() {
        console.log('(chatPage) updating vm.messages: ', vm.messages);
        vm.messages = chatService.messages[vm.email];
        console.log('(chatPage) updated vm.messages: ', vm.messages)
      })
    });
    $rootScope.$on('updateUsers', function(event, users) {
      console.log('(chatPage) Received userinformation: ', users);
      $scope.$apply(function() {
        vm.users = users;
      });
    })

    // $scope.$watch(function() {
    //   return vm.users;
    // }, function() {
    //   if (vm.users) {
    //     console.log('This is vm.users on WATCH', vm.users);
    //   }
    // });



    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  }])

})();


