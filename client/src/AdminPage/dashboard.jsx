import React, { useEffect, useState } from "react";
import "./adminPage.css";
import PieGraph from "./pieChart";
import { dateFormat } from "../utils/dateFormat";
import { jwtDecode } from "jwt-decode";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";

function DashBoard({ setOpenMenu }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [dashBoardData, setDashBoardData] = useState();

  useEffect(() => {
    async function getDashBoardData() {
      await fetch(`${API_URL}/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setDashBoardData(data);
        })
        .catch((error) => console.log(error));
    }

    getDashBoardData();
  }, []);

  function adminName() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    // console.log(decoded);
    return decoded;
  }

  return (
    <div className="adminDashboard">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Dashboard</h2>
         <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr />

      <div className="infoSection">
        <h3>
          Hello,{" "}
          <span className="fw-bold yellowText text-capitalize ">
            {adminName().userName}
          </span>
        </h3>
        <p>Here is a quick overview of your platform activity</p>
      </div>

      <div className="StatusBox mt-4">
        <div className="row-lg text-center d-flex justify-content-evenly">
          <div className="col-lg-3 p-0 databox">
            <div className="statItem">
              <h1 className="yellowText">
                {dashBoardData?.jobSeekerCount + dashBoardData?.recruiterCount}
              </h1>
              <h5>Total Users</h5>
            </div>
            <div className="statItem">
              <h1 className="yellowText">{dashBoardData?.recruiterCount}</h1>
              <h5>Recruiters</h5>
            </div>
          </div>

          <div className="col-lg-3 p-0 databox">
            <div className="statItem">
              <h1 className="yellowText">{dashBoardData?.jobSeekerCount}</h1>
              <h5>Job Seekers</h5>
            </div>
            <div className="statItem">
              <h1 className="yellowText">{dashBoardData?.jobPostedCount}</h1>
              <h5>Jobs</h5>
            </div>
          </div>

          <div className="col-5 ps-0 pieGraphBox d-none d-lg-block">
            <PieGraph
              jobSeekerCount={dashBoardData?.jobSeekerCount}
              recruiterCount={dashBoardData?.recruiterCount}
            />
          </div>
        </div>
      </div>

      <h2 className="my-4 fw-bold">Recent Login</h2>

      <div className="loginList d-flex flex-column gap-3 mb-4">
        {dashBoardData?.user?.map((data, index) => (
          <div
            key={index}
            className="loginCard d-flex align-items-center justify-content-between px-4 py-2 py-sm-3"
          >
            <div className="imgBox me-2">
              <img
                src={
                  data.userType === "jobSeeker"
                    ? data.image
                      ? `${API_URL}/upload/${data.image}`
                      : `${API_URL}/defaultImage/defaultProfilePic.jpg`
                    : data.image
                    ? `${API_URL}/upload/${data.image}`
                    : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                }
                alt="user"
              />
            </div>

            <div className="userInfo" style={{ width: "28%" }}>
              <h5 className="mb-1">{data.userName}</h5>
            </div>

            <div className="loginTime  text-center" style={{ width: "15%" }}>
              <h5>Last Login</h5>
              <p className="mb-0">{dateFormat(data.lastLogin)}</p>
            </div>

            <div
              className="userEmail d-none d-md-block text-center"
              style={{ width: "32%" }}
            >
              <h5>Email</h5>
              <p className="mb-0">{data.email}</p>
            </div>

            <div
              className="userRole d-none d-lg-block text-center"
              style={{ width: "14%" }}
            >
              <h5>Role</h5>
              <p className="mb-0 jobseeker">{data.userType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
