import React from "react";
import logo from "../assets/Logo.png";
function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="container px-2 px-sm-3">
          <a className="navbar-brand fw-bold fs-3 text-white" href="#">
            <img
              src={logo}
              alt="Logo"
              width="34"
              className="d-inline-block align-text-top me-2 mt-1"
            />
            Udaan<span className="yellowText">Jobs</span>
          </a>
          <span>
            <button className="yellowText fs-3 fw-bolder bg-transparent border-0">Login</button>
          </span>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
