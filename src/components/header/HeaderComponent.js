import React from "react";
import "./HeaderComponent.css";
import { Link, useLocation } from "react-router-dom";

const HeaderComponent = () => {
  const location = useLocation();
  return (
    <div className="header-user">
      <Link
        to="/users"
        id="id-user-panel"
        className={location.pathname == "/users" ? "active" : ""}
      >
        Users Panel
      </Link>
      <Link
        to="/blogs"
        id="id-blog-panel"
        className={location.pathname == "/blogs" ? "active" : ""}
      >
        Blogs Panel
      </Link>
      <span>Logout</span>
    </div>
  );
};

export default HeaderComponent;
