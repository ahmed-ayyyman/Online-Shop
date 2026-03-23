const User = require("../models/userModel");
const factory = require("./handlersFactory");

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

// @desc Update Specific Brand By ID
// @route PUT api/v1/users/:id
// @access Private
exports.updateUser = factory.updateOne(USer);

// @desc Delete Specific Brand By ID
// @route DELETE api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
