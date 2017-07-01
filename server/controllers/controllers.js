"use strict";
const {
  User,
  Question,
  Answer,
  Field,
  Message,
  User_Field,
  Ans_Ratings
} = require('../models/tableModels');
// var User = require('../models/tableModels').User;
// var Question = require('../models/tableModels').Question;
// var Answer = require('../models/tableModels').Answer;
// var Field = require('../models/tableModels').Field;
// var Message = require('../models/tableModels').Message;
// var User_Field = require('../models/tableModels').User_Field;
// var Ans_Ratings = require('../models/tableModels').Ans_Ratings;

var dotenv = require('dotenv').config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const host_index = (req, res) => {
  User.findAll({
    where: {
      is_hosting: true
    }
  })
  .then((users) => {
    // console.log('should be users array >', users)
    res.json({success: true, message: 'all users hosting', users: users})
  })
  .catch((err) => {
    return console.log(err, '< error')
  })
}

const update_host = (req, res) => {
  // console.log(req.body, '<<<<<< test')
  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then((user) => {
    // console.log(user, '<<<<<<< test user')
    User.update({
        is_hosting: req.body.is_hosting
      }, {
          where: {
            id: user.dataValues.id
          }
        })
        .then((status) => {
          res.json( { success: true, message: 'user hosting status updated successfully', user: user, status: status} );
        })
        .catch((err) => {
          return console.log(err, '< error')
        })
  })
  .catch((err) => {
    return console.log(err, '< error')
  })
}

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
    where: {
      id: userId
    },
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
      where: {
        id: questionId
      },
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
  let {
    userId,
    title,
    text,
    fieldId
  } = req.body;
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
  let {
    userId,
    text
  } = req.body;

  Answer.create({
      userId: userId,
      text: text,
      questionId: req.params.id,
      totalRating: 0
    })
    .then(() => {
      Question.find({
        where: {
          id: req.params.id
        }
      })
        .then((question) => {
          User.find({
            where: {
              id: question.dataValues.userId
            }
          })
            .then((user) => {
              let formattedPhoneNumber = user.dataValues.phoneNumber;
              formattedPhoneNumber = formattedPhoneNumber.replace(/[^\d]/g, '');
              if (formattedPhoneNumber.length === 10) {
                client.messages.create({
                  to: '+1' + formattedPhoneNumber,
                  from: "+1" + process.env.TWILIO_NUMBER,
                  body: 'Someone posted an answer to one of your questions on Slack Betterflow!'
                })
              };
              res.status(201).send('successfully posted an answer');
            })
        })
    })
    .catch((err) => {
      console.error('error posting an answer ', err);
    })
}

const updateAnswerTotalRating = (req, res) => {
  console.log('*** req.body info ', req.body);
  Answer.update({ totalRating: req.body.rating },
    { where: {
      id: req.body.answerId     
    }})
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error('error updating ratings', err)
    })
}

const addUser = (req, res) => {
  let name = req.body.user;
  let image = req.body.image;
  // let fields = req.body.fields;
  let userId;
  User.findOrCreate({
    where: {
      name: name
    },
    defaults: {
      reputation: 0,
      image: image
    }
  })
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
  console.log('req.body = ', req.body);
  let userId = req.params.id;
  let updateFields = req.body.fields;
  User_Field.destroy({
    where: {
      userId: userId
    }
  })
    .then(() => {
      console.log('updatefields = ', updateFields)
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
  
  let repUserId = req.body.id;
  let repAdd = req.body.rep;
  User.find({
    where: {
      id: repUserId
    }
  })
    .then((user) => {
      let newRep = user.dataValues.reputation + repAdd;
      User.update({
        reputation: newRep
      }, {
          where: {
            id: repUserId
          }
        })
      console.log('user from controllers.js = ', user)
    })
    .then(() => {
      res.status(201).send('successfully added reputation');
    })
    .catch((err) => {
      console.error('error adding reputation ', err);
    })



}

const updatePhoneNumber = (req, res) => {
  // console.log('updatePhoneNumber invok ed from  controllers.js');
  // eg req.body = { id: 9, phoneNumber: '1234431', fields: [] }
  console.log('req.body = ', req.body);

  let repUserId = req.params.id;
  User.find({
    where: {
      id: repUserId
    }
  })
    .then((user) => {
      let newPhoneNumber = user.dataValues.phoneNumber;
      User.update({
        phoneNumber: req.body.phoneNumber
      }, {
          where: {
            id: repUserId
          }
        })
    })
    .then(() => {
      res.status(201).send('successfully updated phone number');
    })
    .catch((err) => {
      console.error('error updating phone number', err);
    })
}


const fetchUserInfo = (req, res) => {
  User.find({
    where: {
      id: req.params.id
    },
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
    where: {
      name: req.params.name
    },
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
  }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.status(201).send('question closed');
    })
    .catch((err) => {
      console.error('error closing message ', err);
    })
}

const getAllAnswerRating = (req, res) => {
  console.log('*** trying to get all rating ***');
  Ans_Ratings.findAll({
    where: { answerId: req.params.id }
  })
    .then((data) => {
      res.json({
        data: data
      })
    })
    .catch((err) => {
      console.error('error getting answer ratings', err);
    })
}

const getAnswerRating = (req, res) => {
  Ans_Ratings.findOne({ where: {
    userId: req.params.userId,
    answerId: req.params.answerId
  }}).then((obj) => {
    if (obj) {
      console.log('*** *** *** object to return', obj.dataValues.rating);
      var temp = -(obj.dataValues.rating - 20) / 5 + 1;
      console.log('*** *** *** object to return', temp);

      var value = {
        data: temp
      }
      res.status(200);
      res.json(value);
    } else {
      console.log('*** *** *** return default value');
      var value = {
        data: 0
      };
      res.status(200);
      res.json(value);
    }
  })
}


const updateAnswerRating = (req, res) => {
  // let repAdd = req.body.rep
  // Ans_Ratings.find({
  //   where: {
  //     userId: req.body.userId,
  //     answerId: req.body.answerId
  //   }
  // }).then((answerRating) => {
  //   let newRating = answerRating.datavalue.rating + repAdd;
  //   Ans_Ratings.update({
  //     rating: newRating
  //   }, {
  //       where: {
  //         userId: req.body.userId,
  //         answerId: req.body.answerId
  //       }
  //     })
  //     .then(() => {
  //       res.status(201).send('successfully added rating');
  //     })
  //     .catch((err) => {
  //       console.error('error adding rating ', err);
  //     })
  console.log('*** attempting to update ***', req.body);
  Ans_Ratings.update({
    rating: req.body.rating
  }, { where: {
    userId: req.body.userId,
    answerId: req.body.answerId
  }}).then(() => {
    res.sendStatus(201);
  }).catch((err) => {
    console.error('error adding rating ', err);
  })
}


const postAnswerRating = (req, res) => {
  console.log('*** attempting to create ***')
  // Ans_Ratings.create({
  //   userId: req.body.userId,
  //   answerId: req.body.answerId,
  //   rating: req.body.rating
  // }).then(() => {
  //   console.log('*** successful creating rating ***')
  //   res.sendStatus(201);
  // })
  // .catch((err) => {
  //   console.log('error rating answer', err);
  // })
  Ans_Ratings.findOne({ where: {
    userId: req.body.userId,
    answerId: req.body.answerId
  }}).then((obj) => {
    if (obj) {
      console.log('*** i already exist ***')
      Ans_Ratings.update({
        rating: req.body.rating
      }, { where: {
        userId: req.body.userId,
        answerId: req.body.answerId
      }}).then(() => {
        console.log('*** successful updating rating ***')
        res.sendStatus(201);
      })
    } else {
      Ans_Ratings.create({
      userId: req.body.userId,
      answerId: req.body.answerId,
      rating: req.body.rating
      }).then(() => {
        console.log('*** successful creating rating ***')
        res.sendStatus(201);
      }).catch((err) => {
        console.log('error rating answer', err);
      })
    }  
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
  fetchUserByName: fetchUserByName,
  updatePhoneNumber: updatePhoneNumber,
  host_index: host_index,
  update_host: update_host,
  getAllAnswerRating: getAllAnswerRating,
  updateAnswerRating: updateAnswerRating,
  postAnswerRating: postAnswerRating,
  updateAnswerTotalRating: updateAnswerTotalRating,
  getAnswerRating: getAnswerRating
}
