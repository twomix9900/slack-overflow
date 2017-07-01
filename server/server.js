const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');
const init = require('./init');
var User = require('./models/tableModels').User;
const port = process.env.PORT || 3456;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));

app.use(function(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "Options") {
        res.send(200);
    } else {
        return next();
    }
})

// const users = {};
// io.on('connection', function(socket) {
//   console.log('CHAT SERVER CONNECTION SUCCESSFUL');

//   socket.on('join', function(email, callback) {
//     console.log('USER JOINED, email: ', email);
//     socket.email = email;
//     users[socket.email] = socket;
//     console.log('socket.email: ', socket.email);
//     console.log('CURRENT USER LIST, users: ', users);
//     updateUsers();
//   });

//   socket.on('exitChatServer', function(email, callback) {
//     console.log('THIS IS EXIT, EMAIL : ', email);
//     delete users[email];
//     console.log('DELETE USERS', Object.keys(users));
//     updateUsers();
//   });

//   socket.on('newMessage', function(messageBody, callback) {
//     var sendTo = messageBody.email;
//     var message = messageBody.message;
//     messageBody.from = socket.email
//     console.log('SEND TO: ', sendTo, ' MESSAGE: ', message, ' FROM: ', socket.email);
//     console.log('MESSAGE BODY', messageBody);
//     io.emit(sendTo, messageBody);
//     io.emit(messageBody.from, messageBody);
//     // socket.emit(sendTo, message);
//   });

//   function updateUsers() {
//     console.log('UPDATING USER LIST: ', Object.keys(users));
//     io.sockets.emit('users', Object.keys(users));
//   }

// });

app.post('/host-connect/:email', (req, res) => {
  User
    .findOne({
      where: {
        id: req.params.email
      }
    })
    .then((user) => {
      console.log('user ==========', user.dataValues)
      var lobby = io.of('/' + user.dataValues.id)
      lobby.once('connection', (socket) => {
        lobby.clients((err, clients) => {
          if (err) return console.log(err)
          console.log(clients, '< all clients connected to lobby: ', user.dataValues.id)
        })
        lobby.emit('user has connected to the following lobby: ', user.dataValues.id)

        socket.on('msg', function (data) {
          // console.log('message: ' + data.message);
          lobby.emit('newMsg', { message: data.message, user_who_sent: data.user_who_sent });
        })

      })
      res.json({ success: true, message: 'host has been found', host: user })
    })
    .catch((err) => {
      return console.log(err, '< error')
    })
})

// socket io server side
io.on('connection', function (socket) {

  console.log('a user connected...');

  // socket.on('msg', function (data) {
  //   // console.log('message: ' + data.message);
  //   io.emit('newMsg', { message: data.message });
  // })

  // socket.on('disconnect', function(){
  //   console.log('user has left...');
  // })
// })
// const users = {};
// io.on('connection', function(socket) {
//   console.log('CHAT SERVER CONNECTION SUCCESSFUL');

//   socket.on('join', function(email, callback) {
//     console.log('USER JOINED, email: ', email);
//     socket.email = email;
//     users[socket.email] = socket;
//     console.log('socket.email: ', socket.email);
//     console.log('CURRENT USER LIST, users: ', users);
//     updateUsers();
//   });

//   socket.on('exitChatServer', function(email, callback) {
//     console.log('THIS IS EXIT, EMAIL : ', email);
//     delete users[email];
//     console.log('DELETE USERS', Object.keys(users));
//     updateUsers();
//   });

//   socket.on('newMessage', function(messageBody, callback) {
//     var sendTo = messageBody.email;
//     var message = messageBody.message;
//     messageBody.from = socket.email
//     console.log('SEND TO: ', sendTo, ' MESSAGE: ', message, ' FROM: ', socket.email);
//     console.log('MESSAGE BODY', messageBody);
//     io.emit(sendTo, messageBody);
//     io.emit(messageBody.from, messageBody);
//     // socket.emit(sendTo, message);
//   });

//   function updateUsers() {
//     console.log('UPDATING USER LIST: ', Object.keys(users));
//     io.sockets.emit('users', Object.keys(users));
//   }

  ///Videochat //////////////////////////////////////////////
  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });
  // socket.on('disconnect', function() {
  //   console.log('got message')
  //   socket.disconnect()
  //   console.log('numClients after leave =', io.engine.clientsCount)
  // });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    // var numClients = io.sockets.sockets.length;
    var numClients = io.engine.clientsCount;
    console.log('clients after enter',io.engine.clientsCount)
    console.log('io ==== ', io)

    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 2) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients <= 4) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

})

init()
  .then(() => {
    server.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));
