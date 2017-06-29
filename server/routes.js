const router = require('express').Router();
const controller = require('./controllers/controllers');
const jwt = require('express-jwt');
const config = require('../config');

const authCheck = jwt({
  secret: new Buffer(config.secret),
  audience: config.audience
});
router.get('/api/public', function(req, res) {
  res.json({message: 'hello from public endpoint, you dont need to be authenticated'})
});
router.get('/api/private', authCheck, function(req, res) {
  res.json({message: 'hello from private endpoint, you are authenticated'})
});

// router.get('/questions', authCheck, controller.fetchAllQuestions);

// router.get('/questions/:id', authCheck, controller.fetchQuestionAndAnswers);

// router.get('/questions/user/:id', authCheck, controller.fetchQuestionsForUser);

// router.post('/questions', authCheck, controller.postQuestion);
// router.post('/questions/:id', authCheck, controller.postAnswer);

// router.put('/questions/close/:id', authCheck, controller.closeQuestion);

// router.post('/users', authCheck, controller.addUser);
// router.get('/users/:id', authCheck, controller.fetchUserInfo);
// router.get('/users/name/:name', authCheck, controller.fetchUserByName);

// router.put('/users/:id', authCheck, controller.updateUserFieldInfo);

// router.put('/reputation', authCheck, controller.addReputation);

/* */

router.get('/questions', controller.fetchAllQuestions);

router.get('/questions/:id', controller.fetchQuestionAndAnswers);

router.get('/questions/user/:id', controller.fetchQuestionsForUser);

router.post('/questions', controller.postQuestion);
router.post('/questions/:id', controller.postAnswer);

router.put('/questions/close/:id', controller.closeQuestion);

router.post('/users', controller.addUser);
router.get('/users/:id', controller.fetchUserInfo);
router.get('/users/name/:name', controller.fetchUserByName);

router.put('/users/:id', controller.updateUserFieldInfo);

router.put('/reputation', controller.addReputation);

router.get('/ratings', controller.getAllAnswerRating);

module.exports = router;