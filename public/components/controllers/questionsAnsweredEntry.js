(function() {
  angular
    .module('slackOverflowApp')
    .component('questionsAnsweredEntry', {
      bindings: { question: '<' },
      templateUrl: '/public/components/templates/questionAskedEntry.html'
    });
})();