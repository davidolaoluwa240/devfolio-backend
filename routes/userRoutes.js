// Modules
const express = require("express");

// Controllers
const { userController } = require("../controllers");

// Router
const router = express.Router();

// Routes
router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
