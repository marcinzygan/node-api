const express = require('express');
const authControler = require('../controllers/authControler');
const router = express.Router();
const toursControler = require('../controllers/tourControler');
const reviewRouter = require('../routes/reviewRoutes');
//NESTED ROUTES
//POST /tour/2332gd/reviews
//GET /tour/2332gd/reviews
// redirect to reviewRouter
router.use('/:tourId/reviews', reviewRouter);

// router.param('id', toursControler.checkID);
router.route('/stats').get(toursControler.getTourStats);
router.route('/monthly-stats/:year').get(toursControler.getMonthlyPlan);
router
  .route('/top-5-cheap')
  .get(toursControler.aliasTopTours, toursControler.getAllTours);
// GET ALL TOURS AND POST NEW TOUR
router
  .route('/')
  .get(authControler.protect, toursControler.getAllTours)
  .post(toursControler.createTour);
// GET SINGLE TOUR , UPDATE AND DELETE TOUR
router
  .route('/:id')
  .get(toursControler.getSingleTour)
  .patch(toursControler.updateTour)
  .delete(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    toursControler.deleteTour
  );

module.exports = router;
