const router = require('express').Router();
const controller = require('./controllers/controllers');
const jwt = require('express-jwt');

// // do we need these or will auth0 handle these for us?
// router.get('/login', controller.getLogin); // do we need this?
// router.get('/signup', controller.getSignUp); // do we need this?
// router.post('/login', controller.logIn); // do we need this?
// router.post('/signup', controller.signUp); // do we need this?

const authCheck = jwt({
  secret: new Buffer('czR3QSYYTY6dImCfroTZqdXvpYOOwPsOJtVISE3kWyR1Q0AiEz4rVMSw_RvU5iL3'),
  audience: 'ku4AUn23UfSipuIY4l8e8WovJ10X5XuY'
});
router.get('/api/public', function(req, res) {
  res.json({message: 'hello from public endpoint, you dont need to be authenticated'})
});
router.get('/api/private', authCheck, function(req, res) {
  res.json({message: 'hello from private endpoint, you are authenticated'})
});

router.get('/questions', authCheck, controller.fetchAllQuestions);
// router.get('/answers/:userId', controller.fetchQuestionsForUser);

router.get('/questions/:id', authCheck, controller.fetchQuestionAndAnswers);

router.get('/questions/user/:id', authCheck, controller.fetchQuestionsForUser);

router.post('/questions', authCheck, controller.postQuestion);
router.post('/questions/:id', authCheck, controller.postAnswer);

router.put('/questions/close/:id', authCheck, controller.closeQuestion);

router.post('/users', authCheck, controller.addUser);
router.get('/users/:id', authCheck, controller.fetchUserInfo);
router.put('/users/:id', authCheck, controller.updateUserFieldInfo);

router.put('/reputation/:id', authCheck, controller.addReputation);

module.exports = router;