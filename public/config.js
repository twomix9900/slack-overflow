var myApp = angular.module('slackOverflowApp', ['ui.router']);

myApp.config(function($stateProvider) {
  // An array of state definitions for ui router

  var states = [
    
    { 
      name: 'questionsAskedList', 
      url: '/questions', 
      component: 'questionsAskedList',
      resolve: {
        questions: function(QuestionsService) {
          return QuestionsService.getAllQuestions();
        }
      }
    },

    { 
      name: 'questionAskedEntry', 
      url: '/questions/{questionId}', 
      component: 'questionAskedEntry',
      resolve: {
        question: function(QuestionsService, $transition$) {
          console.log($transition$.params().questionId)
          return QuestionsService.getQuestion($transition$.params().questionId);
        }
      }

      //name of the state is the ui-sref
      //url is what the browser will go to
      //component matches the component in public/components
      //resolve function runs before component gets loaded, and return value is set to question
    }
    
  ]
  
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});

