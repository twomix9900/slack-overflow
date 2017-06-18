angular.module('slackOverflowApp').component('questionsAskedList', {
  bindings: { questions: '<'},

  template: 
  '<h3>RENDER QUESTIONS ASKED LIST:</h3>' +
  '<ul>' +
    '<li ng-repeat="question in $ctrl.questions">' +
      '<a ui-sref="questionAskedEntry({questionId: question.id})">' +
        '{{question.title}}' +
      '</a>' +
    '</li>' +
  '</ul>'
})

