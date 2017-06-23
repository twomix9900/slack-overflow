// (function() {
//   'use strict';
//   angular
//     .module('slackOverflowApp')
//     .controller('postQuestionController', ['$http', 'store', '$scope', function($http, store, $scope) {

//       $scope.submitAnswer = function(questionId) {
//         console.log($scope.answerBody, store.get('profile').userInfo.id)
//         if ($scope.fieldId) {
//           var req = {
//             method: 'POST',
//             url: '/questions',
//             data: {
//               userId : store.get('profile').userInfo.id,
//               title: title,
//               text: body,
//               fieldId: $scope.fieldId
//             }
//           };

//           $http(req)
//           .then((resp) => {
//             console.log('insert error handing or success here', resp)
//           })
//           .catch((error) => {
//             console.log('error posting a question', error);
//           });
//         } else {
//           console.log('select field');
//         }
//       };
      
//     }]);
// })();

// //need userid, questionid, answer body