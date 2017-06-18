(function() {
  angular
    .module('slackOverflowApp')
    .component('questionsAskedList', {
    bindings: { questions: '<'},
    templateUrl: '/public/components/templates/questionsAskedList.html'
  })
})();
