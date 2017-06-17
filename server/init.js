const db = require('./db');
const {
  User,
  Question,
  Answer,
  Field,
  Message,
  User_Field
} = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => User.sync())
    .then(() => Field.sync())
    .then(() => Question.sync())
    .then(() => Answer.sync())
    .then(() => Message.sync())
    .then(() => User_Field.sync())
};

module.exports = init;