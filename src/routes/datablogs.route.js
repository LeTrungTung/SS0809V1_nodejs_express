const express = require("express");
const route = express.Router();
const blogController = require("../controllers/blogsData.controller");

route.get("/add", blogController.addAllBlogs);
route.get("/", blogController.getAllBlog);
route.patch("/:id", blogController.editBlog);
route.delete("/:id", blogController.deleteBlog);

module.exports = route;
