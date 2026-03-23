const express = require("express");
const {
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  createProductValidator,
} = require("../utils/validators/productValidator");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const {
  uploadProductImages,
  resizeProductImages,
} = require("../middlewares/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct,
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct,
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
