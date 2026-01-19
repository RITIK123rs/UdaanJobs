import React, { useEffect, useState } from "react";
import { MdMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";

function Profile({
  setActiveContent,
  JobSeekerData,
  addMessageBox,
  isAdmin = false,
  isRecruiter = false,
  jobSeekerJobPost,
  prevContent,
  getRecruiterData,
  setOpenMenu,
}) {
  const [activeStatus, setActiveStatus] = useState(jobSeekerJobPost?.jobStatus);
  const [statusChangeActive, setStatusChangeActive]= useState(false);

  const StatusChange = (newStatus) => {
    // console.log(newStatus);
    setStatusChangeActive(true);
    async function updateJobSeekerStatus() {
      await fetch(`${API_URL}/recruiter/updateJobSeekerStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: jobSeekerJobPost?.jobId,
          jobStatus: newStatus,
          jobSeekerId: jobSeekerJobPost?.jobSeekerId,
          oldJobStatus: activeStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data),
            setActiveStatus(newStatus);
            getRecruiterData();
            addMessageBox("check", "status Changed successfully");
        })
        .catch((error) => console.log(error));
    }
    // console.log(activeStatus);
    
    if (isRecruiter) {
      updateJobSeekerStatus();
    }
    setStatusChangeActive(false);
  };

  return (
    <div className="profile">
      <div className="d-flex gap-3 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">{isRecruiter ? "" : "My"} Profile</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3"></hr>
      {isRecruiter || isAdmin ? (
        <button
          className="backBtn fs-5 ms-2 p-1 px-2 mb-3 rounded-3 d-flex align-items-center fw-bold"
          onClick={() => {
            isAdmin
              ? setActiveContent(prevContent)
              : setActiveContent("applicants");
          }}
        >
          <FaArrowLeft className="me-2" />
          BACK
        </button>
      ) : (
        ""
      )}

      <div className="d-flex flex-column flex-lg-row justify-content-between">
        <div className="info">
          <div className="nameBox position-relative">
            <div className="banner">
              <img
                src={
                  JobSeekerData?.personalInfo?.banner || null
                    ? `${API_URL}/upload/${JobSeekerData.personalInfo.banner}`
                    : `${API_URL}/defaultImage/defaultbanner.jpg`
                }
                alt="banner"
                className="uploadImg"
              />
            </div>
            <div className="imgBox position-absolute">
              <img
                src={
                  JobSeekerData?.personalInfo?.profilePhoto || null
                    ? `${API_URL}/upload/${JobSeekerData.personalInfo.profilePhoto}`
                    : `${API_URL}/defaultImage/defaultProfilePic.jpg`
                }
                alt="Profile"
                className="uploadImg"
              />
            </div>
            <div className="details d-sm-flex mt-2">
              <div>
                <h2 className="m-0 mb-1 userName">{JobSeekerData?.userName}</h2>
                <p className="m-0 mb-1">
                  {JobSeekerData?.personalInfo?.jobTitle}
                </p>
                <p className="d-flex align-items-center">
                  <FaLocationDot className="me-1" />{" "}
                  {JobSeekerData?.personalInfo?.city}
                </p>
              </div>
              <div className="btnBox ms-auto me-3">
                {isAdmin ? (
                  ""
                ) : isRecruiter ? (
                  <select
                    disabled={statusChangeActive}
                    className={`setStatus ${activeStatus}`}
                    value={activeStatus}
                    onChange={(e) => {
                      StatusChange(e.target.value);
                    }}
                  >
                    <option className="pending" value="pending">
                      Pending
                    </option>
                    <option className="accepted" value="accepted">
                      Accept
                    </option>
                    <option className="rejected" value="rejected">
                      Reject
                    </option>
                  </select>
                ) : (
                  ""
                )}
                {isAdmin ? (
                  ""
                ) : (
                  <button
                    className="resumeBtn"
                    onClick={(e) => {
                      if (!JobSeekerData?.personalInfo?.resume) {
                        e.preventDefault();
                        addMessageBox(
                          "warning",
                          "You haven’t uploaded a resume yet"
                        );
                      }
                    }}
                  >
                    <a
                      className="px-3"
                      href={`${API_URL}/upload/${JobSeekerData?.personalInfo?.resume}`}
                      target="_blank"
                      download="Resume.pdf"
                    >
                      <MdFileDownload className="fs-4 me-1" />
                      Resume
                    </a>
                  </button>
                )}

                {isRecruiter ? (
                  ""
                ) : (
                  <button
                    className=" ms-2 editBtn px-3"
                    onClick={() => setActiveContent("editProfile")}
                  >
                    Edit Page
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="aboutBox mt-3  p-3 p-sm-4">
            <h3 className="boxHead">About Me</h3>
            <p className="mt-3">{JobSeekerData?.personalInfo?.aboutMe}</p>
          </div>
          <div className="skillBox mt-3  p-3 p-sm-4 pb-5">
            <h3 className="boxHead">Skills</h3>
            <div className="mt-4 d-flex flex-wrap gap-2">
              {JobSeekerData?.personalInfo?.skills.map((data) => (
                <div className="skillTag px-3 py-2">{data}</div>
              ))}
            </div>
          </div>

          <div className="ExperienceBox mt-3 p-3 p-sm-4">
            <h3 className="boxHead">Experiences</h3>
            {JobSeekerData?.personalInfo?.experience.map((data) => (
              <div className="cardBox mt-4 d-flex">
                <div className="imgBox d-none d-lg-block rounded-circle me-3">
                  <img
                    src={`${API_URL}/defaultImage/defaultCompanyImg.jpg`}
                    alt=""
                  />
                </div>
                <div className="d-lg-block " >
                  <div className="d-block">
                    <div className="d-flex">
                      <div className="imgBox d-block d-lg-none img2 rounded-circle me-3">
                        <img
                          src={`${API_URL}/defaultImage/defaultCompanyImg.jpg`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h4>{data.jobTitle}</h4>
                        <p className="m-0 mt-2">
                          {data.companyName} . {data.jobType} . {data.jobPeriod}
                        </p>
                        <p className="m-0 mt-2 d-none d-md-block ">
                          {data.city}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mt-2">{data.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="educationBox mt-3 p-3 p-sm-4">
            <h3 className="boxHead">Educations</h3>
            {JobSeekerData?.personalInfo?.education.map((data) => (
              <div className="cardBox mt-4 d-flex">
                <div className="imgBox d-none d-lg-block rounded-circle me-3">
                  <img
                    src={`${API_URL}/defaultImage/defaultCollegeImg.jpg`}
                    alt=""
                  />
                </div>
                <div className="d-lg-block ">
                  <div className="d-block">
                    <div className="d-flex">
                      <div className="imgBox d-block d-lg-none img2 rounded-circle me-3">
                        <img
                          src={`${API_URL}/defaultImage/defaultCollegeImg.jpg`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h4>{data.degree}</h4>
                        <p className="m-0 mt-2">
                          {data.institute} ({data.year})
                        </p>
                        <p className="m-0 mt-2 d-none d-md-block ">
                          {data.city}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mt-2">{data.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="additionalInfo">
          <div>
            <h4 className="fw-bold mb-3">Additional Details</h4>
            <div className="d-flex align-items-center mt-2">
              <MdMailOutline className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Email</div>
                <a href="" className="text-decoration-none">
                  {JobSeekerData?.personalInfo?.email}
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <MdOutlinePhone className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Phone</div>
                <div>{JobSeekerData?.personalInfo?.phone}</div>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <IoLanguage className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Language</div>
                <div>{JobSeekerData?.personalInfo?.languages}</div>
              </div>
            </div>
          </div>
          <div className="mt-lg-3">
            <h4 className="fw-bold mb-3">Social Links</h4>
            <div className="d-flex align-items-center mt-2">
              <FaInstagram className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Instragram</div>
                <a href="" className="text-decoration-none">
                  {JobSeekerData?.personalInfo?.instagram}
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <FaXTwitter className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Twitter</div>
                <a href="" className="text-decoration-none">
                  {JobSeekerData?.personalInfo?.twitter}
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <BsGlobe2 className="fs-3 me-3 flex-shrink-0" />
              <div>
                <div className="fw-bold">Website</div>
                <a href="" className="text-decoration-none">
                  {JobSeekerData?.personalInfo?.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
