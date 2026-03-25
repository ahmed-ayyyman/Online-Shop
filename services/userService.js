const User = require("../models/userModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");

// @desc Get list of users
// @route GET api/v1/users
// @access Public
exports.getUsers = factory.getAll(User);

// @desc Get Specific Brand By ID
// @route GET api/v1/users/:id
// @access Public
exports.getUser = factory.getOne(User);

// @desc Create Brand
// @route POST api/v1/users
// @access Private
exports.createUser = factory.createOne(User);

// @desc Update Specific User By ID (except password)
// @route PUT api/v1/users/:id
// @access Private
exports.updateUser = (req, res, next) => {
  // prevent updating password via this route
  if (req.body.password) delete req.body.password;
  if (req.body.passwordConfirm) delete req.body.passwordConfirm;
  // delegate to generic update handler
  return factory.updateOne(User)(req, res, next);
};

// @desc Update user's password
// @route PUT api/v1/users/:id/password
// @access Private
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ApiError("Current and new passwords are required", 400));
  }

  const user = await User.findById(id).select("+password");
  if (!user) return next(new ApiError(`No user for this ID: ${id}`, 404));

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return next(new ApiError("Current password is incorrect", 401));

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});

// @desc Delete Specific Brand By ID
// @route DELETE api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
