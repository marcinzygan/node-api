const express = require('express');

const router = express.Router();
const UserControler = require('../controllers/userControler');
const authControler = require('../controllers/authControler');

//USERS ROUTES
router.route('/signup').post(authControler.signup);
router.route('/login').post(authControler.login);
router.route('/forgotPassword').post(authControler.forgotPassword);
router.route('/resetPassword/:token').patch(authControler.resetPassword);

//Will use authController on all routes after this middleware (line of code)
router.use(authControler.protect);

router.route('/updateMyPassword').patch(authControler.updatePassword);

router.route('/me').get(UserControler.getMe, UserControler.getUser);

router.route('/updateMe').patch(UserControler.updateMe);

router.route('/deleteMe').delete(UserControler.deleteMe);

//Will use authController on all routes after this middleware (line of code)
router.use(authControler.restrictTo('admin'));

router.route('/').get(UserControler.getAllUsers).post(UserControler.createUser);

router
  .route('/:id')
  .get(UserControler.getUser)
  .patch(UserControler.updateUser)
  .delete(UserControler.deleteUser);

module.exports = router;
