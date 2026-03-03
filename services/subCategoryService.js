const SubCategory = require("../models/subCategoryModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const CategoryModel = require("../models/categoryModel");
const factory = require("./handlersFactory");

// @desc Get list of all subcategories
// @route GET api/v1/subcategories
// @access Public
exports.getSubCategories = (req, res, next) => {
  if (req.params.categoryId) req.filter = { category: req.params.categoryId };
  return factory.getAll(SubCategory, "category")(req, res, next);
};

// @desc Create a subcategory
// @route POST api/v1/subcategories
// @access Private
exports.createSubCategory = (req, res, next) => {
  // ensure nested category id is applied when using nested routes
  if (!req.body.category)
    req.body.category = req.body.categoryId || req.params.categoryId;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.createOne(SubCategory)(req, res, next);
};
// @desc Get a specific subcategory by ID
// @route GET api/v1/categories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory, "category");

// @desc Update a specific subcategory by ID
// @route PUT api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = (req, res, next) => {
  // normalize nested category param
  if (!req.body.category && req.params.categoryId)
    req.body.category = req.params.categoryId;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.updateOne(SubCategory)(req, res, next);
};

// @desc Delete a specific subcategory by ID
// @route Delete api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
