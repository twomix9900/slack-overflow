const userDummy = [
  { name: "josh", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 400 },
  { name: "jason", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 450 },
  { name: "inseok", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 550 },
  { name: "regina", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 400 },
  { name: "kan", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 350 },
  { name: "ricky", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 550 },
  { name: "heather", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 700 }
];

const fieldDummy = [
  { name: "JavaScript" },
  { name: "Backbone" },
  { name: "CSS" },
  { name: "HTML" },
  { name: "React" },
  { name: "Angular" },
  { name: "Node.js" },
  { name: "SQL" },
  { name: "noSQL" }
];

const questionDummy = [
  { title: "title1", text: "text1", status: true, userId: 4, fieldId: 9 },
  { title: "title2", text: "text2", status: true, userId: 7, fieldId: 1 },
  { title: "title3", text: "text3", status: true, userId: 1, fieldId: 2 },
  { title: "title4", text: "text4", status: true, userId: 2, fieldId: 5 },
  { title: "title5", text: "text5", status: true, userId: 4, fieldId: 4 },
  { title: "title6", text: "text6", status: true, userId: 7, fieldId: 3 },
  { title: "title7", text: "text7", status: true, userId: 3, fieldId: 8 },
  { title: "title8", text: "text8", status: true, userId: 2, fieldId: 7 },
  { title: "title9", text: "text9", status: true, userId: 1, fieldId: 6 },
  { title: "title10", text: "text10", status: true, userId: 4, fieldId: 1 }
];

const answerDummy = [
  { text: "answer1", questionId: 1, userId: 4 },
  { text: "answer2", questionId: 2, userId: 7 },
  { text: "answer3", questionId: 3, userId: 6 },
  { text: "answer4", questionId: 4, userId: 1 },
  { text: "answer5", questionId: 5, userId: 2 },
  { text: "answer6", questionId: 6, userId: 3 },
  { text: "answer7", questionId: 7, userId: 2 },
  { text: "answer8", questionId: 8, userId: 4 },
  { text: "answer9", questionId: 9, userId: 3 },
  { text: "answer10", questionId: 10, userId: 6 },
  { text: "test rep", questionId: 18, userId: 1}
];

const user_fieldDummy = [
  { userId: 4, fieldId: 9 },
  { userId: 7, fieldId: 1 },
  { userId: 6, fieldId: 2 },
  { userId: 1, fieldId: 5 },
  { userId: 2, fieldId: 4 },
  { userId: 3, fieldId: 3 },
  { userId: 2, fieldId: 8 },
  { userId: 7, fieldId: 4 },
  { userId: 3, fieldId: 6 },
  { userId: 6, fieldId: 1 },
  { userId: 1, fieldId: 1 },
  { userId: 2, fieldId: 1 },
  { userId: 3, fieldId: 1 },
  { userId: 4, fieldId: 1 },
  { userId: 5, fieldId: 1 }
];

const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: Sequelize.STRING(40),
  reputation: Sequelize.INTEGER,
  image: Sequelize.STRING
});

const Question = db.define('question', {
  title: Sequelize.STRING,
  text: Sequelize.TEXT,
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
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

const User_Field = db.define('user_field', { 
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  } 
});

User.hasMany(Question);
Question.belongsTo(User);

User.hasMany(Answer);
Answer.belongsTo(User);

Question.hasMany(Answer);
Answer.belongsTo(User);

Question.belongsTo(Field);
Field.hasMany(Question);


User.belongsToMany(Field, {
  through: User_Field,
});
Field.belongsToMany(User, {
  through: User_Field,
});


module.exports = {
  User: User,
  Question: Question,
  Answer: Answer,
  Field: Field,
  Message: Message,
  User_Field: User_Field,
  userDummy: userDummy,
  questionDummy: questionDummy,
  answerDummy: answerDummy,
  fieldDummy: fieldDummy,
  user_fieldDummy: user_fieldDummy
}