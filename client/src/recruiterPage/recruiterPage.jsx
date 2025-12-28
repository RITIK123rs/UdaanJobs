import React from "react";
import "./recruiterPage.css";
import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineBriefcase, HiOutlineDocumentText } from "react-icons/hi2";
import { IoAddCircleOutline, IoPersonOutline } from "react-icons/io5";
import img from "../assets/homepage/avatar.png";
import DashBoard from "./dashboard";
// import JobPosted from "./jobPosted";

export default function RecruiterPage() {
  return (
    <div className="recruiterPage">
      <div className="row">
        <div className="col-3 menuBox d-flex flex-column">
          <div className="d-flex justify-content-center mt-4">
            <a
              className="logoName text-decoration-none fw-bold fs-3 text-white"
              href="#"
            >
              <img
                src={logo}
                alt="Logo"
                width="40"
                className="d-inline-block align-text-top me-3 mt-1"
              />
              Udaan<span className="yellowText">Jobs</span>
            </a>
          </div>

          <div className="menuList mt-5">
            <ul type="none" className="text-white p-0">
              <li className="menuItem d-flex align-items-center fw-semibold">
                <RiHome2Line className="menuIcon me-3" />
                Dashboard
              </li>

              <li className="menuItem d-flex align-items-center fw-semibold">
                <HiOutlineBriefcase className="menuIcon me-3" />
                Job Posted
              </li>

              <li className="menuItem d-flex align-items-center fw-semibold">
                <HiOutlineDocumentText className="menuIcon me-3" />
                Applications
              </li>

              <li className="menuItem d-flex align-items-center fw-semibold">
                <IoAddCircleOutline className="menuIcon me-3" />
                Create Job
              </li>

              <li className="menuItem d-flex align-items-center fw-semibold">
                <IoPersonOutline className="menuIcon me-3" />
                Profile
              </li>
            </ul>
          </div>

          <div className="loginBox w-100 mt-auto mb-3 d-flex align-items-center ps-3">
            <div className="rounded-circle overflow-hidden menuImgBox">
              <img src={img} alt="" width="100%" />
            </div>
            <div className="ms-3 text-white">
              <p className="personName m-0 fw-bold">Ritik Singh</p>
              <p className="emailId m-0">ritiksingh123@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="col-9 menuContent text-white">
            {/* < DashBoard /> */}
            {/* < JobPosted /> */}
        </div>
      </div>
    </div>
  );
}
