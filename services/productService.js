const Product = require("../models/productModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get list of products
// @route GET api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;

  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search()
    .sort()
    .fields()
    .paginate();

  const productsPromise = features.mongooseQuery;

  // Count total results using the same filters/search (but without pagination/fields)
  const countFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search();
  const totalResultsPromise = countFeatures.mongooseQuery.countDocuments();

  const [products, totalResults] = await Promise.all([
    productsPromise,
    totalResultsPromise,
  ]);

  res.status(200).json({
    results: products.length,
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    page,
    data: products,
  });
});

// @desc Get Specific Product By ID
// @route GET api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category")
    .populate("subCategories")
    .populate("brand");

  if (!product) {
    return next(new ApiError(`No product for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create Product
// @route POST api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subCategories,
    brand,
    quantity,
  } = req.body;

  const product = await Product.create({
    name,
    slug: slugify(name),
    description,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subCategories,
    brand,
    quantity,
  });

  // Populate for consistent response shape
  await product.populate(["category", "subCategories", "brand"]);

  res.status(201).json({ data: product });
});

// @desc Update Specific Product By ID
// @route PUT api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let update = { ...req.body };

  if (update.name) update.slug = slugify(update.name);

  const product = await Product.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  })
    .populate("category")
    .populate("subCategories")
    .populate("brand");

  if (!product) {
    return next(new ApiError(`No product for this ID: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @desc Delete Specific Product By ID
// @route DELETE api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this ID: ${id}`, 404));
  }
  res.status(204).send();
});
