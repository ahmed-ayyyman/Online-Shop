const { param, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ max: 20 })
    .withMessage("Brand name must not exceed 20 characters"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  param("id").isMongoId().withMessage("Invalid Brand ID"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("Brand name must not exceed 20 characters")
    .bail()
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Brand name can only contain letters, numbers and spaces"),
  validatorMiddleware,
];
