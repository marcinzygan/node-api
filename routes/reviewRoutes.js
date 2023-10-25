const express = require('express');
//Params merged to get id from "tours/:tourId/reviews"
const router = express.Router({ mergeParams: true });
const authControler = require('../controllers/authControler');
const reviewControler = require('../controllers/reviewControler');

//POST /tour/234fws3/reviews
//POST /reviews

//Will use authController on all routes after this middleware (line of code)

router.use(authControler.protect);
router
  .route('/')
  .get(reviewControler.getAllReviews)
  .post(
    authControler.restrictTo('user'),
    reviewControler.setTourUserIds,
    reviewControler.createReview
  );
router
  .route('/:id')
  .get(reviewControler.getSingleReview)
  .patch(
    authControler.restrictTo('user', 'admin'),
    reviewControler.updateReview
  )
  .delete(
    authControler.restrictTo('user', 'admin'),
    reviewControler.deleteReview
  );

module.exports = router;
