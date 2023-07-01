import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Container, Table } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import axiosClient from "../../api/axiosCreate";

const UserPanel = () => {
  const [usersJoin, setUsersJoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 3;
  const totalPages = Math.ceil(usersJoin.length / usersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          "api/v1/users/users-address-company"
        );
        setUsersJoin(response.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };

    fetchData();
  }, []);

  // Xử lý khi người dùng chọn trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán chỉ mục dòng đầu và dòng cuối của trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersJoin
    .sort((a, b) => a.id_user - b.id_user) // Sắp xếp theo trường "Id_user"
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="wrap-user">
      <Container>
        <h2 id="title-user">Users Panel</h2>
        <p id="status-user">Update one successfully</p>

        <Table striped bordered hover variant="dark" id="table-user">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 &&
              currentUsers.map((user, index) => (
                <tr key={user.id_user}>
                  <td>{index + 1 + indexOfFirstUser}</td>
                  <td>{user.id_user}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    Street: {user.street} <br />
                    Suite: {user.suite}
                    <br />
                    City: {user.city}
                    <br />
                    Zipcode: {user.zipcode}
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>
                    Name: {user.company_name} <br />
                    CatchPhrase: {user.catchPhrase} <br />
                    Bs: {user.bs}
                  </td>
                  <td>
                    <Button variant="danger">
                      <RiDeleteBin5Line />
                    </Button>
                    <br /> <br />
                    <Button>
                      <AiTwotoneEdit />
                    </Button>
                    {"  "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Phân trang */}
        <div className="pagination">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            variant="light"
            className="btn-pagination"
          >
            Previous
          </Button>
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <Button
              key={page}
              variant={
                currentPage === page ? "primary" : "outline-primary"
              }
              onClick={() => handlePageChange(page)}
              className="btn-pagination"
            >
              {page}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            variant="light"
            className="btn-pagination"
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default UserPanel;
