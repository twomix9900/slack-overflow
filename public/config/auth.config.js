(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['authProvider', function(authProvider) {
      authProvider.init({
        domain: 'bananafish2828.auth0.com',
        clientID: 'sI5ktAqaNr9Fo4Mr9NWKPDCQGNE9cGLT'
      });
    }])


})();