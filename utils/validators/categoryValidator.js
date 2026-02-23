const { param, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 20 })
    .withMessage("Category name must not exceed 20 characters"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("Category name must not exceed 20 characters")
    .bail()
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Category name can only contain letters, numbers and spaces"),
  validatorMiddleware,
];
