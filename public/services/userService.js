(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('userService', ['$http', 'store', function($http, store) {

      this.getUserInfo = (data) => {
        console.log('data transferred', data)
        let userName = data.email;
        return $http.get(`/users/name/${userName}`)
          .then((response) => {
            console.log('getUserInfo success', response);
          })
          .catch((error) => {
            console.log('getUserInfo fail', error);
          })
        

      }


    }]);
})();