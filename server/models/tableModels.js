const userDummy = [
  { id: 1, name: "josh", reputation: 400 },
  { id: 2, name: "jason", reputation: 450 },
  { id: 3, name: "inseok", reputation: 550 },
  { id: 4, name: "regina", reputation: 400 },
  { id: 5, name: "kan", reputation: 350 },
  { id: 6, name: "ricky", reputation: 550 },
  { id: 7, name: "heather", reputation: 700 }
];

const fieldDummy = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Backbon" },
  { id: 3, name: "CSS" },
  { id: 4, name: "HTML" },
  { id: 5, name: "React" },
  { id: 6, name: "Angular" },
  { id: 7, name: "Node.js" },
  { id: 8, name: "SQL" },
  { id: 9, name: "noSQL" }
];

const questionDummy = [
  { id: 1, title: "title1", text: "text1", status: true, userId: 4, fieldId: 9 },
  { id: 2, title: "title2", text: "text2", status: true, userId: 7, fieldId: 1 },
  { id: 3, title: "title3", text: "text3", status: true, userId: 1, fieldId: 2 },
  { id: 4, title: "title4", text: "text4", status: true, userId: 2, fieldId: 5 },
  { id: 5, title: "title5", text: "text5", status: true, userId: 4, fieldId: 4 },
  { id: 6, title: "title6", text: "text6", status: true, userId: 7, fieldId: 3 },
  { id: 7, title: "title7", text: "text7", status: true, userId: 3, fieldId: 8 },
  { id: 8, title: "title8", text: "text8", status: true, userId: 2, fieldId: 7 },
  { id: 9, title: "title9", text: "text9", status: true, userId: 1, fieldId: 6 },
  { id: 10, title: "title10", text: "text10", status: true, userId: 4, fieldId: 1 }
];

const answerDummy = [
  { id: 1, text: "answer1", questionId: 1, userId: 4 },
  { id: 2, text: "answer2", questionId: 2, userId: 7 },
  { id: 3, text: "answer3", questionId: 3, userId: 6 },
  { id: 4, text: "answer4", questionId: 4, userId: 1 },
  { id: 5, text: "answer5", questionId: 5, userId: 2 },
  { id: 6, text: "answer6", questionId: 6, userId: 3 },
  { id: 7, text: "answer7", questionId: 7, userId: 2 },
  { id: 8, text: "answer8", questionId: 8, userId: 4 },
  { id: 9, text: "answer9", questionId: 9, userId: 3 },
  { id: 10, text: "answer10", questionId: 10, userId: 6 }
];

const user_fieldDummy = [
  { id: 1, userId: 4, fieldId: 9 },
  { id: 2, userId: 7, fieldId: 1 },
  { id: 3, userId: 6, fieldId: 2 },
  { id: 4, userId: 1, fieldId: 5 },
  { id: 5, userId: 2, fieldId: 4 },
  { id: 6, userId: 3, fieldId: 3 },
  { id: 7, userId: 2, fieldId: 8 },
  { id: 8, userId: 7, fieldId: 4 },
  { id: 9, userId: 3, fieldId: 6 },
  { id: 10, userId: 6, fieldId: 1 },
  { id: 11, userId: 1, fieldId: 1 },
  { id: 12, userId: 2, fieldId: 1 },
  { id: 13, userId: 3, fieldId: 1 },
  { id: 14, userId: 4, fieldId: 1 },
  { id: 15, userId: 5, fieldId: 1 }
];

const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: Sequelize.STRING(40),
  reputation: Sequelize.INTEGER
});

const Question = db.define('question', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  status: Sequelize.BOOLEAN
});

const Answer = db.define('answer', {
  text: Sequelize.TEXT
});

const Field = db.define('field', {
  name: Sequelize.STRING(40)
});

const Message = db.define('message', {
  text: Sequelize.TEXT
});

const User_Field = db.define('user_field', {});

User.hasMany(Question);

User.hasMany(Answer);

Question.hasMany(Answer);

Question.belongsTo(Field);
Field.hasMany(Question);


User.belongsToMany(Field, {
  through: User_Field,
});
Field.belongsToMany(User, {
  through: User_Field,
});

User.bulkCreate(userDummy)
  .then(() => {
    console.log('success creating user data');
  })
  .catch(err => {
    console.error('error creating user data ', err);
  }); 

Field.bulkCreate(fieldDummy)
  .then(() => {
    console.log('success creating field data');
  })
  .catch(err => {
    console.error('error creating field data ', err);
  }); 

Question.bulkCreate(questionDummy)
  .then(() => {
    console.log('success creating question data');
  })
  .catch(err => {
    console.error('error creating question data ', err);
  }); 

Answer.bulkCreate(answerDummy)
  .then(() => {
    console.log('success creating answer data');
  })
  .catch(err => {
    console.error('error creating answer data ', err);
  }); 

User_Field.bulkCreate(user_fieldDummy)
  .then(() => {
    console.log('success creating user_field data');
  })
  .catch(err => {
    console.error('error creating user_field data ', err);
  });   

module.exports = {
  User: User,
  Question: Question,
  Answer: Answer,
  Field: Field,
  Message: Message,
  User_Field: User_Field
}