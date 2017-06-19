(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('toolbarController', ['auth', 'store', '$location', function(auth, store, $location) {
      var vm = this;
      vm.redirectHome = redirectHome;
      vm.login = login;
      vm.logout = logout;
      vm.auth = auth;

      function redirectHome() {
        $location.path('/home');
        console.log('ha');
      }

      function login() {
        auth.signin({}, function(profile, token) {
          store.set('profile', profile);
          store.set('id_token', token);
          $location.path('/home');
        }, function(error) {
          console.log('login error', error);
        });
      };
      
      function logout() {
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