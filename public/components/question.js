angular.module('slackOverflowApp').component('question', {
  bindings: { question: '<' },
  template: 
  '<h3>A Question!</h3>' +
  '<div>Title: {{$ctrl.question.title}}</div>' +
  '<div>Text: {{$ctrl.question.body}}</div>' +
  '<div>Status: {{$ctrl.question.status}}</div>' +
  '<button ui-sref="questionsAskedList">Close</button>'
});