angular.module('slackOverflowApp').service('QuestionsService', function($http) {
  
  var questionsObj;
  var answersObj;
  var fieldArray = [];
  var currentUser;
  var questionsList = [];
  var currentQuestionAndAnswer = [];
  var userId;

  // hardcoded - going to have to grab user name from whatever auth0 returns 
  var username = 'jason';

  // hardcoding question id, going to have to grab it from the question list
  var questionId = 1;

  var service = {
    getAllQuestions: function() {
      return $http.get('/questions', { cache: true })
        .then(function(resp) {
          questionsObj = resp.data;
        })
        .then(() => {
          if (questionsList.length === 0) {
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
          } else {
            return questionsList;
          }
          // var sortedOutput = _.sortBy(questionsList, 'questionId');  
          return questionsList;
        })
        .catch((err) => {
          console.error('error fetching questions ', err);
        })
    },
    

    getUserFields: function () {
      return $http.get('/users/name/' + username, { cache: true })
        .then((user) => {
          currentUser = user.data;
          userId = user.data.results.id;
        })
        .then(() => {
          for (var i = 0; i < currentUser.results.fields.length; i++) {
            fieldArray.push(currentUser.results.fields[i].id);
          }
        })
        .catch((err) => {
          console.error('error getting user fields ', err);
        })
    },
    
    getQuestion: function() {
      return $http.get('/questions/' + userId, { cache: true })
        .then((question) => {
          currentQuestionAndAnswer = question.data;
        })
        .then(() => {
          var output = [];
          var question = {};
          question.name = obj.results[0].name;
          question.reputation = obj.results[0].reputation;
          question.title = obj.results[0].questions[0].title;
          question.text = obj.results[0].questions[0].text;
          output.push(question);
          for (var i = 0; i < obj.results[0].questions[0].answers.length; i++) {
            var answer = {};
            answer.name = obj.results[0].questions[0].answers[i].user.name;
            answer.reputation = obj.results[0].questions[0].answers[i].user.reputation;
            answer.text = obj.results[0].questions[0].answers[i].text;
            output.push(answer);
          }
          return output;
        })
        .catch((err) => {
          console.error('error fetching question and answers ', err);
        })

      // function questionMatchesParam(question) {
      //   return question.id === parseInt(id);
      // }
  
      // return service.getAllQuestions().then(function (questions) {
      //   return questions.find(questionMatchesParam)
      // });

    },

    getQuestionsForUser: function () {
      console.log('questions for user !!!!');
      return $http.get('/questions/user/' + userId, { cache: true })
        .then((resp) => {
          answersObj = resp.data;
        })
        .then(() => {
          var output = [];
          var name = answersObj.results[0].name;
          for (var i = 0; i < answersObj.results[0].questions.length; i++) {
            var question = {};
            question.name = name;
            question.id = answersObj.results[0].questions[i].id;
            question.title = answersObj.results[0].questions[i].title;
            question.text = answersObj.results[0].questions[i].text;
            question.field = answersObj.results[0].questions[i].field.name;
            output.push(question);
          }
          // var sortedOutput = _.sortBy(output, 'id');
          console.log(output);
          return output;
        })
        .catch((err) => {
          console.error('error fetching questions for user ', err);
        })
    }
    
  }
  
  return service;
})

