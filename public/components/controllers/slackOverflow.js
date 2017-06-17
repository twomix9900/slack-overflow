angular.module('slackOverflowApp')
.controller('slackOverflowController', function() {

})
.directive('slackOverflow', function() {
  return {
    scope: {},
    controller: 'slackOverflowController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: './public/components/templates/slackOverflow.html'
  }
})