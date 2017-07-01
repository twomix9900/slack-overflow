(function () {
  angular.module('slackOverflowApp')
    .controller('ActualChatCtrl', ActualChatCtrl)

  ActualChatCtrl.$inject = ['store', '$stateParams'];

  function ActualChatCtrl(store, $stateParams) {
    var vm = this;
    vm.host_id = $stateParams.host_id;
    var socket = io("https://slackbetterflow.herokuapp.com/" + vm.host_id, { forceNew: false });
    console.log(socket, '<< socket');
    vm.email = store.get('profile').email;
    vm.use_this_id = store.get('profile').userInfo.id;

    var err_callback = function (err) {
      console.log(err, '<< error');
    }


    vm.sendMessage = function () {
      console.log('clicked!')
      if (vm.msg) {
        socket.emit('msg', { message: vm.msg, user_who_sent: vm.email })
        vm.msg = '';
      }
    }

    socket.on('newMsg', function (data) {
      console.log('new message coming in...', data.message, data.user_who_sent)
      var messages = angular.element(document.querySelector('#messages'));
      messages.append('<li class="animated fadeIn">' + '<div class="li-avatar"></div>' + '<div class="li-message">' + data.user_who_sent + ': ' + data.message + '</div>' + '</li>')
    })

  }
})()