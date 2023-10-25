const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
// DELETE ONE
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID'), 404);
    }

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  });
// UPDATE ONE
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID'), 404);
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        doc,
      },
      message: 'request accepted',
    });
  });
// CREATE ONE
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });
// GET ONE
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID'), 404);
    }
    res.status(200).json({
      status: 'sucess',
      data: { data: doc },
    });
  });
// GET ALL
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on Tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // Execute query
    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    // send response
    res.status(200).json({
      status: 'sucess',
      results: doc.length,
      requestedAt: req.requestTime,
      data: {
        data: doc,
      },
    });
  });
