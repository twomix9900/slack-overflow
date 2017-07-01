(function () {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('userService', ['$http', 'store', function ($http, store) {
      const vm = this;
      vm.profile;
      // instead of trying to reach for the server to get field ID everytime field is added,
      // just hardcoding a field data with proper numbers seems reasonable
      vm.fields = {
        JavaScript: 1,
        Backbone: 2,
        CSS: 3,
        HTML: 4,
        React: 5,
        Angular: 6,
        'Node.js': 7,
        SQL: 8,
        noSQL: 9
      };

      this.host_index = () => {
        return $http.get('https://slackbetterflow.herokuapp.com/all-users-hosting/');
      }

      this.connect_to_socket = (email) => {
        return $http.post('https://slackbetterflow.herokuapp.com/host-connect/' + email)
      }

      this.update_host = (email, data) => {
        return $http.post('https://slackbetterflow.herokuapp.com/host-updating/' + email, data)
      }

      this.getUserInfo = (data) => {
        console.log('data transferred', data)
        let userName = data.email;
        return $http.get(`https://slackbetterflow.herokuapp.com/users/name/${userName}`)
          .then((response) => {
            console.log('getUserInfo in userService success', response);
            vm.profile = store.get('profile');
            vm.profile.userInfo = response.data.results;
            // convert field object into array
            vm.fieldObjects = vm.profile.userInfo.fields;
            console.log('FIELD OBJECTS', vm.fieldObjects);
            for (let i = 0; i < vm.fieldObjects.length; i++) {
              let fieldName = vm.fieldObjects[i].name;
              vm.fieldObjects[i] = fieldName;
            }
            vm.profile.userInfo.fields = vm.fieldObjects;
            store.set('profile', vm.profile);
            return vm.profile
          })
          .catch((error) => {
            return console.log('getUserInfo in userService fail', error);
          });
      };

      this.addField = (field) => {
        vm.profile = store.get('profile');
        let userId = vm.profile.userInfo.id;
        let fieldsByName = vm.profile.userInfo.fields;
        let fieldIds = [];
        for (let i = 0; i < fieldsByName.length; i++) {
          fieldIds.push(vm.fields[fieldsByName[i]]);
        }
        let data = {
          id: userId,
          fields: fieldIds
        };
        return $http.put(`https://slackbetterflow.herokuapp.com/users/${userId}`, data)
          .then((response) => {
            return console.log('addField in userService success', response);
          })
          .catch((error) => {
            return console.log('addField in userService fail', error);
          });
      };

      this.removeField = () => {
        vm.profile = store.get('profile');
        let userId = vm.profile.userInfo.id;
        let fieldsByName = vm.profile.userInfo.fields;
        let fieldIds = [];
        for (let i = 0; i < fieldsByName.length; i++) {
          fieldIds.push(vm.fields[fieldsByName[i]]);
        }
        let data = {
          id: userId,
          fields: fieldIds
        };
        return $http.put(`https://slackbetterflow.herokuapp.com/users/${userId}`, data)
          .then((response) => {
            return console.log('removeField in userService success', response);
          })
          .catch((error) => {
            return console.log('removeField in userService fail', error);
          });

      };

      //{"email_verified":false,"email":"kay@1.com","clientID":"sI5ktAqaNr9Fo4Mr9NWKPDCQGNE9cGLT","updated_at":"2017-06-28T23:10:30.760Z",
      // "name":"kay@1.com","picture":"https://s.gravatar.com/avatar/2e4ca571f1af92991ebc3970c004da84?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fka.png",
      // "user_id":"auth0|5952dc4f9420837fd36642d3","nickname":"kay","identities":[{"user_id":"5952dc4f9420837fd36642d3","provider":"auth0",
      // "connection":"Username-Password-Authentication","isSocial":false}],"created_at":"2017-06-27T22:29:35.516Z",
      // "global_client_id":"6rhT7IP2SwQ08WYG2tL2RA9yTxD4JrdY",


      //"userInfo":{"id":10,"name":"kay@1.com","reputation":0,
      // "image":"https://s.gravatar.com/avatar/2e4ca571f1af92991ebc3970c004da84?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fka.png",
      // "phoneNumber":null,"createdAt":"2017-06-28T21:44:16.735Z","updatedAt":"2017-06-28T21:44:16.735Z","fields":[]}}


      this.updatePhoneNumber = (num) => {
        // console.log('updatePhoneNumber invoked from userService');
        vm.profile = store.get('profile');
        let userId = vm.profile.userInfo.id;
        let fieldsByName = vm.profile.userInfo.fields;
        let fieldIds = [];
        for (let i = 0; i < fieldsByName.length; i++) {
          fieldIds.push(vm.fields[fieldsByName[i]]);
        };
        // let phoneNumber = vm.profile.userInfo.phoneNumber;
        // console.log('vm.profile.userInfo = ', vm.profile.userInfo )
        let data = { // this is req.body
          id: userId,
          phoneNumber: num,
          fields: fieldIds
        };
        // console.log('data = ', data)
        return $http.put(`https://slackbetterflow.herokuapp.com/phone/${userId}`, data)
          
      }


    }]);
})();