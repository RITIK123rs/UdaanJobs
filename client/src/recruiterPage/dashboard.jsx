import React from "react";
import PieGraph from "./pieChart";

function DashBoard() {
  return (
    <div className="recruiterDashboard">
      <h2 className="mt-3 pageTitle">Dashboard</h2>
      <hr />

      <div className="infoSection">
        <h3>Hello, Ritik</h3>
        <p >Here is a quick overview of your job postings and applicants</p>
      </div>

      <div className="applicationStatus mt-4">
        <div className="row text-center d-flex justify-content-evenly">
          <div className="col-3 p-0 databox">
            <div>
              <h1>10</h1>
              <h5>Total Jobs Posted</h5>
            </div>
            <div>
              <h1>30</h1>
              <h5>Active Jobs</h5>
            </div>
          </div>

          <div className="col-3 p-0 databox">
            <div>
              <h1>50</h1>
              <h5>Accepted Applications</h5>
            </div>
            <div>
              <h1>10</h1>
              <h5>Rejected Applications</h5>
            </div>
          </div>

          <div className="pieGraphBox col-5 ps-0">
                        <PieGraph  />
          </div>
        </div>
      </div>

      <h2 className="my-3 fw-bold">Recent Application History</h2>

<div className="dbList d-flex flex-column gap-2 mb-3">
  {Array.from({ length: 5 }).map((_, index) => (
    <div
      className="d-flex align-items-center justify-content-between py-2 px-3 border rounded"
      key={index}
    >
      {/* Job Info */}
      <div className="nameBox d-flex flex-column justify-content-center" style={{ width: "30%" }}>
        <h3 className="m-0 mb-1">Frontend Developer</h3>
        <p className="mb-0 text-capitalize">
          Full-Time · Remote · Mumbai
        </p>
      </div>

      {/* Applicants */}
      <div className="dateBox d-flex flex-column justify-content-center text-center" style={{ width: "15%" }}>
        <h5 className="m-0 mb-1 ">Applicants</h5>
        <p className="mb-0 fs-5">112</p>
      </div>

      {/* Posted Date */}
      <div className="dateBox d-flex flex-column justify-content-center text-center" style={{ width: "15%" }}>
        <h5 className="m-0 mb-1">Posted On</h5>
        <p className="mb-0">12/02/2000</p>
      </div>

      {/* Status */}
      <div className="statusBox d-flex justify-content-center align-items-center" style={{ width: "15%" }}>
        <div className="status fw-bold px-3 py-1 text-uppercase">
          Active
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default DashBoard;
