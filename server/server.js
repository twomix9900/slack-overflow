const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const jwt = require('express-jwt');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');
const init = require('./init');

const port = 3456;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
const authCheck = jwt({
  secret: new Buffer('czR3QSYYTY6dImCfroTZqdXvpYOOwPsOJtVISE3kWyR1Q0AiEz4rVMSw_RvU5iL3', 'base64'),
  audience: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
});
app.get('/api/public', function(req, res) {
  res.json({message: 'hello from public endpoint, you dont need to be authenticated'})
});
app.get('/api/private', authCheck, function(req, res) {
  res.json({message: 'hello from private endpoint, you are authenticated'})
});
app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));

init()
  .then(() => {
    app.listen(port, () => console.log(`app is listening on port ${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));
