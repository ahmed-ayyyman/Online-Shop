const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

// Middleware: set filterObj for nested route GET /categories/:categoryId/subcategories
exports.setFilterObj = (req, res, next) => {
  if (req.params.categoryId)
    req.filterObj = { category: req.params.categoryId };
  next();
};

// Middleware: set category from params for nested route POST /categories/:categoryId/subcategories
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc Get list of all subcategories
// @route GET api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory, undefined, "category");

// @desc Create a subcategory
// @route POST api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc Get a specific subcategory by ID
// @route GET api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory, "category");

// @desc Update a specific subcategory by ID
// @route PUT api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc Delete a specific subcategory by ID
// @route DELETE api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
