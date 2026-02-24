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
    if (!req.body.category && !req.body.categoryId) {
      throw new Error(
        "Category ID is required (body field 'category' or 'categoryId')",
      );
    }
    return true;
  }),

  // normalize category value so downstream code can use `req.body.category`
  body("category").customSanitizer(
    (val, { req }) => req.body.category || req.body.categoryId,
  ),

  body("category").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];

exports.getSubCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid SubCategory ID"),
  validatorMiddleware,
];
