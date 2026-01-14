import React, { useState, useEffect } from "react";
import "./adminPage.css";
import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import AdminDashboard from "./dashboard";
import Users from "./user";
import JobSeekerSection from "./jobSeeker";
import { NavLink, useNavigate } from "react-router-dom";
import RecruiterSection from "./recruiter";
import JobsSection from "./jobs";
import JobDetail from "../jobseekerPage/jobDetail";
import Profile from "../jobseekerPage/profile";
import CompanyProfile from "../recruiterPage/companyProfile";

export default function AdminPage() {
  const [activeContent, setActiveContent] = useState("dashboard");
  const navigate = useNavigate();
  const [jobPostId, setJobPostId] = useState();
  const [jobPostData, setJobPostData] = useState();
  const [jobSeekerId, setJobSeekerId] = useState();
  const [jobSeekerData, setJobSeekerData] = useState();
  const [recruiterId, setRecruiterId] = useState();
  const [recruiterData, setRecruiterData] = useState();
  const [prevContent, setPrevContent]= useState();
  const API_URL= import.meta.env.VITE_API_URL;

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <Users setActiveContent={setActiveContent}  setJobSeekerId={setJobSeekerId} setRecruiterId={setRecruiterId} />;
      case "jobs":
        return (
          <JobsSection
            setActiveContent={setActiveContent}
            setJobPostId={setJobPostId}
          />
        );
      case "jobSeekerSection":
        return <JobSeekerSection setActiveContent={setActiveContent}  setJobSeekerId={setJobSeekerId} setPrevContent={setPrevContent} />;
      case "recruiterSection":
        return <RecruiterSection
          setActiveContent={setActiveContent}
          setRecruiterId={setRecruiterId}
          setPrevContent={setPrevContent} 
        />;
      case "jobDetail":
        return (
          <JobDetail
            setActiveContent={setActiveContent}
            selectData={jobPostData}
            isRecruiter={true}
            isAdmin={true}
          />
        );
      case "jobSeekerProfile":
        return (< Profile prevContent={prevContent} setActiveContent={setActiveContent} JobSeekerData={jobSeekerData} isAdmin={true} isRecruiter={true} />);
      case "companyProfile":
        return ( < CompanyProfile setActiveContent={setActiveContent} previousComponent={prevContent} recruiterData={recruiterData} /> )
    }
  };

  useEffect(() => {
    async function getJobPostData() {
      console.log(jobPostId);
      await fetch(`${API_URL}/recruiter/jobPostData/${jobPostId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data), setJobPostData(data);
        })
        .catch((error) => error);
    }

    getJobPostData();
  }, [jobPostId]);

  useEffect(() => {
    async function getJobSeekerData() {
      await fetch(`${API_URL}/recruiter/jobSeeker/${jobSeekerId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setJobSeekerData(data);
        })
        .catch((error) => console.log(error));
    }

    getJobSeekerData();

  },[jobSeekerId]);

  useEffect(() => {
      console.log(recruiterId);
      async function getRecruiterData() {
        await fetch(`${API_URL}/jobseeker/recruiter/${recruiterId}`, {
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

  return (
    <div className="adminPage">
      <div className="row">
        <div className="col-3 menuBox d-flex flex-column">
          <div className="d-flex justify-content-center mt-4">
            <NavLink
              to="/"
              className="logoName text-decoration-none fw-bold fs-3 text-white"
            >
              <img src={logo} alt="Logo" width="40" className="me-3 mt-1" />
              Udaan<span className="yellowText">Jobs</span>
            </NavLink>
          </div>

          <div className="menuList mt-5">
            <ul type="none" className="text-white p-0">
              <li
                className="menuItem"
                onClick={() => setActiveContent("dashboard")}
              >
                <RiHome2Line className="menuIcon me-3" />
                Dashboard
              </li>

              <li
                className="menuItem"
                onClick={() => { setPrevContent("users"), setActiveContent("users") }}
              >
                <HiOutlineUsers className="menuIcon me-3" />
                Users
              </li>

              <li className="menuItem" onClick={() => setActiveContent("jobs")}>
                <HiOutlineBriefcase className="menuIcon me-3" />
                Jobs
              </li>

              <li
                className="menuItem"
                onClick={() => setActiveContent("jobSeekerSection")}
              >
                <HiOutlineUserGroup className="menuIcon me-3" />
                Job Seekers
              </li>

              <li
                className="menuItem"
                onClick={() => setActiveContent("recruiterSection")}
              >
                <HiOutlineBuildingOffice2 className="menuIcon me-3" />
                Recruiters
              </li>
            </ul>
          </div>

          <button
            className="mt-auto loginButton"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <ImExit className="icon" /> Logout
          </button>
        </div>

        <div className="col-9 menuContent text-white p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
