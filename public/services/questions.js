angular.module('slackOverflowApp').service('QuestionsService', function($http, _) {
  
  var questionsArray = [];
  var fieldArray = [];

  var service = {
    getAllQuestions: function() {
      return $http.get('/questions', { cache: true }).then(function(resp) {
        questionsArray = resp.data;
      })
        .then(() => {

        })
    },

    getUserFields: function () {
      return $http.get('/users/1', { cache: true })
        .then((user) => {
          
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

