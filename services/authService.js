const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");

// @desc Signup
// @route POST api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2) Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Validate input
  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }

  // 2) Check if user exists & get password
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ApiError("Incorrect email or password", 401));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new ApiError("Incorrect email or password", 401));

  // 3) Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  // 4) Send response (without password)
  const userObj = user.toObject();
  delete userObj.password;
  res.status(200).json({ data: userObj, token });
});
