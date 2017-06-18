(function() {

  angular.module('slackOverflowApp')
  .controller('profileController', ['$http', function($http) {
    var vm = this;
    vm.message = 'hello';
  }])
  .directive('profile', function() {
    return {

    }
  })
})();