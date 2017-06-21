(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionEntryCtrl', ['QuestionsService', 'store', '$stateParams', 
      function(QuestionsService, store, $stateParams) {
      
      var vm = this;
      vm.questionId = $stateParams.id;
      vm.questionAndAnswers;
      
      QuestionsService.getQuestion()
        .then((question) => {
          obj = question.data;
        })
        .then(() => {
          var output = {
            question: [],
            answer: []
          };
          var question = {};
          question.name = obj.results[0].name;
          question.reputation = obj.results[0].reputation;
          question.title = obj.results[0].questions[0].title;
          question.text = obj.results[0].questions[0].text;
          output.question.push(question);
          for (var i = 0; i < obj.results[0].questions[0].answers.length; i++) {
            var answer = {};
            answer.name = obj.results[0].questions[0].answers[i].user.name;
            answer.reputation = obj.results[0].questions[0].answers[i].user.reputation;
            answer.text = obj.results[0].questions[0].answers[i].text;
            output.answer.push(answer);
          }
          vm.questionAndAnswers = output;
          console.log('question and answers ', vm.questionAndAnswers);
        })
        .catch((err) => {
          console.error('error fetching question and answers ', err);
        })

    }])
})();