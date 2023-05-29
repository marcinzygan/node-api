const express = require('express');

const router = express.Router();
const UserControler = require('../controllers/userControler');

//USERS ROUTES

router.route('/').get(UserControler.getAllUsers).post(UserControler.createUser);
router
  .route('/:id')
  .get(UserControler.getUser)
  .patch(UserControler.updateUser)
  .delete(UserControler.deleteUser);

module.exports = router;
// comment