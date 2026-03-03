const Category = require("../models/categoryModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get list of categories
// @route GET api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;

  const features = new ApiFeatures(Category.find(), req.query)
    .filter()
    .search()
    .sort()
    .fields()
    .paginate();

  const categoriesPromise = features.mongooseQuery;
  const countFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .search();
  const totalResultsPromise = countFeatures.mongooseQuery.countDocuments();

  const [categories, totalResults] = await Promise.all([
    categoriesPromise,
    totalResultsPromise,
  ]);

  res.status(200).json({
    results: categories.length,
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    page,
    data: categories,
  });
});

// @desc Get Specific Category By ID
// @route GET api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this ID:${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Create Category
// @route POST api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ApiError("Category name is required"), 400);
  }

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update Specific Category By ID
// @route PUT api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true },
  );
  if (!category) {
    return next(new ApiError(`No category for this ID:${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Delete Specific Category By ID
// @route DELETE api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No category for this ID:${id}`, 404));
  }
  res.status(200).json({ msg: "Category deleted successfully" });
});
