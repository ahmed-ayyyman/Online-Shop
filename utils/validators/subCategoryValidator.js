const { param, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createSubCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("SubCategory name is required")
    .bail()
    .isLength({ min: 2, max: 32 })
    .withMessage("SubCategory name must be between 2 and 32 characters"),

  // accept either `category` or `categoryId` from client
  body().custom((value, { req }) => {
    if (!req.body.category && !req.body.categoryId && !req.params.categoryId) {
      throw new Error("Category ID is required");
    }
    return true;
  }),

  // normalize category value so downstream code can use `req.body.category`
  body("category").customSanitizer(
    (val, { req }) =>
      req.body.category || req.body.categoryId || req.params.categoryId,
  ),

  body("category").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

exports.getSubCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid SubCategory ID"),

  // at least one of name or category must be provided
  body()
    .custom((value, { req }) => {
      if (!req.body.name && !req.body.category && !req.body.categoryId) {
        throw new Error(
          "At least one field (name or category) is required to update",
        );
      }
      return true;
    })
    .bail(),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 32 })
    .withMessage("SubCategory name must be between 2 and 32 characters"),

  // normalize category field
  body("category").customSanitizer(
    (val, { req }) => req.body.category || req.body.categoryId,
  ),
  body("category").optional().isMongoId().withMessage("Invalid Category ID"),

  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];
