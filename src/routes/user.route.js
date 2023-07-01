const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.controller");

// controller
route.get("/add", userController.addAllUserFromFIle);

route.get("/", userController.getAllUser);

route.get("/users-address-company", userController.getJoinUser);

route.get("/:id", userController.getUserById);

route.patch("/:id", userController.editUser);
route.post("/", userController.addUser);
route.delete("/:id", userController.deleteUser);

module.exports = route;
