(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', function($http, store) {
      const vm = this;
      vm.getMessage = getMessage;
      vm.getSecretMessage = getSecretMessage;
      vm.message;
      vm.profile = store.get('profile');

      function getMessage() {
        $http.get('http://localhost:3456/api/public', {
          skipAuthorization: true
        })
        .then(function(response) {
          vm.message = response.data.message;
        })
      }

      function getSecretMessage() {
        $http.get('http://localhost:3456/api/private')
        .then(function(response) {
          vm.message = response.data.message;
        })
      }
      
    }]);
})();