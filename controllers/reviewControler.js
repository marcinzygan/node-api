const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');

// GET ALL REVIEWS
exports.getAllReviews = factory.getAll(Review);
// GET SINGLE REVIEW
exports.getSingleReview = factory.getOne(Review);

// CREATE REVIEW
//Allow nested routes Middleware used in reviewRoutes
exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = factory.createOne(Review);
// UPDATE REVIEW
exports.updateReview = factory.updateOne(Review);
// DELETE REVIEW
exports.deleteReview = factory.deleteOne(Review);
