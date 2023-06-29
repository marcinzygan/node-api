const express = require('express');
const router = express.Router();
const authControler = require('../controllers/authControler');
const reviewControler = require('../controllers/reviewControler');

router
  .route('/')
  .get(reviewControler.getAllReviews)
  .post(
    authControler.protect,
    authControler.restrictTo('user'),
    reviewControler.createReview
  );

module.exports = router;
