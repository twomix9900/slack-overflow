(function() {
  angular
    .module('slackOverflowApp')
    .service('authService', ['$http', 'userService', function($http, userService) {

      this.registerUser = (data) => {
        const user = {
          user: data.email
        };
        console.log('this is email from registerUser', user);
        return $http.post('/users', user)
          .then((success) => {
            userService.getUserInfo(data);
            return console.log('registerUser in authService success', success);
          })
          .catch((error) => {
            return console.log('registerUser in authService fail', error);
          });
      };


    }])
})();