const bodyParser = require("body-parser");
const express = require("express");
// const sql = require("mysql2");
// const users = require("../dev-data/users.json");
// const blogs = require("../dev-data/blogs.json");

const morgan = require("morgan");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user.route");
const dataBlogsRoute = require("./routes/datablogs.route");

// middleware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// route
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

//route
app.use("/api/v1/users", userRoute);
app.use("/datablogs", dataBlogsRoute);

// Kết nối tới cơ sở dữ liệu MySQL
// const connection = sql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Trungtung54",
//   database: "cms_schema",
// });

// Kết nối đến cơ sở dữ liệu
// connection.connect((err) => {
//   if (err) {
//     console.error("Lỗi kết nối đến cơ sở dữ liệu:", err);
//     return;
//   }
//   console.log("Kết nối thành công đến cơ sở dữ liệu MySQL");
// });

// Thêm dữ liệu vào cơ sở dữ liệu
// users.forEach((user) => {
//   const address = user.address;
//   const company = user.company;

//   // Thêm dữ liệu vào bảng address
//   connection.query(
//     "INSERT INTO address (street, suite, city, zipcode) VALUES (?, ?, ?, ?)",
//     [address.street, address.suite, address.city, address.zipcode],
//     (err, result) => {
//       if (err) {
//         console.error("Lỗi thêm dữ liệu vào bảng address:", err);
//         return;
//       }

//       const addressId = result.insertId;

//       // Thêm dữ liệu vào bảng geo
//       connection.query(
//         "INSERT INTO geo (lat, lng, id_address) VALUES (?, ?, ?)",
//         [address.geo.lat, address.geo.lng, addressId],
//         (err) => {
//           if (err) {
//             console.error("Lỗi thêm dữ liệu vào bảng geo:", err);
//             return;
//           }
//         }
//       );

//       // Thêm dữ liệu vào bảng company
//       connection.query(
//         "INSERT INTO company (name, catchPhrase, bs) VALUES (?, ?, ?)",
//         [company.name, company.catchPhrase, company.bs],
//         (err, result) => {
//           if (err) {
//             console.error("Lỗi thêm dữ liệu vào bảng company:", err);
//             return;
//           }

//           const companyId = result.insertId;

//           // Thêm dữ liệu vào bảng users
//           connection.query(
//             "INSERT INTO users (name, username, email, address_id, phone, website, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//             [
//               user.name,
//               user.username,
//               user.email,
//               addressId,
//               user.phone,
//               user.website,
//               companyId,
//             ],
//             (err) => {
//               if (err) {
//                 console.error(
//                   "Lỗi thêm dữ liệu vào bảng users:",
//                   err
//                 );
//                 return;
//               }
//             }
//           );
//         }
//       );
//     }
//   );
// });
// Thêm dữ liệu vào bảng blogs
// blogs.forEach((blog) => {
//   connection.query(
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

// connection.end();

// handle err

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server express running http://localhost:${PORT}`);
});
