const express = require("express");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator.js");

const {
  getSubCategories,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService.js");

const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
