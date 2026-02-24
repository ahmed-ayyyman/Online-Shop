const SubCategory = require("../models/subCategoryModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const CategoryModel = require("../models/categoryModel");

// @desc Get list of all subcategories
// @route GET api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find({})
    .skip(skip)
    .limit(limit)
    .populate("category");
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc Create a subcategory
// @route POST api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  console.log("req.body:", req.body);
  const { name } = req.body;
  let { category } = req.body;

  // allow client to send categoryId or category, or via query/params
  if (!category)
    category = req.body.categoryId || req.params.category || req.query.category;

  console.log("name:", name, "category/resolved:", category);

  if (!category) {
    return next(
      new ApiError(
        "Category ID is required in body as 'category' or 'categoryId'",
        400,
      ),
    );
  }

  // Check if category exists
  const existingCategory = await CategoryModel.findById(category);
  if (!existingCategory) {
    return next(new ApiError(`No category for this ID: ${category}`, 404));
  }

  // Continue with subcategory creation
  const slug = slugify(name);
  const created = await SubCategory.create({ name, slug, category });
  const subCategory = await SubCategory.findById(created._id).populate(
    "category",
  );
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
// @route PUT api/v1/categories/:id
// @access Private

// @desc Delete a specific subcategory by ID
// @route Delete api/v1/categories/:id
// @access Private
