angular.module('slackOverflowApp').service('QuestionsService', function($http) {
  
  //var questionsArray = [];

  var service = {
    getAllQuestions: function() {
      console.log('service get all questions')
      return $http.get('/questions', { cache: true }).then(function(resp) {
        return resp.data;
      });
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
