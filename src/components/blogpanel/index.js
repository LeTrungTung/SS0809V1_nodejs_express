import React, { useEffect, useState } from "react";
import "./index.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import axiosClient from "../../api/axiosCreate";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Draggable from "react-draggable"; //để kéo thả ModalForm

const BlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [editingBlog, setEditingBlog] = useState(null);
  // const [editedTitle, setEditedTitle] = useState("");
  // const [editedBody, setEditedBody] = useState("");
  // const [editedUserId, setEditedUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Định nghĩa hàm fetchData trước khi sử dụng trong useEffect
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("datablogs");
      setBlogs(response.data);
      console.log("ktra Blogs ====>", blogs);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý khi người dùng chọn trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán chỉ mục dòng đầu và dòng cuối của trang hiện tại
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs
    .sort((a, b) => a.id - b.id) // Sắp xếp theo trường "Id"
    .slice(indexOfFirstBlog, indexOfLastBlog);

  const handleConfirmDelete = async () => {
    try {
      await axiosClient.delete(`datablogs/${selectedBlogId}`);
      // Xoá thành công, tiến hành tải lại danh sách blog
      fetchData();
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
    setSelectedBlogId(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteBlog = (id) => {
    setSelectedBlogId(id);
    setShowDeleteConfirmation(true);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      await axiosClient.patch(
        `datablogs/${updatedBlog.id}`,
        updatedBlog
      );
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating blog: ", error);
    }
  };

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
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                  {"  "}
                  <Button onClick={() => handleEditBlog(blog)}>
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

      <Draggable handle=".modal-drag-handle">
        <ModalForm
          show={showModal}
          handleClose={handleCloseModal}
          handleSubmit={handleUpdateBlog}
          selectedBlog={selectedBlog}
        />
      </Draggable>

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete blog with id=
          {selectedBlogId}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ModalForm = ({
  show,
  handleClose,
  handleSubmit,
  selectedBlog,
}) => {
  const [updatedBlog, setUpdatedBlog] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedBlog) {
      setUpdatedBlog(selectedBlog);
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(updatedBlog);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!updatedBlog.userId) {
      errors.userId = "UserId is required";
    }

    if (!updatedBlog.title) {
      errors.title = "Title is required";
    }

    if (!updatedBlog.body) {
      errors.body = "Body is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-drag-handle">Edit Blog</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="number"
              name="id"
              value={updatedBlog.id || ""}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formUserId">
            <Form.Label>UserId</Form.Label>
            <Form.Control
              type="number"
              name="userId"
              value={updatedBlog.userId || ""}
              onChange={handleChange}
              isInvalid={!!formErrors.userId}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.userId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedBlog.title || ""}
              onChange={handleChange}
              isInvalid={!!formErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="body"
              value={updatedBlog.body || ""}
              onChange={handleChange}
              isInvalid={!!formErrors.body}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.body}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BlogPanel;
