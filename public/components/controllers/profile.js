(function () {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('profileController', ['$http', 'store', 'userService', function ($http, store, userService) {
      const vm = this;
      vm.profile = store.get('profile');
      vm.getFields = getFields;
      vm.addField = addField;
      vm.removeField = removeField;
      vm.updatePhoneNumber = updatePhoneNumber;

      vm.message;
      vm.fields = vm.profile.userInfo.fields;

      function getFields() {
        console.log('getFields invoked');
        vm.profile = store.get('profile');
        vm.fields = vm.profile.userInfo.fields;
        vm.phoneNumber = vm.profile.userInfo.phoneNumber;
        console.log('vm.phoneNumber = ', vm.phoneNumber)
      };
      vm.getFields();

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
          return userService.addField(field)
            .then((response) => {
              vm.getFields();
              console.log('addField in profile success', response);
            })
            .catch((error) => {
              console.log('addField in profile fail', error);
            });
        }
      };

      function removeField(field) {
        const index = vm.profile.userInfo.fields.indexOf(field);
        vm.profile.userInfo.fields.splice(index, 1);
        store.set('profile', vm.profile);
        userService.removeField();
      };

      function updatePhoneNumber(data) {
        vm.profile = store.get('profile');
        vm.profile.userInfo.phoneNumber = data;
        store.set('profile', vm.profile);

        userService.updatePhoneNumber(data)
          .then((response) => {
            return console.log('updatePhoneNumber in profile.js success', response);
          })
          .catch((error) => {
            return console.log('updatePhoneNumber in profile.js fail', error);
          });
      }
    }]);
})();