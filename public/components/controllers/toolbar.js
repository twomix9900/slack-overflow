// (function() {
//   angular.module('slackOverflowApp')
//   .controller('toolbarController', ['auth', 'store', '$location', function(auth, store, $location) {
//     var vm = this;
//     vm.login = login;
//     vm.logout = logout;
//     vm.auth = auth;
//     function login() {
//       auth.signin({}, function(profile, token) {
//         store.set('profile', profile);
//         store.set('id_token', token);
//         $location.path('/home');
//         console.log('login');
//       }, function(error) {
//         console.log(error);
//       })
//     }
//     function logout() {
//       store.remove('profile');
//       store.remove('id_token');
//       auth.signout();
//       $location.path('/home');
//       console.log('logout');
//     }
//   }])
//   .directive('toolbar', function() {
//     return {
//       controller: 'toolbarController',
//       controllerAs: 'ctrl',
//       bindToController: true,
//       templateUrl: './public/components/templates/toolbar.html'
//     }
//   })
// })();

(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      templateUrl: '/public/components/templates/toolbar.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }
  function toolbarController(auth, store, $location) {
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;

    function login() {
      auth.signin({}, function(profile, token) {
        store.set('profile', profile);
        store.set('id_token', token);
        $location.path('/home');
      }, function(error) {
        console.log(error);
      });
    }

    function logout() {
      store.remove('profile');
      store.remove('id_token');
      auth.signout();
      $location.path('/home');
    }
  }
})();