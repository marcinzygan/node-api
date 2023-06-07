const express = require('express');

const router = express.Router();
const UserControler = require('../controllers/userControler');
const authControler = require('../controllers/authControler');
//USERS ROUTES
router.route('/signup').post(authControler.signup);
router.route('/login').post(authControler.login);
router.route('/').get(UserControler.getAllUsers).post(UserControler.createUser);
router
  .route('/:id')
  .get(UserControler.getUser)
  .patch(UserControler.updateUser)
  .delete(UserControler.deleteUser);

module.exports = router;
// comment
