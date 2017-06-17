const router = require('express').Router();
const controller = require('./controllers/controllers');

// // do we need these or will auth0 handle these for us?
// router.get('/login', controller.getLogin); // do we need this?
// router.get('/signup', controller.getSignUp); // do we need this?
// router.post('/login', controller.logIn); // do we need this?
// router.post('/signup', controller.signUp); // do we need this?

router.get('/questions', controller.fetchAllQuestions);
// router.get('/answers/:userId', controller.fetchQuestionsForUser);
router.get('/questions/:id', controller.fetchQuestionAndAnswers);

router.post('/question', controller.postQuestion);
router.post('/answer/:id', controller.postAnswer);

router.post('/users', controller.addUser);
router.put('/users/:id', controller.updateUserFieldInfo);

router.put('/reputation/:id', controller.addReputation);

module.exports = router;