(function() {
  angular
    .module('slackOverflowApp')
    .component('questionsAnsweredList', {
      bindings: { questions: '<'},
      templateUrl: '/public/components/templates/questionsAnsweredList.html'
    })
})();