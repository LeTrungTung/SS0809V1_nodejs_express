//Import Modal

const userModel = require("../models/user.model");

const addAllUserFromFIle = (req, res) => {
  // lấy model rồi truyền qua bên userRoute
  userModel.modelAddUsers(res);
};

const getAllUser = (req, res) => {
  // do something
  userModel.modelGetAllUser(res);
};

const getJoinUser = (req, res) => {
  // do something
  userModel.modelGetJoinUser(res);
};

const getUserById = (req, res) => {
  // do something
  const id = req.params.id;
  userModel.modelGetUserById(id, res);
};

const editUser = (req, res) => {
  // do something
  const id = Number(req.params.id);
  const editContent = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address_id: req.body.address_id,
    phone: req.body.phone,
    website: req.body.website,
    company_id: req.body.company_id,
  };

  userModel.modelEditUser(id, editContent, res);
};

module.exports = {
  addAllUserFromFIle,
  getAllUser,
  getJoinUser,
  getUserById,
  editUser,
};
