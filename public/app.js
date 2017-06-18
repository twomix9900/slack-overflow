(function() {
  'use strict';
  angular
    .module('slackOverflowApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .run(function($rootScope, auth, store, jwtHelper, $location) {

      $rootScope.$on('$locationChangeStart', function() {
        var token = store.get('id_token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          }
        } else {
          $location.path('/home');
        }
      })
      
    });
})();
