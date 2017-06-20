(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('userService', ['$http', 'store', function($http, store) {
      const vm = this;
      vm.profile;
      vm.fields = {
        javascript: 1,
        backbone: 2,
        css: 3,
        html: 4,
        react: 5,
        angular: 6,
        nodejs: 7,
        sql: 8,
        nosql: 9
      };

      this.getUserInfo = (data) => {
        console.log('data transferred', data)
        let userName = data.email;
        return $http.get(`/users/name/${userName}`)
        .then((response) => {
          console.log('getUserInfo in userService success', response);
          vm.profile = store.get('profile');
          vm.profile.userInfo = response.data.results;
          store.set('profile', vm.profile);
          return vm.profile
        })
        .catch((error) => {
          console.log('getUserInfo in userService fail', error);
        });
      };

      this.addField = (field) => {
        vm.profile = store.get('profile');
        let userId = vm.profile.userInfo.id;
        console.log('this is field', field);
        let fieldId = vm.fields[field];
        console.log('this is fieldId', fieldId);
        console.log('userId', userId);
        console.log('profile', vm.profile);
        let data = {
          userId: userId,
          fieldId: fieldId
        }

      }


    }]);
})();