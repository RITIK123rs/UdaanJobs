import React, { useState, useEffect } from "react";
import "./jobseekerPage.css";
import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

export default function MenuContent({ JobSeekerData, setOpenMenu, phoneMenu=false, setActiveContent, setPreviousComponent }) {
  const navigate = useNavigate();
  const API_URL=import.meta.env.VITE_API_URL;
  return (
    < >
      <div className="d-flex flex-column mt-3">
        <div className="d-flex justify-content-end mb-2" >
            < ImCancelCircle className={`xBtn fs-3 me-3 ${ phoneMenu ? "d-flex" : "d-none" } `} onClick={()=> setOpenMenu(false)} />
        </div>
        <div className="d-flex  justify-content-center" >
            <NavLink
          to="/"
          className="logoName text-decoration-none fw-bold fs-3 text-white"
        >
          <img
            src={logo}
            alt="Logo"
            width="40"
            className="d-inline-block align-text-top me-3 mt-1 logo"
          />
          Udaan<span className="yellowText">Jobs</span>
        </NavLink>
        </div>
        
      </div>
      <div className="menuList mt-4 ">
        <ul type="none" className="text-white p-0">
          <li
            className="menuItem d-flex align-items-center fw-semibold"
            onClick={() => {setActiveContent("dashboard");setOpenMenu(false);}}
          >
            <RiHome2Line className="menuIcon me-3" />
            <span>Dashboard</span>
          </li>
          <li
            className="menuItem d-flex align-items-center fw-semibold"
            onClick={() => {
              setPreviousComponent("findJob");
              setActiveContent("findJob");
              setOpenMenu(false);
            }}
          >
            <IoSearch className="menuIcon me-3 " />
            <span>Find Jobs</span>
          </li>
          <li
            className="menuItem d-flex align-items-center fw-semibold"
            onClick={() => {
              setPreviousComponent("jobApply");
              setActiveContent("jobApply");
              setOpenMenu(false);
            }}
          >
            <HiOutlineDocumentText className="menuIcon me-3" />
            <span>My Applications</span>
          </li>
          <li
            className="menuItem d-flex align-items-center fw-semibold"
            onClick={() => {setActiveContent("profile"); setOpenMenu(false);}}
          >
            <IoPersonOutline className="menuIcon me-3" />
            <span>Profile</span>
          </li>
        </ul>
      </div>
      <div className="loginBox w-100 mt-auto mb-2 ps-2">
        <span
          className="dropMenu mb-2"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <ImExit className="icon mt-1 me-3" />
          Logout
        </span>
        <div className="w-100 mt-auto d-flex align-items-center">
          <div className="rounded-circle overflow-hidden menuImgBox">
            <img
              src={
                JobSeekerData?.personalInfo?.profilePhoto || null
                  ? `${API_URL}/upload/${JobSeekerData.personalInfo.profilePhoto}`
                  : `${API_URL}/defaultImage/defaultProfilePic.jpg`
              }
              alt=""
              width="100%"
            />
          </div>
          <div className="ms-2 text-white">
            <p className="personName m-0 fw-bold">{JobSeekerData.userName}</p>
            <p className="emailId m-0">{JobSeekerData.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}
