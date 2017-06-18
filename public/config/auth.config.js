(function() {
  angular.module('slackOverflowApp')
  .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './public/components/templates/slackOverflow.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: './public/components/templates/profile.html',
        controllerAs: 'profileController as user'
      })
  })

})();