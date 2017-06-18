angular.module('slackOverflowApp').component('questionsAskedList', {
  bindings: { questions: '<'},

  template: 
  '<h3>RENDER QUESTIONS ASKED LIST:</h3>' +
  '<ul>' +
    '<li ng-repeat="question in $ctrl.questions">' +
      '<a ui-sref="question({questionId: question.id})">' +
        '{{question.title}}' +
         // '{{question.id}}' + 
      '</a>' +
    '</li>' +
  '</ul>'
})

