const Brand = require("../models/brandModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

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

// Upload single image for brand
exports.createBrandImage = uploadSingleImage("image");

// Image processing for brand
exports.resizeBrandImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;
  next();
});
