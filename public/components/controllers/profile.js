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
        vm.profile = store.get('profile');
        vm.fields = vm.profile.userInfo.fields;
      };
      
      function addField(field) {
        let isUnique = true;
        for (let i = 0; i < vm.profile.userInfo.fields.length; i++) {
          if (vm.profile.userInfo.fields[i] === field) {
            isUnique = false;
          }
        }
        if (isUnique) {
          vm.profile.userInfo.fields.push(field);
          store.set('profile', vm.profile);
          userService.addField(field);
          vm.getFields();
        }
      };

      function removeField() {
        console.log('remove field');

      }
      
    }]);
})();