angular.module('slackOverflowApp').service('QuestionsService', ['$http', 'store', '$stateParams', 
  function($http, store, $stateParams) {
  
  // commented out functions have been moved to their appropriate controllers!


  // if(store.get('profile') !== null) {
  //   var fieldArray = store.get('profile').userInfo.fields;
  //   var currentUser = store.get('profile').userInfo;
  //   var userId = store.get('profile').userInfo.id;
  //   var currentUsername = store.get('profile').userInfo.name;
  //   var questionsObj;
  //   var answersObj;
  //   var questionsList = [];
  //   var currentQuestionAndAnswer = [];
  // }


  var service = {
    getAllQuestions: function() {
      // console.log('user fields ', currentUser);
      return $http.get('https://slackbetterflow.herokuapp.com/questions')
        // .then(function(resp) {
        //   questionsObj = resp.data;
        // })
        // .then(() => {
        //   questionsList = [];
        //   for (var i = 0; i < questionsObj.results.length; i++) {
        //     var questionUsername;
        //     questionUsername = questionsObj.results[i].name;
        //     for (var j = 0; j < questionsObj.results[i].questions.length; j++) {
        //       if (questionsObj.results[i].questions[j].status === true && questionUsername !== currentUsername) {
        //         if (fieldArray.indexOf(questionsObj.results[i].questions[j].field.name ) !== -1) {
        //           var output = {};
        //           output.name = questionUsername;
        //           output.questionId = questionsObj.results[i].questions[j].id;
        //           output.title = questionsObj.results[i].questions[j].title;
        //           output.text = questionsObj.results[i].questions[j].text;
        //           output.field = questionsObj.results[i].questions[j].field.name;
        //           questionsList.push(output);
        //         }
        //       }
        //     }
        //   }
        //   // var sortedOutput = _.sortBy(questionsList, 'questionId');  
        //   console.log('is this running ', questionsList);
        //   return questionsList;
        // })
        // .catch((err) => {
        //   console.error('error fetching questions ', err);
        // })
    },
    

    // getUserFields: function () {
    //   var username = store.get('profile').email;
    //   return $http.get('/users/name/' + username, { cache: true })
    //     .then((user) => {
    //       currentUser = user.data;
    //       userId = user.data.results.id;
    //     })
    //     .then(() => {
    //       for (var i = 0; i < currentUser.results.fields.length; i++) {
    //         fieldArray.push(currentUser.results.fields[i].id);
    //       }
    //     })
    //     .catch((err) => {
    //       console.error('error getting user fields ', err);
    //     })
    // },
    
    getQuestion: function() {
      return $http.get('https://slackbetterflow.herokuapp.com/questions/' + $stateParams.id)
        // .then((question) => {
        //   currentQuestionAndAnswer = question.data;
        // })
        // .then(() => {
        //   var output = {
        //     question: [],
        //     answer: []
        //   };
        //   var question = {};
        //   question.name = obj.results[0].name;
        //   question.reputation = obj.results[0].reputation;
        //   question.title = obj.results[0].questions[0].title;
        //   question.text = obj.results[0].questions[0].text;
        //   output.question.push(question);
        //   for (var i = 0; i < obj.results[0].questions[0].answers.length; i++) {
        //     var answer = {};
        //     answer.name = obj.results[0].questions[0].answers[i].user.name;
        //     answer.reputation = obj.results[0].questions[0].answers[i].user.reputation;
        //     answer.text = obj.results[0].questions[0].answers[i].text;
        //     output.answer.push(answer);
        //   }
        //   return output;
        // })
        // .catch((err) => {
        //   console.error('error fetching question and answers ', err);
        // })

      // function questionMatchesParam(question) {
      //   return question.id === parseInt(id);
      // }
  
      // return service.getAllQuestions().then(function (questions) {
      //   return questions.find(questionMatchesParam)
      // });

    },

    getQuestionsForUser: function (currentUserId) {
      // var userId = store.get('profile').userInfo.id;
      console.log('questions for user id: ', currentUserId);
      return $http.get('https://slackbetterflow.herokuapp.com/questions/user/' + currentUserId)
        // .then((resp) => {
        //   answersObj = resp.data;
        // })
        // .then(() => {
        //   var output = [];
        //   var name = answersObj.results[0].name;
        //   for (var i = 0; i < answersObj.results[0].questions.length; i++) {
        //     var question = {};
        //     question.name = name;
        //     question.id = answersObj.results[0].questions[i].id;
        //     question.title = answersObj.results[0].questions[i].title;
        //     question.text = answersObj.results[0].questions[i].text;
        //     question.field = answersObj.results[0].questions[i].field.name;
        //     output.push(question);
        //   }
        //   // var sortedOutput = _.sortBy(output, 'id');
        //   console.log(output);
        //   return output;
        // })
        // .catch((err) => {
        //   console.error('error fetching questions for user ', err);
        // })
    },

    postAnswer: function (body, questionId) {
      return $http.post('https://slackbetterflow.herokuapp.com/questions/' + questionId, body);
    },

    closeQuestion: function (questionId) {
      return $http.put('https://slackbetterflow.herokuapp.com/questions/close/' + questionId);
    },

    addRep: function (userId, repPts) {
      return $http.put('https://slackbetterflow.herokuapp.com/reputation', { id: userId, rep: repPts });
    },

    getRatingsToAnswer: function(answerId) {
      return $http.get('https://slackbetterflow.herokuapp.com/ratings/' + answerId);
    },

    createRatingToAnswer: function(userId, answerId, points) {
      return $http.put('https://slackbetterflow.herokuapp.com/answerRatings', { userId: userId, answerId: answerId, rating: points });
    },

    // updateRatingToAnswer: function(userId, answerId, points) {
    //   console.log('attempting to rate answer with data packet: ', userId, answerId, points);
    //   return $http.put('/ratings', { userId: userId, answerId: answerId, rating: points });
    // },

    updateAnswerTotalRating: function(answerId, points) {
      return $http.put('https://slackbetterflow.herokuapp.com/ratings', { answerId: answerId, rating: points });
    },

    getAnswerRating: function(userId, answerId) {
      console.log('attempting to make http request for answer rating by user')
      return $http.get('https://slackbetterflow.herokuapp.com/ratings/' + userId + '/' + answerId);
    }
    
  }
  
  return service;
}])

