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
router.get('/api/private', function(req, res) {
  res.json({message: 'hello from private endpoint, you are authenticated'})
});

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

router.put('/reputation/:id', controller.addReputation);

module.exports = router;