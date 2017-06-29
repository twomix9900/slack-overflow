(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('home1Controller', ['store', '$timeout', function(store, $timeout) {
      var vm = this;
      // vm.profile = store.get('profile')
      $timeout(function() {
        vm.username = store.get('profile').userInfo.name;
        vm.reputation = store.get('profile').userInfo.reputation;
        vm.fields = store.get('profile').userInfo.fields;
        vm.phoneNumber = store.get('profile').userInfo.phoneNumber;
        
      }, 1000);
    }]);
})();

