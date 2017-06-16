const db = require('./db');
const {
  User: User,
  Question: Question,
  Answer: Answer,
  Field: Field,
  Message: Message
} = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => User.sync())
    .then(() => Question.sync())
    .then(() => Answer.sync())
    .then(() => Field.sync())
    .then(() => Message.sync())
};

module.exports = init;