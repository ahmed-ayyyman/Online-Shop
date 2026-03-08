const express = require("express");
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../utils/validators/brandValidator");

const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
const {
  createBrandImage,
  resizeBrandImage,
} = require("../services/brandService");

const router = express.Router();

router
  .route("/")
  .post(createBrandImage, resizeBrandImage, createBrandValidator, createBrand)
  .get(getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(createBrandImage, resizeBrandImage, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
