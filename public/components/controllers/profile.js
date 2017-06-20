(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', 'userService', function($http, store, userService) {
      const vm = this;
      vm.getSecretMessage = getSecretMessage;
      vm.getFields = getFields;
      vm.addField = addField;
      vm.message;
      vm.fields;
      vm.profile = store.get('profile');

      function getFields() {
        console.log('vm.profile in getFields in profile.js', vm.profile);
        vm.fields = vm.profile.userInfo.fields;
        console.log('this is fields of a user', vm.fields);
        vm.fields.push('javascript');
        vm.fields.push('c++');
      };
      function addField() {
        console.log('profile FROM ADDFIELD', vm.profile);
      };
      function getSecretMessage() {
        $http.get('http://localhost:3456/api/private')
        .then(function(response) {
          vm.message = response.data.message;
        })
      };
      
    }]);
})();