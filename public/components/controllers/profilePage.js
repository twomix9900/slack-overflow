(function() {
  'use strict';
  angular
  .module('slackOverflowApp')

  .controller('profilePageController', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

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


