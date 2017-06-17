const {
  User,
  Question,
  Answer,
  Field,
  Message,
  User_Field
} = require('../models/tableModels');

const fetchQuestions = (req, res) => {
  Question.findAll()
}

const fetchQuestionAndAnswers = (req, res) => {

}

const postQuestion = (req, res) => {

}

const postAnswer = (req, res) => {

}

const addProfileInfo = (req, res) => {

}

const updateProfile = (req, res) => {

}

module.exports = {
  fetchQuestions: fetchQuestions,
  fetchQuestionAndAnswers: fetchQuestionAndAnswers,
  postQuestion: postQuestion,
  postAnswer: postAnswer,
  addProfileInfo: addProfileInfo,
  updateProfile: updateProfile
}