(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['$provide', 'authProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', 'jwtInterceptorProvider', 
    function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
      // JASON
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
          
          //name of the state is the ui-sref
          //url is what the browser will go to
          //component matches the component in public/components
          //resolve function runs before component gets loaded, and return value is set to question
        },
        {
          name: 'questionsAnsweredList',
          url: '/answers',
          component: 'questionsAnsweredList',
          resolve: {
            questions: function(QuestionsService) {
              return QuestionsService.getQuestionsForUser();
            }
          }
        },
      ]
      
      states.forEach(function(state) {
        $stateProvider.state(state);
      });

      // INSEOK
      authProvider.init({
        domain: 'inseok-ucla.auth0.com',
        clientID: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
      })

      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('id_token');
      }

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: './public/components/templates/slackOverflow.html',
          
        })
        .state('profile', {
          url: '/profile',
          templateUrl: './public/components/templates/profile.html',
          controller: 'profileController',
          controllerAs: 'ctrl',
          bindToController: true
        })
        .state('postQuestion', {
          url: '/postQuestion',
          templateUrl: './public/components/templates/askQuestion.html',
          controller: 'postQuestionController',
          controllerAs: 'ctrl',
          bindToController: true
        });


      function redirect($q, $injector, $timeout, store, $location) {
        var auth;
        $timeout(function() {
          auth = $injector.get('auth');
        });
        return {
          responseError: function(rejection) {
            if (rejection.status === 401) {
              auth.signout();
              store.remove('profile');
              store.remove('id_token');
              $location.path('/home');
            }
            return $q.reject(rejection);
          }
        }
      }
      $provide.factory('redirect', redirect);
      $httpProvider.interceptors.push('redirect');
      $httpProvider.interceptors.push('jwtInterceptor');
    }])
})();