// Models
const { User } = require("../models");

// Controllers
const handlerFactory = require("./handlerFactory");

// Get All User
const getAllUser = handlerFactory.getAll(User, "users");

// Get Single User
const getUser = handlerFactory.getOne(User, "user");

module.exports = { getAllUser, getUser };
