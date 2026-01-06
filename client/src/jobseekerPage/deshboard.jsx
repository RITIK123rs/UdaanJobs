import React from "react";
import PieGraph from "./pieChart";
import { dateFormat } from "../utils/dateFormat";


function DashBoard({JobSeekerData}){

  return (
    <>
      <h2 className="mt-3 pageTitle">Dashboard</h2>
      <hr></hr>
      <div>
        <h3>Hello, {JobSeekerData?.userName}</h3>
        <p>Here is what's is happening with your job search application</p>
      </div>
      <div className="applicationStatus">
        <div className="row text-center d-flex justify-content-evenly">
          <div className="col-3 p-0 databox">
            <div>
              <h1>{JobSeekerData.application?.total}</h1>
              <h5>Total Applications</h5>
            </div>
            <div>
              <h1>{JobSeekerData.application?.pending}</h1>
              <h5>Pending Applications</h5>
            </div>
          </div>
          <div className="col-3 p-0 databox">
            <div>
              <h1>{JobSeekerData.application?.accepted}</h1>
              <h5>Accepted Applications</h5>
            </div>
            <div>
              <h1>{JobSeekerData.application?.rejected}</h1>
              <h5>Rejected Applications</h5>
            </div>
          </div>

          <div className="pieGraphBox col-5 ps-0">
            <PieGraph pending={JobSeekerData.application?.pending} accepted={JobSeekerData?.application?.accepted} rejected={JobSeekerData?.application?.rejected} />
          </div>
        </div>
      </div>
      <h2 className="my-3">Recent Application History</h2>
      <div className="dbList d-flex  flex-column justify-content-evenly">
        { (JobSeekerData?.application?.appliedJobs || []).slice(0,5).map(( data , i) => (
          <div key={data._id} className="d-flex flex-row justify-content-around py-2">
            <div className="imgBox rounded-circle mt-1">
              <img className="w-100 h-100 companyLogo" src={ (data?.jobId?.recruiter?.company?.logo || null ) ? `http://localhost:3200/upload/${data?.jobId?.recruiter?.company?.logo}`  : ("http://localhost:3200/defaultImage/defaultCompanyImg.jpg") } alt="" />
            </div>

            <div className="nameBox d-flex flex-column justify-content-center ">
              <h4 className="m-0 mb-1">{data.jobId?.role}</h4>
              <p className="mb-0 text-capitalize">{data.jobId?.jobType} . {data.jobId?.workMode} . {data.jobId?.location}</p>
            </div>

            <div className="dateBox d-flex flex-column justify-content-center">
              <h5 className="m-0 mb-1">Date applied</h5>
              <p className="mb-0">{dateFormat(data?.appliedAt)}</p>
            </div>

            <div className="statusBox d-flex justify-content-center align-items-center">
              <div className={`status fs-5 fw-bold px-3 d-flex align-items-center text-uppercase ${data?.status}`}>
                {data?.status}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashBoard;
