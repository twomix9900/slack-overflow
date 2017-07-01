(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('toolbarController', ['auth', 'store', '$location', 'authService', 'userService', 'QuestionsService', 'chatService',
       function(auth, store, $location, authService, userService, QuestionsService, chatService) {

      var vm = this;
      vm.redirectHome = redirectHome;
      vm.login = login;
      vm.logout = logout;
      vm.auth = auth;
      // vm.registerUser = authService.registerUser;


      function redirectHome() {
        if (store.get('profile')) {
          userService.getUserInfo(store.get('profile'));
        }
        $location.path('/home1');
      }

      function login() {
        auth.signin({}, function(profile, token) {
          store.set('profile', profile);
          store.set('id_token', token);
          authService.registerUser(profile);
          $location.path('/home1');

          // userService.getUserInfo(profile);
          console.log('this is profile upon login', store.get('profile'));
        }, function(error) {
          console.log('login error', error);
        });
      };
      
      function logout() {
        // chatService.exitChatServer(store.get('profile').email);
        store.remove('profile');
        store.remove('id_token');
        auth.signout();
        $location.path('/home');
      };

    }])

    .directive('toolbar', function() {
      return {
        controller: 'toolbarController',
        controllerAs: 'toolbarCtrl',
        bindToController: true,
        templateUrl: '/public/components/templates/toolbar.html'
      }
    });

})();
