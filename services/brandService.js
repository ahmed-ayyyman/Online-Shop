const Brand = require("../models/brandModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

// @desc Get list of brands
// @route GET api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);

// @desc Get Specific Brand By ID
// @route GET api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc Create Brand
// @route POST api/v1/brands
// @access Private
exports.createBrand = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.createOne(Brand)(req, res, next);
};

// @desc Update Specific Brand By ID
// @route PUT api/v1/brands/:id
// @access Private
exports.updateBrand = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  return factory.updateOne(Brand)(req, res, next);
};

// @desc Delete Specific Brand By ID
// @route DELETE api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);
