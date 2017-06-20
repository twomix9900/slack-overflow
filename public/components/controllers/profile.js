(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', 'userService', function($http, store, userService) {
      const vm = this;
      vm.getSecretMessage = getSecretMessage;
      vm.getFields = getFields;
      vm.message;
      vm.profile = store.get('profile');

      function getFields() {
        // $http.get('http://localhost:3456/users/:id', {
        //   skipAuthorization: true
        // })
        // .then(function(response) {
        //   vm.message = response.data.message;
        // })
        userService.getUserInfo(vm.profile);
      }

      function getSecretMessage() {
        $http.get('http://localhost:3456/api/private')
        .then(function(response) {
          vm.message = response.data.message;
        })
      }
      
    }]);
})();