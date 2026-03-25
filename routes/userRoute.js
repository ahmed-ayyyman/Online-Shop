const express = require("express");
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
} = require("../utils/validators/userValidator");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require("../services/userService");

const router = express.Router();

router.put("/updateUserPassword/:id", updateUserPassword);

router.route("/").post(createUserValidator, createUser).get(getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
