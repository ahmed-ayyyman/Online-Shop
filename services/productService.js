const Product = require("../models/productModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

// @desc Get list of products
// @route GET api/v1/products
// @access Public
exports.getProducts = (req, res, next) => {
  // keep previous default limit of 50 when not provided
  if (!req.query.limit) req.query.limit = "50";
  return factory.getAll(Product, ["category", "subCategories", "brand"])(
    req,
    res,
    next,
  );
};

// @desc Get Specific Product By ID
// @route GET api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product, [
  "category",
  "subCategories",
  "brand",
]);

// @desc Create Product
// @route POST api/v1/products
// @access Private
exports.createProduct = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.createOne(Product, ["category", "subCategories", "brand"])(
    req,
    res,
    next,
  );
};

// @desc Update Specific Product By ID
// @route PUT api/v1/products/:id
// @access Private
exports.updateProduct = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.updateOne(Product, ["category", "subCategories", "brand"])(
    req,
    res,
    next,
  );
};

// @desc Delete Specific Product By ID
// @route DELETE api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);
