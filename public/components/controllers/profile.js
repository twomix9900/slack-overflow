(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', 'userService', function($http, store, userService) {
      const vm = this;
      vm.getFields = getFields;
      vm.addField = addField;

      vm.message;
      vm.fields;
      vm.profile = store.get('profile');

      function getFields() {
        console.log('vm.profile in getFields in profile.js', vm.profile);
        vm.fields = vm.profile.userInfo.fields;
        console.log('this is fields of a user', vm.fields);
        console.log('vm.profile after adding', vm.profile);
      };
      function addField(data) {
        console.log('profile FROM ADDFIELD', vm.profile);
        console.log('data', data);
        vm.profile.userInfo.fields.push(data);
        vm.getFields();
      };
      
    }]);
})();