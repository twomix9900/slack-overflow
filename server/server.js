const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes');
const db = require('./db');
const init = require('./init');

const port = 3456;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', router);

app.use(express.static('public'));

init()
  .then(() => {
    app.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));
