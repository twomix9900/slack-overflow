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

Question.belongsTo(User, {foreignKey: userId});
User.hasMany(Question, {foreignKey: userId});

Question.hasOne(Field, {foreignKey: fieldId});
Field.belongsToMany(Question, {foreignKey: fieldId});

Answer.hasOne(Question, {foreignKey: questionId});
Question.belongsTo(Answer, {foreignKey: questionId});

Answer.hasOne(User, {foreignKey: userId});
User.belongsTo(Answer, {foreginKey: userId});

User.belongsToMany(Field, {
  through: [User_Field],
  foreignKey: userId
});
Field.belongsToMany(User, {
  through: [User_Field],
  foreignKey: fieldId
});

Message.hasOne(User, {foreignKey: userIdA});
Message.hasOne(User, {foreignKey: userIdB});

module.exports = {
  User: User,
  Question: Question,
  Answer: Answer,
  Field: Field,
  Message: Message
}