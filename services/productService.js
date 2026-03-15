const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc Get list of products
// @route GET api/v1/products
// @access Public
exports.getProducts = factory.getAll(
  Product,
  "Product",
  "category subCategories brand",
);

// @desc Get Specific Product By ID
// @route GET api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product, "category subCategories brand");

// @desc Create Product
// @route POST api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);

// @desc Update Specific Product By ID
// @route PUT api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @desc Delete Specific Product By ID
// @route DELETE api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);
