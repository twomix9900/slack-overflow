angular.module('slackOverflowApp').service('QuestionsService', function($http, _) {
  
  var questionsObj;
  var fieldArray = [1, 5];
  var userInfo;
  var questionsList = [];

  var service = {
    getAllQuestions: function() {
      return $http.get('/questions', { cache: true })
        .then(function(resp) {
          questionsObj = resp;
        })
        .then(() => {
          for (var i = 0; i < questionsObj.results.length; i++) {
            var username;
            username = questionsObj.results[i].name;
            for (var j = 0; j < questionsObj.results[i].questions.length; j++) {
              if (questionsObj.results[i].questions[j].status === true) {
                if (fieldArray.indexOf(questionsObj.results[i].questions[j].fieldId) !== -1) {
                  var output = {};
                  output.name = username;
                  output.questionId = questionsObj.results[i].questions[j].id;
                  output.title = questionsObj.results[i].questions[j].title;
                  output.text = questionsObj.results[i].questions[j].text;
                  output.field = questionsObj.results[i].questions[j].field.name;
                  questionsList.push(output);
                }
              }
            }
          }
          // var sortedOutput = _.sortBy(questionsList, 'questionId');
          res.json({

          });
        })
    },

    getUserFields: function () {
      return $http.get('/users/1', { cache: true })
        .then((user) => {
          userInfo = user.data
        })
        .then(() => {
          for (var i = 0; i < userInfo.results.fields.length; i++) {
            fieldArray.push(userInfo.results.fields[i].id);
          }
        })
        .catch((err) => {
          console.error('error getting user fields ', err);
        })
    },
    
    getQuestion: function(id) {
      function questionMatchesParam(question) {
        return question.id === parseInt(id);
      }
  
      return service.getAllQuestions().then(function (questions) {
        return questions.find(questionMatchesParam)
      });

    }
  }
  
  return service;
})

