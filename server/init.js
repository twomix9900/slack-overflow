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
  fieldDummy,
  Ans_Ratings,
  dummyRating
} = require('./models/tableModels');


/* 
READ THIS !!!!!!!!!!!!!!!

There are two init functions below. The first will drop any formed tables and will
re-populate them with dummy data. You will lose any data added to the tables!

The second init function will just sync the tables with the database. Be sure to comment out 
the init function that you DON'T want to use depending on the situation!!!

*/ 

// const init = () => {
//   return db.authenticate()
//     .then(() => User.sync({force: true}))
//     .then(() => Field.sync({force: true}))
//     .then(() => Question.sync({force: true}))
//     .then(() => Answer.sync({force: true}))
//     .then(() => Message.sync({force: true}))
//     .then(() => User_Field.sync({force: true}))
//     .then(() => Ans_Ratings.sync({force: true}))
//     .then(() => {
//       User.bulkCreate(userDummy)
//       .then(() => {
//         console.log('success creating user data');
//       })
//       .catch(err => {
//         console.error('error creating user data ', err);
//       }) 
//     })
//     .then(() => {
//       Field.bulkCreate(fieldDummy)
//         .then(() => {
//           console.log('success creating field data');
//         })
//         .catch(err => {
//           console.error('error creating field data ', err);
//         })
//     })
//     .then(() => {
//       User_Field.bulkCreate(user_fieldDummy)
//         .then(() => {
//           console.log('success creating user_field data');
//         })
//         .catch(err => {
//           console.error('error creating user_field data ', err);
//         });   
//     })
//     .then(() => {
//       Question.bulkCreate(questionDummy)
//         .then(() => {
//           console.log('success creating question data');
//         })
//         .catch(err => {
//           console.error('error creating question data ', err);
//         })
//     })
//     .then(() => {
//       Answer.bulkCreate(answerDummy)
//         .then(() => {
//           console.log('success creating answer data');
//         })
//         .catch(err => {
//           console.error('error creating answer data ', err);
//         }); 
//     })
// }; 

const testAnswerDummy = {text: "test rep", questionId: 18, userId: 1};

const init = () => {
  return db.authenticate()
    .then(() => User.sync())
    .then(() => Field.sync({force: true}))
    .then(() => Question.sync())
    .then(() => Answer.sync())
    .then(() => Message.sync())
    .then(() => User_Field.sync())
    .then(() => Field.bulkCreate(fieldDummy))
    .then(() => Ans_Ratings.sync())
//    .then(() => Ans_Ratings.bulkCreate(dummyRating))
      .then(() => {
        console.log('success creating field data');
      })
      .catch((error) => {
        console.log('fail creating field data', error);
      })
};

module.exports = init;