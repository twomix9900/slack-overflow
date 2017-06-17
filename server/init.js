const db = require('./db');
const {
  User,
  Question,
  Answer,
  Field,
  Message,
  User_Field,
  userDummy,
  questionDummy,
  answerDummy,
  user_fieldDummy,
  fieldDummy
} = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => User.sync({force: true}))
    .then(() => Field.sync({force: true}))
    .then(() => Question.sync({force: true}))
    .then(() => Answer.sync({force: true}))
    .then(() => Message.sync({force: true}))
    .then(() => User_Field.sync({force: true}))
    .then(() => {
      User.bulkCreate(userDummy)
      .then(() => {
        console.log('success creating user data');
      })
      .catch(err => {
        console.error('error creating user data ', err);
      }) 
    })
    .then(() => {
      Field.bulkCreate(fieldDummy)
        .then(() => {
          console.log('success creating field data');
        })
        .catch(err => {
          console.error('error creating field data ', err);
        })
    })
    .then(() => {
      User_Field.bulkCreate(user_fieldDummy)
        .then(() => {
          console.log('success creating user_field data');
        })
        .catch(err => {
          console.error('error creating user_field data ', err);
        });   
    })
    .then(() => {
      Question.bulkCreate(questionDummy)
        .then(() => {
          console.log('success creating question data');
        })
        .catch(err => {
          console.error('error creating question data ', err);
        })
    })
    .then(() => {
      Answer.bulkCreate(answerDummy)
        .then(() => {
          console.log('success creating answer data');
        })
        .catch(err => {
          console.error('error creating answer data ', err);
        }); 
    })
};

module.exports = init;