import React, { useState, useEffect } from "react";
import "./jobseekerPage.css";
import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import img from "../assets/homepage/avatar.png";
import DashBoard from "./deshboard";
import FindJob from "./findJob";
import JobApply from "./jobApply";
import Profile from "./profile";
import EditProfile from "./editProfile";
import JobDetail from "./jobDetail";
import CompanyProfile from "../recruiterPage/companyProfile";
import { ImExit } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";

function JobSeekerPage({ addMessageBox }) {
  const [JobSeekerData, setJobSeekerData] = useState({});
  const [selectData, setSelectData] = useState({});
  const [activeContent, setActiveContent] = useState("dashboard");
  const [previousComponent, setPreviousComponent] = useState();
  const [recruiterData, setRecruiterData] = useState({});
  const [recruiterId, setRecruiterId] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    await fetch(`http://localhost:3200/jobseeker`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobSeekerData(data);
      })
      .catch((error) => console.log("fetch error :-", error));
  }

  useEffect(() => {
    console.log(recruiterId);
    async function getRecruiterData() {
      await fetch(`http://localhost:3200/jobseeker/recruiter/${recruiterId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRecruiterData(data);
        });
    }

    getRecruiterData();
  }, [recruiterId]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <DashBoard JobSeekerData={JobSeekerData} />;
      case "findJob":
        return (
          <FindJob
            setActiveContent={setActiveContent}
            setSelectData={setSelectData}
            fetchData={fetchData}
            addMessageBox={addMessageBox}
            setRecruiterId={setRecruiterId}
          />
        );
      case "jobDetail":
        return (
          <JobDetail
            setActiveContent={setActiveContent}
            selectData={selectData}
            previousComponent={previousComponent}
            addMessageBox={addMessageBox}
          />
        );
      case "jobApply":
        return (
          <JobApply
            JobApplyData={JobSeekerData.application.appliedJobs}
            setActiveContent={setActiveContent}
            setSelectData={setSelectData}
            fetchData={fetchData}
            addMessageBox={addMessageBox}
            setRecruiterId={setRecruiterId}
          />
        );
      case "profile":
        return (
          <Profile
            setActiveContent={setActiveContent}
            JobSeekerData={JobSeekerData}
            addMessageBox={addMessageBox}
          />
        );
      case "editProfile":
        return (
          <EditProfile
            setActiveContent={setActiveContent}
            JobSeekerData={JobSeekerData}
            fetchData={fetchData}
            addMessageBox={addMessageBox}
          />
        );
      case "companyProfile":
        return (
          <CompanyProfile
            recruiterData={recruiterData}
            setActiveContent={setActiveContent}
            previousComponent={previousComponent}
          />
        );
    }
  };

  return (
    <div className="jobSeekerPage">
      <div className="row">
        <div className="col-3 menuBox d-flex flex-column">
          <div className="d-flex justify-content-center mt-4">
            <NavLink
              to="/"
              className="logoName text-decoration-none fw-bold fs-3 text-white"
            >
              <img
                src={logo}
                alt="Logo"
                width="40"
                className="d-inline-block align-text-top me-3 mt-1"
              />
              Udaan<span className="yellowText">Jobs</span>
            </NavLink>
          </div>
          <div className="menuList mt-5 ">
            <ul type="none" className="text-white p-0">
              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => setActiveContent("dashboard")}
              >
                <RiHome2Line className="menuIcon me-3" />
                Dashboard
              </li>
              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => {
                  setPreviousComponent("findJob");
                  setActiveContent("findJob");
                }}
              >
                <IoSearch className="menuIcon me-3 " />
                Find Jobs
              </li>
              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => {
                  setPreviousComponent("jobApply");
                  setActiveContent("jobApply");
                }}
              >
                <HiOutlineDocumentText className="menuIcon me-3" />
                My Applications
              </li>
              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => setActiveContent("profile")}
              >
                <IoPersonOutline className="menuIcon me-3" />
                Profile
              </li>
            </ul>
          </div>
          <div className="loginBox w-100 mt-auto mb-2 ps-3">
            <span
              className="dropMenu mb-2 me-2"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <ImExit className="icon" /> EXIT
            </span>
            <div className="w-100 mt-auto d-flex align-items-center">
              <div className="rounded-circle overflow-hidden menuImgBox">
                <img
                  src={
                    JobSeekerData?.personalInfo?.profilePhoto || null
                      ? `http://localhost:3200/upload/${JobSeekerData.personalInfo.profilePhoto}`
                      : `http://localhost:3200/defaultImage/defaultProfilePic.jpg`
                  }
                  alt=""
                  width="100%"
                />
              </div>
              <div className="ms-2 text-white">
                <p className="personName m-0 fw-bold">
                  {JobSeekerData.userName}
                </p>
                <p className="emailId m-0">{JobSeekerData.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9 menuContent text-white ">{renderContent()}</div>
      </div>
    </div>
  );
}

export default JobSeekerPage;
