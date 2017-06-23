(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionsAskedListCtrl', ['QuestionsService', 'store', function(QuestionsService, store) {
      var vm = this;
      vm.questionsList = [];
      vm.userId = store.get('profile').userInfo.Id;
      vm.currentUsername = store.get('profile').userInfo.name;
      vm.fieldArray = store.get('profile').userInfo.fields;
      vm.questionsObj;

      QuestionsService.getAllQuestions()
        .then(function(resp) {
          vm.questionsObj = resp.data;
          // console.log('RESP', resp);
          // console.log('Vm.QUESTIONOBJ', vm.questionObj);
        })
        .then(() => {
          // console.log('vm.fieldArray ', vm.fieldArray);
          vm.questionsList = [];
          for (var i = 0; i < vm.questionsObj.results.length; i++) {
            var questionUsername;
            questionUsername = vm.questionsObj.results[i].name;
            for (var j = 0; j < vm.questionsObj.results[i].questions.length; j++) {
              if (vm.questionsObj.results[i].questions[j].status === true && questionUsername !== vm.currentUsername) {
                if (vm.fieldArray.indexOf(vm.questionsObj.results[i].questions[j].field.name ) !== -1) {
                  var output = {};
                  output.name = questionUsername;
                  output.id = vm.questionsObj.results[i].questions[j].id;
                  output.title = vm.questionsObj.results[i].questions[j].title;
                  output.text = vm.questionsObj.results[i].questions[j].text;
                  output.field = vm.questionsObj.results[i].questions[j].field.name;
                  vm.questionsList.push(output);
                }
              }
            }
          }
          // console.log('is this running ', vm.questionsList);
        })
        .catch((err) => {
          console.error('error fetching questions ', err);
        })
    
  }])
})()
