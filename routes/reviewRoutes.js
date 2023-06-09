const express = require('express');
//Params merged to get id from "tours/:tourId/reviews"
const router = express.Router({ mergeParams: true });
const authControler = require('../controllers/authControler');
const reviewControler = require('../controllers/reviewControler');

//POST /tour/234fws3/reviews
//POST /reviews

router
  .route('/')
  .get(reviewControler.getAllReviews)
  .post(
    authControler.protect,
    authControler.restrictTo('user'),
    reviewControler.createReview
  );

module.exports = router;
