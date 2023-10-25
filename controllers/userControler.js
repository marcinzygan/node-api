const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// UPDATE CURRENT USER
exports.updateMe = catchAsync(async (req, res, next) => {
  //1 Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates , please use /updateMyPassword',
        400
      )
    );
  }
  //2 Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findOneAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
// DELETE CURRENT USER
exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'succees',
    data: null,
  });
});
//GET CURRENT USER
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
//GET ALL USERS
exports.getAllUsers = factory.getAll(User);
// GET SINGLE USER
exports.getUser = factory.getOne(User);
//U[DATE USER --- DO NOT UPDATE PASSWORD WITH THIS ---
exports.updateUser = factory.updateOne(User);
// DELETE USER
exports.deleteUser = factory.deleteOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined! Please use /signup instead ',
  });
};
