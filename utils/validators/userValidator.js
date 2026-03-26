const { param, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getUserValidator = [
  param("id").isMongoId().withMessage("Invalid User ID"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid User ID"),
  validatorMiddleware,
];

exports.createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("ar-EG")
    .withMessage("Only accepted are EG numbers"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid User ID"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  validatorMiddleware,
];

exports.loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  param("id").isMongoId().withMessage("Invalid User ID"),
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  validatorMiddleware,
];
