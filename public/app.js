(function() {
  'use strict';
  angular
    .module('slackOverflowApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
      authProvider.init({
        domain: 'inseok-ucla.auth0.com',
        clientID: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
      })

      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('id_token');
      }

      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: './public/components/templates/slackOverflow.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: './public/components/templates/profile.html',
          controller: 'profileController as user'
        });


      function redirect($q, $injector, $timeout, store, $location) {
        var auth;
        $timeout(function() {
          auth = $injector.get('auth');
        });
        return {
          responseError: function(rejection) {
            if (rejection.status === 401) {
              auth.signout();
              store.remove('profile');
              store.remove('id_token');
              $location.path('/home');
            }
            return $q.reject(rejection);
          }
        }
      }
      $provide.factory('redirect', redirect);
      $httpProvider.interceptors.push('redirect');
      $httpProvider.interceptors.push('jwtInterceptor');
    })
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