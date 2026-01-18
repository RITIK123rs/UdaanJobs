import React, { useState, useEffect } from "react";
import "./jobseekerPage.css";
import DashBoard from "./deshboard";
import FindJob from "./findJob";
import JobApply from "./jobApply";
import Profile from "./profile";
import EditProfile from "./editProfile";
import JobDetail from "./jobDetail";
import CompanyProfile from "../recruiterPage/companyProfile";
import { ImExit } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import MenuContent from "./menuContent";

function JobSeekerPage({ addMessageBox }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [JobSeekerData, setJobSeekerData] = useState({});
  const [selectData, setSelectData] = useState({});
  const [activeContent, setActiveContent] = useState("dashboard");
  const [previousComponent, setPreviousComponent] = useState();
  const [recruiterData, setRecruiterData] = useState({});
  const [recruiterId, setRecruiterId] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  async function fetchData() {
    await fetch(`${API_URL}/jobseeker`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobSeekerData(data);
      })
      .catch((error) => console.log("fetch error :-", error));
  }

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

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <DashBoard JobSeekerData={JobSeekerData} setOpenMenu={setOpenMenu} />
        );
      case "findJob":
        return (
          <FindJob
            setActiveContent={setActiveContent}
            setSelectData={setSelectData}
            fetchData={fetchData}
            addMessageBox={addMessageBox}
            setRecruiterId={setRecruiterId}
            setOpenMenu={setOpenMenu}
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
            setOpenMenu={setOpenMenu}
          />
        );
      case "profile":
        return (
          <Profile
            setActiveContent={setActiveContent}
            JobSeekerData={JobSeekerData}
            addMessageBox={addMessageBox}
            setOpenMenu={setOpenMenu}
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
    <div className="jobSeekerPage position-relative ">
      <div
        className={`phoneMenu position-absolute h-100 d-flex flex-column ${
          openMenu ? "menuOpen" : " menuClose"
        } `}
      >
        <MenuContent
          JobSeekerData={JobSeekerData}
          phoneMenu={true}
          setOpenMenu={setOpenMenu}
          setActiveContent={setActiveContent}
          setPreviousComponent={setPreviousComponent}
        />
      </div>
      <div className="d-flex ">
        <div className="menuBox d-none d-xl-flex flex-column">
          <MenuContent
            JobSeekerData={JobSeekerData}
            setActiveContent={setActiveContent}
            setPreviousComponent={setPreviousComponent}
          />
        </div>
        <div className="menuContent text-white ">{renderContent()}</div>
      </div>
    </div>
  );
}

export default JobSeekerPage;
