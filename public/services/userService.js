(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('userService', ['$http', 'store', function($http, store) {
      const vm = this;
      vm.profile;

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
          })
        

      }


    }]);
})();