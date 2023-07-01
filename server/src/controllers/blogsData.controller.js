const blogModel = require("../models/blog.model");

const addAllBlogs = (req, res) => {
  // lấy model rồi truyền qua bên userRoute
  blogModel.addAllBlogsFromFile(res);
};

const getAllBlog = (req, res) => {
  // do something
  blogModel.modelGetAllBlog(res);
};

module.exports = {
  addAllBlogs,
  getAllBlog,
};
