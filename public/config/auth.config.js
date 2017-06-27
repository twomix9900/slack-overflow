(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['authProvider', function(authProvider) {
      authProvider.init({
        domain: 'inseok-ucla.auth0.com',
        clientID: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
      });
    }])


})();