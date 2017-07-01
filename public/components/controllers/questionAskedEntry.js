(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionAskedEntryCtrl', ['QuestionsService', 'store', '$stateParams', '$scope', '$window','userService', 
      function(QuestionsService, store, $stateParams, $scope, $window, userService) {
      
      var vm = this;
      vm.questionId = $stateParams.id;
      vm.questionAndAnswers;
      vm.currentUser = store.get('profile').userInfo.id;
      
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
            answer.rating = obj.results[0].questions[0].answers[i].totalRating;
            // QuestionsService.getRatingsToAnswer(answer.id)
            //  .then((ratings) => {
            //     var AnswerRatings = ratings.data.data
            //     answer.rating = AnswerRatings.reduce((acc, cur) => {
            //       return acc + Number(cur.rating);
            //     }, 0);
            //    console.log('array', answer.rating);
            //  });
            QuestionsService.getAnswerRating(vm.currentUser, answer.id)
            .then((data) => {
              vm.data = data.data.data;
              if (vm.data == 1) { $scope.o1 = 'selected'; $scope.o2 = 'normal'; $scope.o3 = 'normal'; $scope.o4 = 'normal'; $scope.o5 = 'normal' };
              if (vm.data === 2) { $scope.o2 = 'selected'; $scope.o1 = 'normal'; $scope.o3 = 'normal'; $scope.o4 = 'normal'; $scope.o5 = 'normal' };
              if (vm.data === 3) { $scope.o3 = 'selected'; $scope.o1 = 'normal'; $scope.o2 = 'normal'; $scope.o4 = 'normal'; $scope.o5 = 'normal' };
              if (vm.data === 4) { $scope.o4 = 'selected'; $scope.o1 = 'normal'; $scope.o2 = 'normal'; $scope.o3 = 'normal'; $scope.o5 = 'normal' };
              if (vm.data === 5) { $scope.o5 = 'selected'; $scope.o1 = 'normal'; $scope.o2 = 'normal'; $scope.o3 = 'normal'; $scope.o4 = 'normal' };
              console.log('data to be manipulated', vm.data.data);          
            })
            output.answer.push(answer);
          }
          vm.questionAndAnswers = output;
          console.log('question and answers ', vm.questionAndAnswers);
        })
        .catch((err) => {
          console.error('error fetching question and answers ', err);
        })

      vm.addRating = (curr_id, answerId, points) => {
        console.log('inside addRating', vm.currentUser, answerId, points)
          QuestionsService.createRatingToAnswer(vm.currentUser, answerId, points)
          .then(() => {
            console.log('success in updating');
            QuestionsService.getRatingsToAnswer(answerId)
            .then((ratings) => {
              console.log('attempting to update ratings');
              let AnswerRatings = ratings.data.data
              let total_rating = AnswerRatings.reduce((acc, cur) => {
                return acc + Number(cur.rating);
              }, 0);
              console.log('total rating', total_rating, 'for answer #', answerId, 'made by', vm.currentUser);
              QuestionsService.updateAnswerTotalRating(answerId, total_rating)
              .then(() => {
                console.log('success updating total rating')
                userService.getUserInfo(store.get('profile'));
              })
            });
          })
      }

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

      // vm.getSelectedRating = (answerId) => {
      //   QuestionsService.getAnswerRating(vm.currentUser, answerId)
      //   .then((ratings) => {
      //     let AnswerRatings = ratings.data.data;
      //     for (var idx = 0; idx < AnswerRatings.length; idx ++) {
      //       if (AnswerRatings[idx].userId === vm.currentUser) {
      //         var option = AnswerRatings.rating / 5;
      //       }
      //     }
      //     console.log('option selected', option);
      //   })
      // }
      
    }])
})();