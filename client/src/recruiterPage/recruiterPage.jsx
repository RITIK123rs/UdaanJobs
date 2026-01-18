import React, { useState } from "react";
import "./recruiterPage.css";
import DashBoard from "./dashboard";
import JobPosted from "./jobPosted";
import Applicants from "./application";
import PostJob from "./postJob";
import CompanyProfile from "./companyProfile";
import { useEffect } from "react";
import Profile from "../jobseekerPage/profile";
import JobDetail from "../jobseekerPage/jobDetail";
import EditCompanyProfile from "./editCompanyProfile";
import { NavLink, useNavigate } from "react-router-dom";
import MenuContent from "./menuContent";

export default function RecruiterPage({ addMessageBox }) {
  const API_URL= import.meta.env.VITE_API_URL;
  const [activeContent, setActiveContent] = useState("dashboard");
  const [recruiterData, setRecruiterData] = useState({});
  const [jobSeekerData, setJobSeekerData] = useState();
  const [editPostId, setEditPostId] = useState();
  const [viewPostId, setViewPostId] = useState();
  const [viewPostData, setViewPostData] = useState();
  const [jobSeekerJobPost, setJobSeekerJobPost] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate=useNavigate();


  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <DashBoard recruiterData={recruiterData} setOpenMenu={setOpenMenu} />;
      case "jobPosted":
        return (
          <JobPosted
            setActiveContent={setActiveContent}
            recruiterData={recruiterData}
            setEditPostId={setEditPostId}
            getRecruiterData={getRecruiterData}
            setViewPostId={setViewPostId}
            addMessageBox={addMessageBox}
            setOpenMenu={setOpenMenu}
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
            setOpenMenu={setOpenMenu}
          />
        );
      case "postJob":
        return (
          <PostJob
            getRecruiterData={getRecruiterData}
            addMessageBox={addMessageBox}
            setOpenMenu={setOpenMenu}
          />
        );
      case "companyProfile":
        return (
          <CompanyProfile
            setActiveContent={setActiveContent}
            recruiterData={recruiterData}
            isRecruiter={true}
            setOpenMenu={setOpenMenu}
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
      // console.log(viewPostId);
      await fetch(`${API_URL}/recruiter/jobPostData/${viewPostId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data), 
          setViewPostData(data);
        })
        .catch((error) => error);
    }

    getJobPostData();
  }, [viewPostId]);

  async function getRecruiterData() {
    await fetch(`${API_URL}/recruiter`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRecruiterData(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getRecruiterData();
  }, []);

  return (
    <div className="recruiterPage position-relative">
      <div className={`phoneMenu position-absolute h-100 d-flex flex-column ${ openMenu ? "menuOpen" : " menuClose"} `} >
        < MenuContent recruiterData={recruiterData} phoneMenu={true} setOpenMenu={setOpenMenu} setActiveContent={setActiveContent} />
      </div>
      <div className="d-flex">
        <div className="menuBox  d-none d-xl-flex flex-column">
          <MenuContent recruiterData={recruiterData} setActiveContent={setActiveContent} />
        </div>
        <div className="menuContent text-white">{renderContent()}</div>
      </div>
    </div>
  );
}
