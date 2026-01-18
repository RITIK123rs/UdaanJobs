import React, { useState, useEffect } from "react";
import "./adminPage.css";
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
import MenuContent from "./menuContent";

export default function AdminPage() {
  const [activeContent, setActiveContent] = useState("dashboard");
  const navigate = useNavigate();
  const [jobPostId, setJobPostId] = useState();
  const [jobPostData, setJobPostData] = useState();
  const [jobSeekerId, setJobSeekerId] = useState();
  const [jobSeekerData, setJobSeekerData] = useState();
  const [recruiterId, setRecruiterId] = useState();
  const [recruiterData, setRecruiterData] = useState();
  const [prevContent, setPrevContent] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <AdminDashboard setOpenMenu={setOpenMenu} />;
      case "users":
        return (
          <Users
            setActiveContent={setActiveContent}
            setJobSeekerId={setJobSeekerId}
            setRecruiterId={setRecruiterId}
            setOpenMenu={setOpenMenu}
          />
        );
      case "jobs":
        return (
          <JobsSection
            setActiveContent={setActiveContent}
            setJobPostId={setJobPostId}
            setOpenMenu={setOpenMenu}
          />
        );
      case "jobSeekerSection":
        return (
          <JobSeekerSection
            setActiveContent={setActiveContent}
            setJobSeekerId={setJobSeekerId}
            setPrevContent={setPrevContent}
            setOpenMenu={setOpenMenu}
          />
        );
      case "recruiterSection":
        return (
          <RecruiterSection
            setActiveContent={setActiveContent}
            setRecruiterId={setRecruiterId}
            setPrevContent={setPrevContent}
            setOpenMenu={setOpenMenu}
          />
        );
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
        return (
          <Profile
            prevContent={prevContent}
            setActiveContent={setActiveContent}
            JobSeekerData={jobSeekerData}
            isAdmin={true}
            isRecruiter={true}
          />
        );
      case "companyProfile":
        return (
          <CompanyProfile
            setActiveContent={setActiveContent}
            previousComponent={prevContent}
            recruiterData={recruiterData}
          />
        );
    }
  };

  useEffect(() => {
    async function getJobPostData() {
      // console.log(jobPostId);
      await fetch(`${API_URL}/recruiter/jobPostData/${jobPostId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data),
           setJobPostData(data);
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
          // console.log(data);
          setJobSeekerData(data);
        })
        .catch((error) => 
          console.log(error)
      );
    }

    getJobSeekerData();
  }, [jobSeekerId]);

  useEffect(() => {
    // console.log(recruiterId);
    async function getRecruiterData() {
      await fetch(`${API_URL}/jobseeker/recruiter/${recruiterId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setRecruiterData(data);
        });
    }

    getRecruiterData();
  }, [recruiterId]);

  return (
    <div className="adminPage position-relative">
      <div
        className={`phoneMenu position-absolute h-100 d-flex flex-column ${
          openMenu ? "menuOpen" : " menuClose"
        } `}
      >
        <MenuContent
          phoneMenu={true}
          setOpenMenu={setOpenMenu}
          setActiveContent={setActiveContent}
          setPrevContent={setPrevContent}
        />
      </div>
      <div className="d-flex ">
        <div className="menuBox  d-none d-xl-flex flex-column">
          <MenuContent  setOpenMenu={setOpenMenu}
          setActiveContent={setActiveContent} setPrevContent={setPrevContent} />
        </div>
        <div className="menuContent text-white">{renderContent()}</div>
      </div>
    </div>
  );
}
