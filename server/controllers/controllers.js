const {
  User,
  Question,
  Answer,
  Field,
  Message,
  User_Field
} = require('../models/tableModels');

const fetchAllQuestions = (req, res) => {
  User.findAll({
    include: [{ 
      model: Question,
      include: [{
        model: Field
      }]
    }]
  })
    .then((users) => {
      res.json({
        results: users
      })
    })
    .catch((err) => {
      console.error('error fetching users ', err);
    })
}

const fetchQuestionsForUser = (req, res) => {
  User.findAll({
    where: { id: 1 },
    include: [{ 
      model: Question,
      include: [{
        model: Field
      }]
    }]
  })
    .then((questions) => {
      res.json({
        results: questions
      })
    })
    .catch((err) => {
      console.error('error fetching questions ', err);
    })
}

const fetchQuestionAndAnswers = (req, res) => {
  User.findAll({
    include: [{ 
      model: Question,
      where: { id: 3 },
      include: [{
        model: Answer
      }]
    }]
  })
    .then((questions) => {
      res.json({
        results: questions
      })
    })
    .catch((err) => {
      console.error('error fetching questions ', err);
    })
}

const postQuestion = (req, res) => {
  let { userId, title, text, fieldId } = req.body;
  Question.create({
    userId: userId,
    title: title,
    text: text,
    fieldId: fieldId
  })
}

const postAnswer = (req, res) => {
  let { questionId, userId, text } = req.body;
  Answer.create({
    userId: userId,
    text: text,
    questionId: questionId
  })
}

const addUser = (req, res) => {
  let name = req.body.name;
  let fields = req.body.fields;
  let userId;
  User.findOrCreate({ where: { name: name }, defaults: { reputation: 0 }})
    .spread((user, created) => {
      for (let i = 0; i < fields.length; i++) {
        User_Field.create({
          userId: user.id,
          fieldId: fields[i]
        })
      }
    })
    .then(() => {
      res.status(201).send('success adding new user to database');
    })
    .catch((err) => {
      console.error('error adding new user to database ', err);
    })
}

const updateUserFieldInfo = (req, res) => {
  let userId = req.params;
  let updateFields = req.body.fields;
  User_Field.destroy({ where: { userId: userId }})
    .then(() => {
      for (let j = 0; j < updateFields.length; j++) {
        User_Field.create({
          userId: userId,
          fieldId: updateFields[j]
        })
      }
    })
    .then(() => {
      res.status(201).send('successfully updated field info');
    })
    .catch((err) => {
      console.error('error updating field info ', err);
    })
}

const addReputation = (req, res) => {
  let repUserId = req.params;
  User.find({ where: { id: repUserId }})
    .then((user) => {
      let newRep = user.reputation + 10;
      User.update({
        reputation: newRep
      }, {
        where: { id: repUserId }
      });
    })
    .then(() => {
      res.status(201).send('successfully added reputation');
    })
    .catch((err) => {
      console.error('error adding repuation ', err);
    })
}

module.exports = {
  fetchAllQuestions: fetchAllQuestions,
  fetchQuestionAndAnswers: fetchQuestionAndAnswers,
  postQuestion: postQuestion,
  postAnswer: postAnswer,
  addUser: addUser,
  updateUserFieldInfo: updateUserFieldInfo,
  fetchQuestionsForUser: fetchQuestionsForUser,
  addReputation: addReputation
}