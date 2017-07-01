(function () {
  angular.module('slackOverflowApp')
    .controller('ActualChatCtrl', ActualChatCtrl)

  ActualChatCtrl.$inject = ['store', '$stateParams'];

  function ActualChatCtrl(store, $stateParams) {
    var vm = this;
    vm.host_id = $stateParams.host_id;
    var socket = io("/" + vm.host_id);
    console.log(socket, '<< socket')
    vm.email = store.get('profile').email;


    var err_callback = function (err) {
      console.log(err, '<< error');
    }


    vm.sendMessage = function () {
      console.log('clicked!')
      if (vm.msg) {
        socket.emit('msg', { message: vm.msg })
        vm.msg = '';
      }
    }

    socket.on('newMsg', function (data) {
      var messages = angular.element(document.querySelector('#messages'));
      messages.append('<li class="animated fadeIn">' + '<div class="li-avatar"></div>' + '<div class="li-message">' + data.message + '</div>' + '</li>')
    })

  }
})()