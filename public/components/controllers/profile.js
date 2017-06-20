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

      function getFields(field) {
        console.log('vm.profile in getFields in profile.js', vm.profile);
        vm.fields = vm.profile.userInfo.fields;
        vm.fields.push(field);
        console.log('this is fields of a user', vm.fields);
        console.log('vm.profile after adding', vm.profile);
      };
      function addField(data) {
        console.log('profile FROM ADDFIELD', vm.profile);
        console.log('data', data);
        vm.profile.userInfo.fields.push(field);
      };
      function getSecretMessage() {
        $http.get('http://localhost:3456/api/private')
        .then(function(response) {
          vm.message = response.data.message;
        })
      };
      
    }]);
})();