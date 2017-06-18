// (function() {

// angular.module('slackOverflowApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
//   .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
//     authProvider.init({
//       domain: 'inseok-ucla.auth0.com',
//       clientID: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
//     });
//     $urlRouterProvider.otherwise('/home');
//     $stateProvider
//       .state('home', {
//         url: '/home',
//         templateUrl: './public/components/templates/slackOverflow.html'
//       })
//       .state('profile', {
//         url: '/profile',
//         templateUrl: './public/components/templates/profile.html',
//         controllerAs: 'profileController as user'
//       })
//   })

// })();
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
      })
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