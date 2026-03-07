const express = require("express");

const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategoryImage,
  resizeImage,
} = require("../services/categoryService");

const router = express.Router();
const subCategoriesRoute = require("./subCategoryRoute");

router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .post(
    createCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
