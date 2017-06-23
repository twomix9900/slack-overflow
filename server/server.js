const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');
const init = require('./init');

const port = 3456;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));

const users = {};
io.on('connection', function(socket) {
  console.log('CONNNNNNNNNNNNECTED');
  socket.on('join', function(email, callback) {
    console.log('THIS IS DATAAAAAA', email);
    socket.email = email;
    users[socket.email] = socket;
    console.log('socket.email', socket.email);
    updateUsers();
  });

  socket.on('exit', function(email, callback) {
    console.log('THIS IS EXIT, EMAIL : ', email);
    delete users[email];
    console.log('DELETE USERS', users);
    updateUsers();
  });

  socket.on('newMessage', function(messageBody, callback) {
    var sendTo = messageBody.email;
    var message = messageBody.message;
    console.log('SEND TO ', sendTo, 'MESSAGE: ', message);
    io.emit(sendTo, messageBody);
    // socket.emit(sendTo, message);
  });

  function updateUsers() {
    console.log('let me update the users', Object.keys(users));
    io.sockets.emit('users', Object.keys(users));
  }

});

init()
  .then(() => {
    server.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));
