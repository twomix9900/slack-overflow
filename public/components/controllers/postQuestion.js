(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('postQuestionController', ['$http', 'store', '$scope', function($http, store, $scope) {

      $scope.submitQuestion = function(title, body) {
        console.log(title, ' ', body, ' ', $scope.fieldId, ' ', store.get('profile').userInfo.id)
        
        var req = {
          method: 'POST',
          url: '/questions',
          data: {
            userId : store.get('profile').userInfo.id,
            title: title,
            text: body,
            fieldId: $scope.fieldId
          }
        }

        $http(req)
        .then((resp) => {
          var questionObj = resp.data
          console.log(questionObj)
        })
      }
      
    }]);
})();