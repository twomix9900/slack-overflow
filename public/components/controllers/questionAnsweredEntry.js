(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionAnsweredEntryCtrl', ['QuestionsService', 'store', '$stateParams', 'userService', '$scope',
      function(QuestionsService, store, $stateParams, userService, $scope) {
      
      var vm = this;
      vm.questionId = $stateParams.id;
      vm.questionAndAnswers;
      vm.notClicked = true;
      vm.repAdded = false;
      vm.currentUser = store.get('profile').userInfo.id;

      vm.closeQuestion = () => {
        QuestionsService.closeQuestion(vm.questionId) 
          .then(() => {
            console.log('successfully closed the question');
          })
          .catch((err) => {
            console.error('error closing question ', err);
          })
      }

      vm.addRep = (userId, answerId, repPts) => {
        vm.repAdded = true;
        console.log('attempting to add ', repPts, ' to #', userId, ' reputation');
        QuestionsService.addRep(userId, repPts)
        .then(() => {
          vm.notClicked = false;
          
          console.log('data to be passed', userId, answerId, repPts);

          QuestionsService.createRatingToAnswer(vm.currentUser, answerId, repPts)
          .then(() => {
            console.log('successfully added reputation');
            QuestionsService.getRatingsToAnswer(answerId)
            .then((ratings) => {
              console.log('attempting to update ratings');
              var AnswerRatings = ratings.data.data
              var total_rating = AnswerRatings.reduce((acc, cur) => {
                return acc + Number(cur.rating);
              }, 0);
              console.log('total rating', total_rating);
              QuestionsService.updateAnswerTotalRating(answerId, total_rating)
              .then(() => {
                userService.getUserInfo(store.get('profile'));
              })
            });
          })
          .catch((err) => {
            console.error('error', err)
          })
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
            answer.rating = obj.results[0].questions[0].answers[i].totalRating;
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

            // QuestionsService.getRatingsToAnswer(answer.id)
            //  .then((ratings) => {
            //     var AnswerRatings = ratings.data.data
            //     answer.rating = AnswerRatings.reduce((acc, cur) => {
            //       return acc + Number(cur.rating);
            //     }, 0);
            //    console.log('array', answer.rating);
            //  });
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