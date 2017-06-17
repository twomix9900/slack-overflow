const router = require('express').Router();
const controller = require('./controllers/controllers');

// // do we need these or will auth0 handle these for us?
// router.get('/login', controller.getLogin); // do we need this?
// router.get('/signup', controller.getSignUp); // do we need this?
// router.post('/login', controller.logIn); // do we need this?
// router.post('/signup', controller.signUp); // do we need this?

router.get('/questions', controller.fetchQuestions);
router.get('/questions/:id', controller.fetchQuestionAndAnswers);

router.post('/question', controller.postQuestion);
router.post('/answer/:id', controller.postAnswer);

router.post('/profile', controller.addProfileInfo);
router.put('/profile/:id', controller.updateProfile);

module.exports = router;