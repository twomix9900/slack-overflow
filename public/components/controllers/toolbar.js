(function() {
  angular.module('slackOverflowApp')
  .controller('toolbarController', function() {

  })
  .directive('toolbar', function() {
    return {
      controller: 'toolbarController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: './public/components/templates/toolbar.html'
    }
  })
})();