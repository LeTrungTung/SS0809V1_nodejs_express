const sql = require("../db/db.connect");
// import file  user.json
const blogs = require("../../dev-data/blogs.json");

const addAllBlogsFromFile = (res) => {
  // blogs.forEach((blog) => {
  //   sql.query(
  //     "INSERT INTO blogs (userId, title, body) VALUES (?, ?, ?)",
  //     [blog.userId, blog.title, blog.body],
  //     (err) => {
  //       if (err) {
  //         console.error("Lỗi thêm dữ liệu vào bảng blogs:", err);
  //         return;
  //       }
  //     }
  //   );
  // });
  res.status(200).json(blogs);
};
const modelGetAllBlog = (res) => {
  let query = `SELECT blogs.*, users.username 
                FROM blogs JOIN users ON blogs.userId = users.id_user`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelEditBlog = (id, editContent, res) => {
  // Kiểm tra id đã tồn tại trong CSDL chưa
  const checkIdBlog = `SELECT * FROM blogs WHERE id = ?`;
  sql.query(checkIdBlog, [id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }
    let query = `UPDATE blogs SET userId=?, title=?,body=? WHERE id=?`;
    const blog = [
      editContent.userId,
      editContent.title,
      editContent.body,
      id,
    ];
    console.log(55555, blog);
    sql.query(query, blog, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ msg: "Update blog successfully" });
    });
  });
};

const modelDeleteBlog = (id, res) => {
  // Kiểm tra id đã tồn tại trong CSDL chưa
  const checkIdBlog = `SELECT * FROM blogs WHERE id = ?`;
  sql.query(checkIdBlog, [id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }
    // nếu tìm thấy id thì tiến hành xoá dữ liệu trong blogs
    const deleteBlog = `DELETE FROM blogs WHERE id = ?;`;
    sql.query(deleteBlog, [id], (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Blog deleted successfully" });
      }
    });
  });
};

module.exports = {
  addAllBlogsFromFile,
  modelGetAllBlog,
  modelEditBlog,
  modelDeleteBlog,
};
