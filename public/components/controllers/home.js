(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('homeController', ['store', '$timeout', function(store, $timeout) {
      var vm = this;

      // $timeout(function() {
      //   vm.username = store.get('profile').userInfo.name;
      //   vm.reputation = store.get('profile').userInfo.reputation;
      //   vm.fields = store.get('profile').userInfo.fields;
        
      // }, 100);
      
    }]);
})();