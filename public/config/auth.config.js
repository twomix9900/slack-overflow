(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['authProvider', function(authProvider) {
      authProvider.init({
        domain: 'nalp.auth0.com',
        clientID: 'p3YX25mAFylU7F6GadLITKleuETnTKiT'
      });
    }])


})();