// Modules
const express = require("express");

// Controllers
const { userController } = require("../controllers");

// Router
const router = express.Router();

// Routes
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
