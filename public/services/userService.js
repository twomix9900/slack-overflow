(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .service('userService', ['$http', 'store', function($http, store) {
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

      this.getUserInfo = (data) => {
        console.log('data transferred', data)
        let userName = data.email;
        return $http.get(`/users/name/${userName}`)
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
        return $http.put(`/users/${userId}`, data)
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
        return $http.put(`/users/${userId}`, data)
        .then((response) => {
          return console.log('removeField in userService success', response);
        })
        .catch((error) => {
          return console.log('removeField in userService fail', error);
        });

      };


    }]);
})();
