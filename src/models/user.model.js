const sql = require("../db/db.connect");
const users = require("../../dev-data/users.json");

// Thêm dữ liệu vào cơ sở dữ liệu

const modelAddUsers = (res) => {
  //   console.log(typeof users);
  //   users.forEach((user) => {
  //     const address = user.address;
  //     const company = user.company;
  //     // Thêm dữ liệu vào bảng address
  //     sql.query(
  //       "INSERT INTO addresses (street, suite, city, zipcode) VALUES (?, ?, ?, ?)",
  //       [address.street, address.suite, address.city, address.zipcode],
  //       (err, result) => {
  //         if (err) {
  //           console.error("Lỗi thêm dữ liệu vào bảng address:", err);
  //           return;
  //         }
  //         const addressId = result.insertId;
  //         //    Thêm dữ liệu vào bảng geo
  //         sql.query(
  //           "INSERT INTO geos (lat, lng, address_id) VALUES (?, ?, ?)",
  //           [address.geo.lat, address.geo.lng, addressId],
  //           (err) => {
  //             if (err) {
  //               console.error("Lỗi thêm dữ liệu vào bảng geo:", err);
  //               return;
  //             }
  //           }
  //         );

  //         // Thêm dữ liệu vào bảng company
  //         sql.query(
  //           "INSERT INTO companies (name, catchPhrase, bs) VALUES (?, ?, ?)",
  //           [company.name, company.catchPhrase, company.bs],
  //           (err, result) => {
  //             if (err) {
  //               console.error("Lỗi thêm dữ liệu vào bảng company:", err);
  //               return;
  //             }

  //             const companyId = result.insertId;

  //             // Thêm dữ liệu vào bảng users
  //             sql.query(
  //               "INSERT INTO users (name, username, email, address_id, phone, website, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
  //               [
  //                 user.name,
  //                 user.username,
  //                 user.email,
  //                 addressId,
  //                 user.phone,
  //                 user.website,
  //                 companyId,
  //               ],
  //               (err) => {
  //                 if (err) {
  //                   console.error("Lỗi thêm dữ liệu vào bảng users:", err);
  //                   return;
  //                 }
  //               }
  //             );
  //           }
  //         );
  //       }
  //     );
  //   });
  res.status(200).json(users);
};

const modelAddUser = (newUser, res) => {
  // Kiểm tra username đã tồn tại trong CSDL chưa
  const checkUsernameQuery = `SELECT * FROM users WHERE username = ?`;
  sql.query(checkUsernameQuery, [newUser.username], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // nếu chưa có username thì cho thêm mới
    const insertData = `INSERT INTO users SET ?`;
    sql.query(insertData, newUser, (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res.status(200).json({ msg: "Thêm mới thành công" });
    });
  });
};

const modelDeleteUser = (id, res) => {
  // Kiểm tra id đã tồn tại trong CSDL chưa
  const checkIdUser = `SELECT * FROM users WHERE id_user = ?`;
  sql.query(checkIdUser, [id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    // nếu tìm thấy id thì tiến hành xoá dữ liệu trong blogs, users
    // B1: Xoá các users trong bảng con blogs
    const deleteUserInBlogs = `DELETE FROM blogs WHERE userId = ?;`;
    sql.query(deleteUserInBlogs, [id], (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      } else {
        // B2: Sau khi xoá user trong blogs thì xoá users trong bảng users tại dòng id
        const deleteUserInUsers = `DELETE FROM users WHERE id_user = ?`;
        sql.query(deleteUserInUsers, id, (error) => {
          if (error) {
            console.error("Error updating tables: ", error);
            res.status(500).json({ message: "Server error" });
          } else {
            res
              .status(200)
              .json({ message: "User deleted successfully" });
          }
        });
      }
    });
  });
};

const modelGetAllUser = (res) => {
  let query = `SELECT * FROM users`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelGetJoinUser = (res) => {
  let query = `SELECT * FROM users 
                  JOIN address ON users.address_id = address.id
                  JOIN geo ON geo.id_address = address.id
                  JOIN company ON users.company_id = company.id`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelGetUserById = (id, res) => {
  let query = `SELECT * FROM users WHERE id_user=${id}`;

  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelEditUser = (id, editContent, res) => {
  let query = `UPDATE users SET name=?, username=?,email=?,address_id=?,phone=?,website=?,company_id=? WHERE id_user=?`;
  const user = [
    editContent.name,
    editContent.username,
    editContent.email,
    editContent.address_id,
    editContent.phone,
    editContent.website,
    editContent.company_id,
    id,
  ];
  console.log(55555, user);
  sql.query(query, user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json({ msg: "Sửa dữ liệu thành công" });
  });
};

module.exports = {
  modelAddUsers,
  modelAddUser,
  modelGetAllUser,
  modelGetJoinUser,
  modelGetUserById,
  modelEditUser,
  modelDeleteUser,
};
