const SubCategory = require("../models/subCategoryModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const CategoryModel = require("../models/categoryModel");
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get list of all subcategories
// @route GET api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const features = new ApiFeatures(
    SubCategory.find(filterObject).populate("category"),
    req.query,
  )
    .filter()
    .search()
    .sort()
    .fields()
    .paginate();

  const subCategoriesPromise = features.mongooseQuery;
  const countFeatures = new ApiFeatures(
    SubCategory.find(filterObject),
    req.query,
  )
    .filter()
    .search();
  const totalResultsPromise = countFeatures.mongooseQuery.countDocuments();

  const [subCategories, totalResults] = await Promise.all([
    subCategoriesPromise,
    totalResultsPromise,
  ]);

  res.status(200).json({
    results: subCategories.length,
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    page,
    data: subCategories,
  });
});

// @desc Create a subcategory
// @route POST api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  const { name, category } = req.body;
  // Check if category exists
  const existingCategory = await CategoryModel.findById(category);
  if (!existingCategory) {
    return next(new ApiError(`No category for this ID: ${category}`, 404));
  }
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
// @desc Get a specific subcategory by ID
// @route GET api/v1/categories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate("category");
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Update a specific subcategory by ID
// @route PUT api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("updateSubCategory req.body:", req.body);
  const { name } = req.body;
  if (!category) category = req.body.categoryId;

  if (category) {
    const existingCategory = await CategoryModel.findById(category);
    if (!existingCategory) {
      return next(new ApiError(`No category for this ID: ${category}`, 404));
    }
  }

  const update = {};
  if (name) {
    update.name = name;
    update.slug = slugify(name);
  }
  if (category) update.category = category;

  const subCategory = await SubCategory.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).populate("category");

  if (!subCategory) {
    return next(new ApiError(`No subcategory for this ID: ${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc Delete a specific subcategory by ID
// @route Delete api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this ID: ${id}`, 404));
  }
  res.status(204).json({ msg: "Category deleted successfully" });
});
