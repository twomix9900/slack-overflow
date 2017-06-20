(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', 'userService', function($http, store, userService) {
      const vm = this;
      vm.profile = store.get('profile');
      vm.getFields = getFields;
      vm.addField = addField;
      vm.removeField = removeField;
      
      vm.message;
      vm.fields = vm.profile.userInfo.fields

      function getFields() {
        // console.log('vm.profile in getFields in profile.js', vm.profile);
        // vm.fields = vm.profile.userInfo.fields;
        // console.log('this is fields of a user', vm.fields);
        // console.log('vm.profile after adding', vm.profile);
        vm.profile = store.get('profile');
        console.log(vm.profile);
        vm.fields = vm.profile.userInfo.fields;
      };
      function addField(data) {
        let isUnique = true;
        for (let i = 0; i < vm.profile.userInfo.fields.length; i++) {
          if (vm.profile.userInfo.fields[i] === data) {
            isUnique = false;
          }
        }
        if (isUnique) {
          vm.profile.userInfo.fields.push(data);
        }
        store.set('profile', vm.profile);
        vm.getFields();
      };

      function removeField() {
        console.log('remove field');

      }
      
    }]);
})();