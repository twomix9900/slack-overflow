(function() {
  angular
    .module('slackOverflowApp')
    .component('questionAskedEntry', {
    bindings: { question: '<' },
    templateUrl: '/public/components/templates/questionAskedEntry.html'
  });
})();