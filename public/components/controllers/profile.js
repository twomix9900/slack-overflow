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
      vm.profile = store.get('profile');

      function getFields() {
        userService.getUserInfo(vm.profile)
        .then((response) => {
          console.log('response is this', response);
          vm.profile = store.get('profile');
          console.log(vm.profile);
        }) 
        .catch((error) => {
          console.log('userService.getUserInfo fail', error);
        });
      };
      function addField() {
        console.log('userINFO FROM ADDFIELD', vm.profile.userInfo.fields);
      };
      function getSecretMessage() {
        $http.get('http://localhost:3456/api/private')
        .then(function(response) {
          vm.message = response.data.message;
        })
      };
      
    }]);
})();