angular.module('slackOverflowApp').component('questionsAskedList', {
  //bindings: { questions: '<'},
  template: 
  '<h3>Questions Asked:</h3>' +
  '<ul>' +
    '<li ng-repeat="question in $ctrl.questions">' +
      '<a ui-sref="question({questionId: question.id})">' +
        '{{question.title}}' +
      '</a>' +
    '</li>' +
  '</ul>'
})

