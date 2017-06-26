(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionAnsweredEntryCtrl', ['QuestionsService', 'store', '$stateParams', 'userService', 
      function(QuestionsService, store, $stateParams, userService) {
      
      var vm = this;
      vm.questionId = $stateParams.id;
      vm.questionAndAnswers;
      vm.notClicked = true;
      vm.repAdded = false;

      vm.closeQuestion = () => {
        QuestionsService.closeQuestion(vm.questionId) 
          .then(() => {
            console.log('successfully closed the question');
          })
          .catch((err) => {
            console.error('error closing question ', err);
          })
      }

      vm.addRep = (userId) => {
        vm.repAdded = true;
        QuestionsService.addRep(userId)
          .then(() => {
            vm.notClicked = false;
            console.log('successfully added reputation');
            userService.getUserInfo(store.get('profile'));
          })
      }

      QuestionsService.getQuestion()
        .then((question) => {
          obj = question.data;
          console.log(obj);
        })
        .then(() => {
          var output = {
            question: [],
            answer: []
          };
          var question = {};
          question.name = obj.results[0].name;
          question.image = obj.results[0].image;
          question.reputation = obj.results[0].reputation;
          question.title = obj.results[0].questions[0].title;
          question.text = obj.results[0].questions[0].text;
          question.status = obj.results[0].questions[0].status;
          output.question.push(question);
          for (var i = 0; i < obj.results[0].questions[0].answers.length; i++) {
            var answer = {};
            answer.userId = obj.results[0].questions[0].answers[i].userId;
            answer.name = obj.results[0].questions[0].answers[i].user.name;
            answer.image = obj.results[0].questions[0].answers[i].user.image;
            answer.reputation = obj.results[0].questions[0].answers[i].user.reputation;
            answer.text = obj.results[0].questions[0].answers[i].text;
            answer.id = obj.results[0].questions[0].answers[i].id;
            output.answer.push(answer);
          }
          vm.questionAndAnswers = output;
          console.log('question and answers ', vm.questionAndAnswers);
        })
        .catch((err) => {
          console.error('error fetching question and answers ', err);
        })

      vm.postAnswer = function () {
        var body = {
          userId: store.get('profile').userInfo.id,
          text: vm.answerBody
        }

        QuestionsService.postAnswer(body, vm.questionId)
        .then((answer) => {
          console.log('answer: ' , answer)
          console.log(vm.questionAndAnswers.answer)
          //get this to auto update ng-repeat
        })
      }

    }])
})();