const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Category = require("../models/categoryModel");

// Upload single image
exports.createCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  // Save the filename on the body so it can be stored in the DB
  req.body.image = filename;
  next();
});

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
