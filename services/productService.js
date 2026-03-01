const Product = require("../models/productModel");
var slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc Get list of products
// @route GET api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtering
  const queryStringObj = { ...req.query };
  const excludedFields = ["page", "limit", "sort", "fields", "keyword"];

  excludedFields.forEach((field) => delete queryStringObj[field]);

  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const filterObj = queryStr && queryStr !== "{}" ? JSON.parse(queryStr) : {};

  // 2) Search — merge into filterObj so countDocuments reflects it too
  if (req.query.keyword) {
    filterObj.$or = [
      { name: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
  }

  // 3) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // 4) Build find query
  let findQuery = Product.find(filterObj).skip(skip).limit(limit);

  // 5) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    findQuery = findQuery.sort(sortBy);
  } else {
    findQuery = findQuery.sort("-createdAt");
  }

  // 6) Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    findQuery = findQuery.select(fields);
  } else {
    findQuery = findQuery.select("-__v");
  }

  // Execute both queries in parallel
  const [products, totalResults] = await Promise.all([
    findQuery,
    Product.countDocuments(filterObj),
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
