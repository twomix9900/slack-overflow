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
  .then((questions) => {
    res.json({
      results: questions
    })
  })
  .catch((err) => {
    console.error('error fetching users ', err);
  })
}

const fetchQuestionsForUser = (req, res) => {
  let userId = req.params.id;
  User.findAll({
    where: { id: userId },
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
  let questionId = req.params.id;
  User.findAll({
    include: [{ 
      model: Question,
      where: { id: questionId },
      include: [{
        model: Answer,
        include: [{
          model: User
        }]
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
    .then(() => {
      res.status(201).send('successfully posted question');
    })
    .catch((err) => {
      console.error('error posting question ', err);
    })
}

const postAnswer = (req, res) => {
  let { userId, text } = req.body;
  Answer.create({
    userId: userId,
    text: text,
    questionId: req.params.id
  })
    .then(() => {
      res.status(201).send('successfully posted an answer ');
    })
    .catch((err) => {
      console.error('error posting an answer ', err);
    })
}

const addUser = (req, res) => {
  let name = req.body.user;
  let image = req.body.image;
  // let fields = req.body.fields;
  let userId;
  User.findOrCreate({ where: { name: name }, defaults: { reputation: 0, image: image }})
  // since only useful data returned upon login is EMAIL,
  // and fields can't be added upon signup and need to be added in profile section after login,
  // this field is commented out
    // .spread((user, created) => {
    //   for (let i = 0; i < fields.length; i++) {
    //     User_Field.create({
    //       userId: user.id,
    //       fieldId: fields[i]
    //     })
    //   }
    // })
    .then(() => {
      res.status(201).send('success adding new user to database');
    })
    .catch((err) => {
      console.error('error adding new user to database ', err);
    })
}

const updateUserFieldInfo = (req, res) => {
  let userId = req.params.id;
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
  let repUserId = req.params.id;
  User.find({ where: { id: repUserId }})
    .then((user) => {
      let newRep = user.dataValues.reputation + 50;
      User.update({
        reputation: newRep
      }, { where: { id: repUserId }})
    })
    .then(() => {
      res.status(201).send('successfully added reputation');
    })
    .catch((err) => {
      console.error('error adding reputation ', err);
    })
}

const fetchUserInfo = (req, res) => {
  User.find({ 
    where: { id: req.params.id },
    include: [{
      model: Field
    }]
  })
    .then((user) => {
      res.json({
        results: user
      })
    })
    .catch((err) => {
      console.error('error getting user info ', err);
    })
}

const fetchUserByName = (req, res) => {
  User.find({ 
    where: { name: req.params.name },
    include: [{
      model: Field
    }]
  })
    .then((user) => {
      res.json({
        results: user
      })
    })
    .catch((err) => {
      console.error('error getting user info ', err);
    })
}


const closeQuestion = (req, res) => {
  Question.update({
    status: false
  },{ where: { id: req.params.id }})
    .then(() => {
      res.status(201).send('question closed');
    })
    .catch((err) => {
      console.error('error closing message ', err);
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
  addReputation: addReputation,
  fetchUserInfo: fetchUserInfo,
  closeQuestion: closeQuestion,
  fetchUserByName: fetchUserByName
}