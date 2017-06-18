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

router.get('/questions', controller.fetchQuestions);
router.get('/questions/:id', controller.fetchQuestionAndAnswers);

router.post('/question', controller.postQuestion);
router.post('/answer/:id', controller.postAnswer);

router.post('/profile', controller.addProfileInfo);
router.put('/profile/:id', controller.updateProfile);

module.exports = router;