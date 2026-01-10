import React, { useState } from "react";
import "./recruiterPage.css";
import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineBriefcase, HiOutlineDocumentText } from "react-icons/hi2";
import { IoAddCircleOutline, IoPersonOutline } from "react-icons/io5";
import img from "../assets/homepage/avatar.png";
import DashBoard from "./dashboard";
import JobPosted from "./jobPosted";
import Applicants from "./application";
import PostJob from "./postJob";
import CompanyProfile from "./companyProfile";
import { useEffect } from "react";
import Profile from "../jobseekerPage/profile";
import JobDetail from "../jobseekerPage/jobDetail";
import EditCompanyProfile from "./editCompanyProfile";
import { ImExit } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";

export default function RecruiterPage({ addMessageBox }) {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [recruiterData, setRecruiterData] = useState({});
  const [jobSeekerData, setJobSeekerData] = useState();
  const [editPostId, setEditPostId] = useState();
  const [viewPostId, setViewPostId] = useState();
  const [viewPostData, setViewPostData] = useState();
  const [jobSeekerJobPost, setJobSeekerJobPost] = useState();
  const navigate=useNavigate();

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <DashBoard recruiterData={recruiterData} />;
      case "jobPosted":
        return (
          <JobPosted
            setActiveContent={setActiveContent}
            recruiterData={recruiterData}
            setEditPostId={setEditPostId}
            getRecruiterData={getRecruiterData}
            setViewPostId={setViewPostId}
            addMessageBox={addMessageBox}
          />
        );
      case "applicants":
        return (
          <Applicants
            recruiterData={recruiterData}
            setJobSeekerData={setJobSeekerData}
            setActiveContent={setActiveContent}
            addMessageBox={addMessageBox}
            setJobSeekerJobPost={setJobSeekerJobPost}
          />
        );
      case "postJob":
        return (
          <PostJob
            getRecruiterData={getRecruiterData}
            addMessageBox={addMessageBox}
          />
        );
      case "companyProfile":
        return (
          <CompanyProfile
            setActiveContent={setActiveContent}
            recruiterData={recruiterData}
            isRecruiter={true}
          />
        );
      case "jobSeekerProfile":
        return (
          <Profile
            setActiveContent={setActiveContent}
            JobSeekerData={jobSeekerData}
            addMessageBox={addMessageBox}
            isRecruiter={true}
            jobSeekerJobPost={jobSeekerJobPost}
            getRecruiterData={getRecruiterData}
          />
        );
      case "editPost":
        return (
          <PostJob
            isEditPost={true}
            setActiveContent={setActiveContent}
            getRecruiterData={getRecruiterData}
            editPostId={editPostId}
            addMessageBox={addMessageBox}
          />
        );
      case "jobDetail":
        return (
          <JobDetail
            setActiveContent={setActiveContent}
            selectData={viewPostData}
            isRecruiter={true}
          />
        );
      case "editCompanyInfo":
        return (
          <EditCompanyProfile
            recruiterData={recruiterData}
            setActiveContent={setActiveContent}
            getRecruiterData={getRecruiterData}
            addMessageBox={addMessageBox}
          />
        );
    }
  };

  useEffect(() => {
    async function getJobPostData() {
      console.log(viewPostId);
      await fetch(`http://localhost:3200/recruiter/jobPostData/${viewPostId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data), setViewPostData(data);
        })
        .catch((error) => error);
    }

    getJobPostData();
  }, [viewPostId]);

  async function getRecruiterData() {
    await fetch(`http://localhost:3200/recruiter`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecruiterData(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getRecruiterData();
  }, []);

  return (
    <div className="recruiterPage">
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

          <div className="menuList mt-5">
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
                onClick={() => setActiveContent("jobPosted")}
              >
                <HiOutlineBriefcase className="menuIcon me-3" />
                Job Posted
              </li>

              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => setActiveContent("applicants")}
              >
                <HiOutlineDocumentText className="menuIcon me-3" />
                Applications
              </li>

              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => setActiveContent("postJob")}
              >
                <IoAddCircleOutline className="menuIcon me-3" />
                Post Job
              </li>

              <li
                className="menuItem d-flex align-items-center fw-semibold"
                onClick={() => setActiveContent("companyProfile")}
              >
                <IoPersonOutline className="menuIcon me-3" />
                Profile
              </li>
            </ul>
          </div>

          <div className="loginBox w-100 mt-auto mb-2 ps-3">
            <div
              className="dropMenu mb-2 me-2"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <ImExit className="icon" /> Logout
            </div>
            <div className="w-100 mt-auto d-flex align-items-center">
              <div className="rounded-circle overflow-hidden menuImgBox">
                <img
                  src={
                    recruiterData?.company?.logo || null
                      ? `http://localhost:3200/upload/${recruiterData?.company?.logo}`
                      : "http://localhost:3200/defaultImage/defaultCompanyImg.jpg"
                  }
                  alt=""
                  width="100%"
                />
              </div>
              <div className="ms-2 text-white">
                <p className="personName m-0 fw-bold fs-5">
                  {recruiterData?.company?.name}
                </p>
                <p className="emailId m-0">{recruiterData?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-9 menuContent text-white">{renderContent()}</div>
      </div>
    </div>
  );
}
