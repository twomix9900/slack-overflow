(function() {
  'use strict';
  angular
  .module('slackOverflowApp')

  .controller('profilePageController', function (store, $scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    setTimeout(function(){
      $scope.email = store.get('profile').email;
      $scope.emailVerified = store.get('profile').email_verified;
      $scope.createdAt = store.get('profile').created_at;
      $scope.nickname = store.get('profile').nickname;
      $scope.picture = store.get('profile').picture;
      $scope.reputation = store.get('profile').userInfo.reputation;
      $scope.fields = store.get('profile').userInfo.fields;
      $scope.phoneNumber = store.get('profile').userInfo.phoneNumber;
    }, 1000);

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  })
  .directive('profilePage', function() {
      return {
        controller: 'profilePageController',
        controllerAs: 'profilePageCtrl',
        bindToController: true,
        templateUrl: '/public/components/templates/profilePage.html'
      }
    });
})();

