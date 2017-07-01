(function () {
  'use strict';
  angular
    .module('slackOverflowApp')

    .controller('chatPageController', ['store', '$scope', '$timeout', '$mdSidenav', 'chatService', '$rootScope', 'userService', '$state', function (store, $scope, $timeout, $mdSidenav, chatService, $rootScope, userService, $state) {
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');
      const vm = this;

      // vm.users = chatService.users;
      vm.newMessage = undefined;
      vm.newMessageBody = undefined;
      vm.email = store.get('profile').email;
      // vm.messages = chatService.messages[vm.email];

      var err_callback = function (err) {
        console.log(err, '<< error');
      }

      // vm.sendMessage = function() {
      //   console.log('THE MESSAGE: ', vm.newMessage, ' IS BEING SENT TO: ', vm.clickedUser);
      //   vm.newMessageBody = {email: vm.clickedUser, message: vm.newMessage}
      //   console.log('THIS IS MESSAGE BODY BEING SENT: ', vm.newMessageBody);
      //   chatService.sendMessage(vm.newMessageBody)
      //   vm.newMessage = '';
      // };

      userService
        .host_index()
        .then(host_index_res, err_callback)

      function host_index_res(res) {
        console.log(res);
        vm.all_users = res.data.users;
      }

      //hosting lobby
      vm.host_lobby = function () {
        console.log(vm.email, '<<< email in local storage')
        userService
          .update_host(vm.email, { is_hosting: true, name: vm.email }) // something here
          .then(host_lobby_res, err_callback)
      }

      function host_lobby_res(res) {
        console.log(res);
        userService
          .connect_to_socket(res.data.user.name)
          .then(connection_to_socket_res, err_callback)
      }

      function connection_to_socket_res(res) {
        console.log(res, '< con to soc')
        $state.go('actual-chat-room', { host_id: res.data.host.name });
      }

      // joining lobby
      vm.join_lobby = function (evt, user) {
        userService
          .connect_to_socket(user.name)
          .then(join_lobby_res, err_callback)
      }

      function join_lobby_res(res) {
        userService
          .update_host(user.name, { is_hosting: false })
          .then(function (res) {
            $state.go('actual-chat-room', { host_id: user.name });
          }, err_callback)
      }



      vm.clickedUser;
      vm.clickUser = function (user) {
        console.log('CLICKED USER: ', user);
        vm.clickedUser = user;
        console.log('VM.CLICKEDUSER: ', vm.clickedUser);
        $scope.toggleLeft();
      };

      $rootScope.$on(vm.email, function (event, messageBody) {
        console.log('(chatPage) Receiving Message, messageBody: ', messageBody);
        $scope.$apply(function () {
          console.log('(chatPage) updating vm.messages: ', vm.messages);
          // vm.messages = chatService.messages[vm.email];
          console.log('(chatPage) updated vm.messages: ', vm.messages)
        })
      });
      $rootScope.$on('updateUsers', function (event, users) {
        console.log('(chatPage) Received userinformation: ', users);
        $scope.$apply(function () {
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
        return function () {
          $mdSidenav(componentId).toggle();
        };
      }
    }])

})();


