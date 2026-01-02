import React,{useState} from "react";
import PieGraph from "./pieChart";
import { useEffect } from "react";
import { dateFormat } from "../utils/dateFormat";

function DashBoard({recruiterData}) {

  const[applicationCount, setApplicationCount]= useState({});
  const[ liveJobs , setLiveJobs]= useState(null);
  
  function checkJobStatus(dueDate){
    const currentDate= new Date();
    const closingDate= new Date(dueDate);
    return currentDate <= closingDate ? "live" : "closed";
  }

  useEffect(()=>{
    let accept=0;
    let reject=0;
    let pending=0;
    (recruiterData?.jobPosted || []).forEach(element1 => {
      (element1?.applications || []).forEach(element2 =>{
        const CheckedStatus=element2.status;
        if(CheckedStatus=="accepted")
          accept++;
        else if(CheckedStatus=="rejected")
          reject++;
        else
          pending++;
      })
    });
    setApplicationCount({
      accepted : accept,
      rejected : reject,
      pending : pending,
    });
    console.log(applicationCount);


    let liveJob=0;
    (recruiterData?.jobPosted || []).forEach(element => {
      if((checkJobStatus(element.closingDate))=="live")
        liveJob++;
    })
    setLiveJobs(liveJob);
  },[recruiterData])

  return (
    <div className="recruiterDashboard">
      <h2 className="mt-3 pageTitle">Dashboard</h2>
      <hr />

      <div className="infoSection">
        <h3>Hello, {recruiterData?.userName}</h3>
        <p >Here is a quick overview of your job postings and applicants</p>
      </div>

      <div className="applicationStatus mt-4">
        <div className="row text-center d-flex justify-content-evenly">
          <div className="col-3 p-0 databox">
            <div>
              <h1>{recruiterData?.jobPosted?.length}</h1>
              <h5>Total Jobs Posted</h5>
            </div>
            <div>
              <h1>{liveJobs}</h1>
              <h5>Live Jobs</h5>
            </div>
          </div>

          <div className="col-3 p-0 databox">
            <div>
              <h1>{applicationCount.accepted}</h1>
              <h5>Accepted Applications</h5>
            </div>
            <div>
              <h1>{applicationCount.rejected}</h1>
              <h5>Rejected Applications</h5>
            </div>
          </div>

          <div className="pieGraphBox col-5 ps-0">
            <PieGraph applicationCount={applicationCount}  />
          </div>
        </div>
      </div>

      <h2 className="my-3 fw-bold">Recent Application History</h2>

<div className="dbList d-flex flex-column gap-2 mb-3">
  {  recruiterData?.jobPosted?.slice(0, 5).map((data,index) => (
    <div
      className="d-flex align-items-center justify-content-between py-2 px-3 border rounded"
      key={index}
    >

      <div className="nameBox d-flex flex-column justify-content-center" style={{ width: "30%" }}>
        <h3 className="m-0 mb-1">{data.role}</h3>
        <p className="mb-0 text-capitalize">
          {data.jobType} · {data.workMode} · {data.location}
        </p>
      </div>

      <div className="dateBox d-flex flex-column justify-content-center text-center" style={{ width: "15%" }}>
        <h5 className="m-0 mb-1 ">Applicants</h5>
        <p className="mb-0 fs-5">{data.applications.length}</p>
      </div>

      <div className="dateBox d-flex flex-column justify-content-center text-center" style={{ width: "15%" }}>
        <h5 className="m-0 mb-1">Posted On</h5>
        <p className="mb-0">{dateFormat(data.createdAt)}</p>
      </div>

      <div className="statusBox d-flex justify-content-center align-items-center" style={{ width: "15%" }}>
        <div className={`status fw-bold px-3 py-1 text-uppercase ${checkJobStatus(data.closingDate)} `}>
          {checkJobStatus(data.closingDate)}
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default DashBoard;
