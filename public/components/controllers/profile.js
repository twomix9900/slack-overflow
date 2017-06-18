// (function() {

//   angular.module('slackOverflowApp')
//   .controller('profileController', ['$http', function($http) {
//     var vm = this;
//     vm.message = 'hello';
//   }])
//   .directive('profile', function() {
//     return {

//     }
//   })
// })();

(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', profileController);

  function profileController($http) {
    var vm = this;
    vm.message = 'Hello!';
  }
})();