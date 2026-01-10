import React, { useEffect, useState } from "react";
import "./adminPage.css";
import PieGraph from "./pieChart";
import { dateFormat } from "../utils/dateFormat";

function DashBoard() {

  const [dashBoardData,setDashBoardData]=useState()

  useEffect(()=>{
    async function getDashBoardData(){
      await fetch("http://localhost:3200/admin",{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDashBoardData(data);
      })
      .catch(error=> console.log(error));
    }

    getDashBoardData();

  },[])

  return (
    <div className="adminDashboard">
      <h2 className="mt-3 pageTitle">Dashboard</h2>
      <hr />

      <div className="infoSection">
        <h3>Hello, Admin</h3>
        <p>Here is a quick overview of your platform activity</p>
      </div>

      <div className="statsSection mt-4">
        <div className="row text-center d-flex justify-content-evenly">

          <div className="col-3 p-0 statCard">
            <div className="statItem">
              <h1>{dashBoardData?.jobSeekerCount + dashBoardData?.recruiterCount}</h1>
              <h5>Total Users</h5>
            </div>
            <div className="statItem">
              <h1>{dashBoardData?.recruiterCount}</h1>
              <h5>Recruiters</h5>
            </div>
          </div>

          <div className="col-3 p-0 statCard">
            <div className="statItem">
              <h1>{dashBoardData?.jobSeekerCount}</h1>
              <h5>Job Seekers</h5>
            </div>
            <div className="statItem">
              <h1>{dashBoardData?.jobPostedCount}</h1>
              <h5>Jobs</h5>
            </div>
          </div>

          <div className="col-5 ps-0 pieGraphBox">
            <PieGraph jobSeekerCount={dashBoardData?.jobSeekerCount} recruiterCount={dashBoardData?.recruiterCount} />
          </div>

        </div>
      </div>

      <h2 className="my-4 fw-bold">Recent Login</h2>

      <div className="loginList d-flex flex-column gap-3 mb-4">
        {dashBoardData?.user?.map((data, index) => (
          <div
            key={index}
            className="loginCard d-flex align-items-center justify-content-between px-4 py-3"
          >
            <div className="imgBox me-2">
              <img
                src={ data.userType === "jobSeeker" ? data.image ? `http://localhost:3200/upload/${data.image}` : `http://localhost:3200/defaultImage/defaultProfilePic.jpg`  :  data.image  ? `http://localhost:3200/upload/${data.image}`  : "http://localhost:3200/defaultImage/defaultCompanyImg.jpg" }
                alt="user"
              />
            </div>

            <div className="userInfo" style={{ width: "28%" }}>
              <h5 className="mb-1">{data.userName}</h5>
            </div>

            <div className="loginTime text-center" style={{ width: "15%" }}>
              <h5>Last Login</h5>
              <p className="mb-0">{dateFormat(data.lastLogin)}</p>
            </div>

            <div className="userEmail text-center" style={{ width: "32%" }}>
              <h5>Email</h5>
              <p className="mb-0">{data.email}</p>
            </div>

            <div className="userRole text-center" style={{ width: "14%" }}>
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
