(function() {
  angular
    .module('slackOverflowApp')
    .service('authService', ['$http', function($http) {
      const registerUser = (data) => {
        return $http.post('/users', data)
        .then((success) => {
          return console.log('registerUser in authService success', success);
        })
        .catch((error) => {
          return console.log('registerUser in authService fail', error);
        })
      }
    }])
})();