const blogModel = require("../models/blog.model");

const addAllBlogs = (req, res) => {
  // lấy model rồi truyền qua bên userRoute
  blogModel.addAllBlogsFromFile(res);
};

const getAllBlog = (req, res) => {
  // do something
  blogModel.modelGetAllBlog(res);
};

const editBlog = (req, res) => {
  const id = Number(req.params.id);
  const { userId, title, body } = req.body;
  const editContent = { userId, title, body };

  blogModel.modelEditBlog(id, editContent, res);
};

const deleteBlog = (req, res) => {
  // do something
  const id = req.params.id;
  blogModel.modelDeleteBlog(id, res);
};

module.exports = {
  addAllBlogs,
  getAllBlog,
  editBlog,
  deleteBlog,
};
