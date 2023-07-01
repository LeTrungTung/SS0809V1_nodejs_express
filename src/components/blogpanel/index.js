import React, { useEffect, useState } from "react";
import "./index.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import axiosClient from "../../api/axiosCreate";
import { Button, Container, Table } from "react-bootstrap";

const BlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("datablogs");
        setBlogs(response.data);
        console.log("ktra Blogs ====>", blogs);
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
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <Container>
      <h2 id="title-blog">Blogs Panel</h2>
      <p id="status-blog">Update one successfully</p>

      <Table striped bordered hover variant="dark" id="table-blog">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>UserName</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBlogs.length > 0 &&
            currentBlogs.map((blog, index) => (
              <tr key={blog.id}>
                <td>{index + 1 + indexOfFirstBlog}</td>
                <td>{blog.id}</td>
                <td>{blog.username}</td>
                <td>{blog.title}</td>
                <td>{blog.body}</td>
                <td>
                  <Button variant="danger">
                    <RiDeleteBin5Line />
                  </Button>
                  {"  "}
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
  );
};

export default BlogPanel;
