(function() {
  'use strict';
  angular
  .module('slackOverflowApp')
    .directive('rating', function() {
      return {
        controller: 'ratingController',
        controllerAs: 'ratingCtrl',
        bindToController: true,
        templateUrl: '/public/components/templates/rating.html'
      }
    })
    .controller('ratingController', function(store, $scope) {
      
    })
})();