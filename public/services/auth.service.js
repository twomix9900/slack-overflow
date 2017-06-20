(function() {
  angular
    .module('slackOverflowApp')
    .service('authService', ['$http', function($http) {

      this.registerUser = (data) => {
        const user = {
          user: data.email
        };
        console.log('this is email from registerUser', user);
        return $http.post('/users', user)
        .then((success) => {
          return console.log('registerUser in authService success', success);
        })
        .catch((error) => {
          return console.log('registerUser in authService fail', error);
        })
      };


    }])
})();