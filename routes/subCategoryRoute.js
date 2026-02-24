const express = require("express");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator.js");

const {
  getSubCategories,
  createSubCategory,
  getSubCategory,
} = require("../services/subCategoryService.js");

const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router.route("/:id").get(getSubCategoryValidator, getSubCategory);

module.exports = router;
