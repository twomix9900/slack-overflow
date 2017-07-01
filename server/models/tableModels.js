const userDummy = [
  { name: "josh", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 400, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "jason", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 450, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "inseok", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 550, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "regina", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 400, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "kan", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 350, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "ricky", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 550, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "heather", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 700, phoneNumber: '555-55-5555', is_hosting: false },
  { name: "kay", image: "http://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png", reputation: 1337, phoneNumber: '555-55-5555', is_hosting: false },
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
  { text: "answer1", questionId: 1, userId: 4, totalRating: 0 },
  { text: "answer2", questionId: 2, userId: 7, totalRating: 0 },
  { text: "answer3", questionId: 3, userId: 6, totalRating: 0 },
  { text: "answer4", questionId: 4, userId: 1, totalRating: 0 },
  { text: "answer5", questionId: 5, userId: 2, totalRating: 0 },
  { text: "answer6", questionId: 6, userId: 3, totalRating: 0 },
  { text: "answer7", questionId: 7, userId: 2, totalRating: 0 },
  { text: "answer8", questionId: 8, userId: 4, totalRating: 0 },
  { text: "answer9", questionId: 9, userId: 3, totalRating: 0 },
  { text: "answer10", questionId: 10, userId: 6, totalRating: 0 },
  { text: "test rep", questionId: 18, userId: 1, totalRating: 0 }
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

const dummyRating = [
  { userId: 3, answerId: 13, rating: 15 },
  { userId: 4, answerId: 13, rating: 10 },
  { userId: 6, answerId: 12, rating: 20 }
];

const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: Sequelize.STRING(40),
  reputation: Sequelize.INTEGER,
  image: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  is_hosting: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
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
  text: Sequelize.TEXT,
  totalRating: Sequelize.INTEGER
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

const Ans_Ratings = db.define('answer_ratings', {
  rating: Sequelize.INTEGER
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

User.belongsToMany(Answer, {
  through: Ans_Ratings,
});

Answer.belongsToMany(User, {
  through: Ans_Ratings,
});

module.exports = {
  User: User,
  Question: Question,
  Answer: Answer,
  Ans_Ratings: Ans_Ratings,
  Field: Field,
  Message: Message,
  User_Field: User_Field,
  userDummy: userDummy,
  questionDummy: questionDummy,
  answerDummy: answerDummy,
  fieldDummy: fieldDummy,
  user_fieldDummy: user_fieldDummy,
  dummyRating: dummyRating
}