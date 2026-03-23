const express = require("express");
// const {
//   getBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
//   createBrandValidator,
// } = require("../utils/validators/brandValidator");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userService");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
