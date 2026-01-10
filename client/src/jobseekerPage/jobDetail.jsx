import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { dateFormat } from "../utils/dateFormat";

export default function JobDetail({setActiveContent, selectData, previousComponent,addMessageBox, isRecruiter=false, isAdmin=false}) {

  async function applyJob(object) {
    await fetch(`http://localhost:3200/jobseeker/apply`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(object),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(!data.isPresent){
          console.log(data.message);
          addMessageBox("check","Application submitted successfully");
        }
        else{
          console.log(data.message);
          addMessageBox("Warning","Already applied for this job");
        }
      })
      .catch((error) => console.log("Put error :-", error));
  }

  return (
    <div className="jobDetail container">
      <h2 className="mt-3 pageTitle">Job Details</h2>
      <hr className="my-3" />
    <button className="backBtn fs-5 p-1 px-2 mb-3 rounded-3 d-flex align-items-center fw-bold" onClick={()=> isAdmin ? (setActiveContent("jobs")) : isRecruiter?(setActiveContent("jobPosted")):(setActiveContent(previousComponent))} ><FaArrowLeft className="me-2" />BACK</button>
      <div className="jobHead d-flex px-3 py-3 ">
        <div className="imgBox">
           <img className="companyLogo" src={ (selectData?.recruiter?.company?.logo || null ) ? `http://localhost:3200/upload/${selectData?.recruiter?.company?.logo}`  : ("http://localhost:3200/defaultImage/defaultCompanyImg.jpg") } alt="" />

        </div>

        <div className="ms-3">
          <h1 className="mb-1">{selectData?.role}</h1>

          <div className="jobDetail d-flex mb-2 flex-wrap gap-3">
            <div className="detailItem d-flex align-items-center">
              <RiMapPinLine className="me-1" />
              <span>{selectData?.location}</span>
            </div>

            <div className="detailItem d-flex align-items-center">
              <FaBriefcase className="me-1" />
              <span>{selectData?.jobType}</span>
            </div>
          </div>
        </div>

       { (!isRecruiter) ? (<button className={`applyBtn ms-auto ${previousComponent=="jobApply" ? "d-none" : "" }`} onClick={()=> applyJob({"id": selectData._id,"applicants": selectData.applications}) }>Apply Now</button>) : "" }
      </div>
      <div className="jobBody mt-4 px-3 py-3">
         <div className="mt-2">
        <h2 className="boxTitles">Job Description</h2>
        <p className="mt-3 fs-5">
          {selectData?.jobDescription}
        </p>
      </div>

      <div className="mt-5">
        <h2 className="boxTitles">Skills Required</h2>
        <div className="mt-3 d-flex flex-wrap gap-3">
          {(selectData?.skillsRequired || []).map((skill) => (
            <div className="skillTag px-3 py-2">
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="boxTitles">Roles & Responsibilities</h2>
        <p className="fs-5">
          {selectData?.roleAndResponsibilities}
        </p>
      </div>

      <div className="mt-4 fs-5 jobInfo">
        <p><strong>Role: </strong>{selectData?.role}</p>
        <p><strong>Industry Type: </strong>{selectData?.industryType}</p>
        <p><strong>Education: </strong>{selectData?.education}</p>
        <p><strong>Experience: </strong>{selectData?.experience} {selectData?.experience!="fresher" ? "Years" : "" }</p>
        <p><strong>Location: </strong>{selectData?.location}</p>
        <p><strong>work Mode: </strong>{selectData?.workMode}</p>
        <p><strong>Job Type: </strong>{selectData?.jobType}</p>
        <p><strong>Apply Before: </strong>{ dateFormat(selectData?.applyBefore)}</p>
        <p><strong>Salary: </strong>{selectData?.salary}</p>
      </div>
      </div>
    </div>
  );
}
