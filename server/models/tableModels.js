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
  through: 'User_Field',
  // foreignKey: 'user_id'
});
Field.belongsToMany(User, {
  through: 'User_Field',
  // foreignKey: 'field_id'
});

User.sync();
Question.sync();
Answer.sync();
Field.sync();
Message.sync();
User_Field.sync({force: true});


module.exports = {
  User: User,
  Question: Question,
  Answer: Answer,
  Field: Field,
  Message: Message,
  User_Field: User_Field
}