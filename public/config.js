(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .config(['$provide', 'authProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', 'jwtInterceptorProvider', 
    function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
      // INSEOK
      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('id_token');
      }

      $urlRouterProvider.otherwise('/home');

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


      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: './public/components/templates/slackOverflow.html',
          controller: 'homeController',
          controllerAs: 'ctrl'
        })
        .state('home1', {
          url: '/home1',
          templateUrl: './public/components/templates/home1.html',
          controller: 'home1Controller',
          controllerAs: 'ctrl'
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
          templateUrl: './public/components/templates/postQuestion.html',
          controller: 'postQuestionController',
          controllerAs: 'ctrl',
          bindToController: true
        })
        .state('chatPage', {
          url: '/chatPage',
          templateUrl: './public/components/templates/chatPage.html',
          controller: 'chatPageController',
          controllerAs: 'ctrl',
          bindToController: true
        })
        .state('actual-chat-room', {
          url: '/actual-chat/:host_id',
          templateUrl: './public/components/templates/actual_chat_room.html',
          controller: 'ActualChatCtrl as actual_chat_ctrl'
        })
        .state('questionsAskedList', { 
          url: '/questions',
          templateUrl: 'public/components/templates/questionsAskedList.html',
          controller: 'questionsAskedListCtrl',
          controllerAs: 'ctrl'
        })
        .state('questionAskedEntry', {
          url: '/questions/:id', 
          templateUrl: 'public/components/templates/questionAskedEntry.html',
          controller: 'questionAskedEntryCtrl',
          controllerAs: 'ctrl'
        })
        .state('questionsAnsweredList', {
          url: '/answers',
          templateUrl: 'public/components/templates/questionsAnsweredList.html',
          controller: 'questionsAnsweredListCtrl',
          controllerAs: 'ctrl'
        })
        .state('questionAnsweredEntry', {
          url: '/answers/:id',
          templateUrl: 'public/components/templates/questionAnsweredEntry.html',
          controller: 'questionAnsweredEntryCtrl',
          controllerAs: 'ctrl'
        })
        .state('videochat', {
          url: '/videochat',
          templateUrl: 'public/components/templates/videochat.html',
          controller: 'videochatCtrl',
          controllerAs: 'ctrl'
        })


    }])
})();