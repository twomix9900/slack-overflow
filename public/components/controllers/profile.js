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
        let isUnique = true;
        for (let i = 0; i < vm.profile.userInfo.fields.length; i++) {
          if (vm.profile.userInfo.fields[i] === data) {
            isUnique = false;
          }
        }
        isUnique ? vm.profile.userInfo.fields.push(data) : console.log('not unique');
        vm.getFields();
      };
      
    }]);
})();