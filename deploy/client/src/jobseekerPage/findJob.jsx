import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";


function FindJob({
  setActiveContent,
  setSelectData,
  fetchData,
  addMessageBox,
  setRecruiterId,
  setOpenMenu,
}) {
  const [applyActive, setApplyActive] = useState(false);
  const [findJobData, setFindJobData] = useState([]);
  const [searchData, setSearchData] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    experience: "",
  });
  const [filterData, setFilterData] = useState([]);

  // console.log(filterData);

  const changeHandler = (e) => {
    e.preventDefault();
    // console.log(`${e.target.name} = ${e.target.value}`);
    setSearchData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (
      searchData.jobTitle == "" &&
      searchData.location == "" &&
      searchData.jobType == "" &&
      searchData.experience == ""
    ) {
      setFilterData(findJobData);
      return;
    }

    const timer = setTimeout(() => {
      const data = findJobData.filter((value) => {
        const jobTitleMatch = value.role
          .toLowerCase()
          .startsWith(searchData.jobTitle.toLowerCase().trim());
        const locationMatch = value.location
          .toLowerCase()
          .startsWith(searchData.location.toLowerCase().trim());
        const jobTypeMatch =
          searchData.jobType == value.jobType || searchData.jobType == "";
        const experienceMatch =
          searchData.experience == value.experience ||
          searchData.experience == "";
        return (
          jobTitleMatch && locationMatch && jobTypeMatch && experienceMatch
        );
      });
      // console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, findJobData]);

  function dayAgo(prev) {
    const currentDate = new Date();
    const prevDate = new Date(prev);
    const millSec = currentDate - prevDate;
    const sec = Math.floor(millSec / 1000);
    const mins = Math.floor(sec / 60);
    const hrs = Math.floor(mins / 60);
    const day = Math.floor(hrs / 24);

    if (day > 0) return `${day} Day ago`;
    else if (hrs > 0) return `${hrs} hours ago`;
    else if (mins > 0) return `${mins} minutes ago`;
    else if (sec > 0) return `${sec} seconds ago`;
    else return `${millSec} millisecounds ago`;
  }

  async function applyJob(object) {
    setApplyActive(true);
    await fetch(`${API_URL}/jobseeker/apply`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(object),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.isPresent) {
          // console.log(data.message);
          addMessageBox("check", "Application submitted successfully");
        } else {
          // console.log(data.message);
          addMessageBox("Warning", "Already applied for this job");
        }
      })
      .catch((error) => console.log("Put error :-", error));

    fetchData();
    setApplyActive(false);
  }

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_URL}/jobseeker/findJob`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const currentDate = new Date();
          const openJob = data.filter((info) => {
            const closingDate = new Date(info.closingDate);
            // console.log(closingDate);
            // console.log(currentDate);
            if (closingDate > currentDate) return true;
            else return false;
          });
          setFindJobData(openJob);
        })
        .catch((error) => console.log("fetch error :-", error));
    }
    fetchData();
  }, []);

  return (
    <div className="findJob">
      <div className="d-flex gap-3 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Find Job</h2>
        <div className="ms-auto d-none d-md-block">
          <Clock />
        </div>
      </div>
      <hr className="my-2"></hr>
      <div className="d-flex filterInput justify-content-lg-evenly mt-4">
        <div className="field jobTitleBox ">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            onChange={changeHandler}
          />
        </div>

        <div className="field LocationBox">
          <FaLocationDot className="icon" />
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={changeHandler}
          />
        </div>

        <div className="field jobTypeBOX">
          <FaBriefcase className="icon" />
          <select defaultValue="" name="jobType" onChange={changeHandler}>
            <option value="">Job Type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="field ExperienceBOX">
          <FaUserTie className="icon" />
          <select defaultValue="" name="experience" onChange={changeHandler}>
            <option value="">Experience</option>
            <option value="fresher">Fresher</option>
            <option value="1-3">1–3 Years</option>
            <option value="3-5">3–5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
        </div>
      </div>
      <h4 className="recommendedJob my-4">Recommended Jobs</h4>
      <div className="jobList mt-3 d-flex flex-wrap gap-3">
        {filterData?.map((data) => (
          <div className="jobCard pt-3 position-relative">
            <div className="head d-flex align-items-center mb-2">
              <div className="imgBox me-3">
                <img
                  className="w-100 companyLogo h-100"
                  src={
                    data?.recruiter?.company?.logo || null
                      ? `${API_URL}/upload/${data?.recruiter?.company?.logo}`
                      : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                  }
                  alt=""
                />
              </div>
              <div className="jobTitle">
                <h5 className="mb-1 fw-bold">{data.role}</h5>
                <p
                  className="mb-0 fw-light companyName "
                  onClick={() => {
                    setRecruiterId(data.recruiter._id);
                    setActiveContent("companyProfile");
                  }}
                >
                  {data.recruiter?.company?.name}
                </p>
              </div>
              <span className="agoBox position-absolute ">
                {dayAgo(data?.createdAt)}
              </span>
            </div>
            <div className="jobDetail d-flex justify-content-between mb-2 flex-wrap">
              <div className="detailItem d-flex align-items-center">
                <FaBriefcase className="me-1 icon" />
                <span>{data?.jobType}</span>
              </div>
              <div className="detailItem d-flex align-items-center">
                <RiUser3Line className="me-1 icon" />
                <span>
                  {data?.experience}{" "}
                  {data?.experience != "fresher" ? "Years" : ""}
                </span>
              </div>
              <div className="detailItem d-flex align-items-center">
                <RiMapPinLine className="me-1 icon" />
                <span>{data?.location}</span>
              </div>
              <div className="detailItem d-flex align-items-center">
                <FaIndianRupeeSign className="me-1 icon" />
                <span>{data?.salary}</span>
              </div>
            </div>
            <div className="description mb-4">{data?.jobDescription}</div>
            <div className="buttonBox d-flex gap-2">
              <button
                className="btn detailBtn w-50"
                onClick={() => {
                  // console.log(data);
                  setSelectData(data);
                  setActiveContent("jobDetail");
                }}
              >
                Details
              </button>
              <button
                disabled={applyActive}
                className="btn applyBtn w-50"
                onClick={() => {
                  applyJob({ id: data?._id, applicants: data?.applications });
                }}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindJob;
