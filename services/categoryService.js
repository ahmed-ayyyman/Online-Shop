const Category = require("../models/categoryModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

// @desc Get list of categories
// @route GET api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);

// @desc Get Specific Category By ID
// @route GET api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);

// @desc Create Category
// @route POST api/v1/categories
// @access Private
exports.createCategory = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.createOne(Category)(req, res, next);
};

// @desc Update Specific Category By ID
// @route PUT api/v1/categories/:id
// @access Private
exports.updateCategory = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.updateOne(Category)(req, res, next);
};

// @desc Delete Specific Category By ID
// @route DELETE api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category);
