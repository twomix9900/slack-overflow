(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['authProvider', function(authProvider) {
      authProvider.init({
        domain: 'twomix9900.auth0.com',
        clientID: 'sMPrpLV62uo43g5t3riJh3a3cprfPWYF'
      });
    }])


})();
