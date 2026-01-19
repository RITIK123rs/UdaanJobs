import React from "react";
import { FaFire } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingsBold } from "react-icons/pi";
import { IoIosMail } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { dateFormat } from "../utils/dateFormat";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";

export default function CompanyProfile({
  recruiterData,
  setActiveContent,
  previousComponent,
  isRecruiter = false,
  setOpenMenu,
}) {


  return (
    <div className="profile companyProfile text-white">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Company Profile</h2>
         <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr />
      {isRecruiter ? (
        ""
      ) : (
        <button
          className="backBtn fs-5 py-1 ps-2 pe-3 mb-3 rounded-3 d-flex align-items-center fw-bold"
          onClick={() => {
            // console.log(previousComponent),
             setActiveContent(previousComponent);
          }}
        >
          <FaArrowLeft className="me-2" />
          BACK
        </button>
      )}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="info flex-grow-1 me-lg-3">
          <div className=" header mb-4 align-items-center p-3 rounded border border-white position-relative">
            <div className="d-flex gap-4">
              <div className="imgBox rounded-circle overflow-hidden border border-white">
                <img
                  className="companyLogo"
                  src={
                    recruiterData?.company?.logo || null
                      ? `${API_URL}/upload/${recruiterData?.company?.logo}`
                      : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                  }
                  alt=""
                />
              </div>
              <div className="d-block d-md-none">
                <h1 className="m-0 mt-2 mb-2 fw-bold ">
                  {recruiterData?.company?.name}
                </h1>
                <span className="ms-1 fs-6 fw-medium yellowText">
                  {recruiterData?.company?.industry}
                </span>
                <br />
                <span className="ms-1 fs-6 fw-light yellowText">
                  {recruiterData?.company?.location}
                </span>
              </div>
              <div className="d-none d-md-block">
                <h1 className="m-0 mt-2 mb-2 fw-bold ">
                  {recruiterData?.company?.name}
                </h1>
                <div className="d-flex flex-wrap gap-4 mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaFire className="icon flex-shrink-0 " />
                    <div className="headerInfo">
                      <div className="fw-bold">Founded</div>
                      <small className="opacity-75">
                        {dateFormat(recruiterData?.company?.founded)}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <HiUserGroup className="icon flex-shrink-0" />
                    <div className="headerInfo">
                      <div className="fw-bold">Employees</div>
                      <small className="opacity-75">
                        {recruiterData?.company?.employees}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <FaLocationDot className="icon flex-shrink-0" />
                    <div className="headerInfo">
                      <div className="fw-bold">Location</div>
                      <small className="opacity-75">
                        {recruiterData?.company?.location}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <PiBuildingsBold className="icon fs-1 flex-shrink-0" />
                    <div className="headerInfo">
                      <div className="fw-bold">Industry</div>
                      <small className="opacity-75">
                        {recruiterData?.company?.industry}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isRecruiter ? (
              <button
                className="position-absolute editBtn"
                onClick={() => setActiveContent("editCompanyInfo")}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="aboutBox mt-3 p-3 rounded border border-white">
            <h3 className="boxHead text-white">Company Info</h3>
            <p className="mt-4 opacity-75">{recruiterData?.company?.about}</p>
          </div>

          <div className="teamBox mt-3 p-3 pb-4 rounded border border-white">
            <h3 className="boxHead text-white">Our Team</h3>
            <div className="d-flex gap-5 flex-wrap mt-4 ms-3">
              <div className="text-center">
                <div
                  className="personImg border border-warning rounded-circle mb-2 overflow-hidden"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100"
                    src={`${API_URL}/defaultImage/companyPeople1.jpg`}
                    alt="John Doe"
                  />
                </div>
                <h6 className="mb-0 text-white">John Doe</h6>
                <small className="opacity-75">Founder</small>
              </div>

              <div className="text-center">
                <div
                  className="personImg border border-warning rounded-circle mb-2 overflow-hidden"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100"
                    src={`${API_URL}/defaultImage/companyPeople5.jpg`}
                    alt="Jane Smith"
                  />
                </div>
                <h6 className="mb-0 text-white">Jane Smith</h6>
                <small className="opacity-75">Co-Founder</small>
              </div>

              <div className="text-center">
                <div
                  className="personImg border border-warning rounded-circle mb-2 overflow-hidden"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100"
                    src={`${API_URL}/defaultImage/companyPerson4.jpg`}
                    alt="Alice Brown"
                  />
                </div>
                <h6 className="mb-0 text-white">Alice Brown</h6>
                <small className="opacity-75">Manager</small>
              </div>

              <div className="text-center">
                <div
                  className="personImg border border-warning rounded-circle mb-2 overflow-hidden"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100"
                    src={`${API_URL}/defaultImage/companyPeople2.jpg`}
                    alt="Bob Johnson"
                  />
                </div>
                <h6 className="mb-0 text-white">Bob Johnson</h6>
                <small className="opacity-75">Designer</small>
              </div>

              <div className="text-center">
                <div
                  className="personImg border border-warning rounded-circle mb-2 overflow-hidden"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    className="w-100 h-100"
                    src={`${API_URL}/defaultImage/companyPeople3.jpg`}
                    alt="Eve Davis"
                  />
                </div>
                <h6 className="mb-0 text-white">Michael Smith</h6>
                <small className="opacity-75">Developer</small>
              </div>
            </div>
          </div>

          <div className="ImgBox mt-3 p-4 rounded border border-white">
            <h3 className="boxHead text-white">Working at Company Name</h3>
            <div className="d-flex gap-2 mt-4 flex-wrap">
              <div className="imgBox1">
                <img
                  src={`${API_URL}/defaultImage/companyImg2.jpg`}
                  alt="imgBox1"
                />
              </div>
              <div className="imgBox2 d-flex flex-column gap-2">
                <div className="subImgBox1">
                  <img
                    src={`${API_URL}/defaultImage/companyImg1.jpg`}
                    alt="subImgBox1"
                  />
                </div>
                <div className="subImgBox2">
                  <img
                    src={`${API_URL}/defaultImage/companyImg3.jpg`}
                    alt="subImgBox2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="additionalInfo flex-shrink-0 mt-3 mt-lg-0 d-none d-lg-block">
          <div className="p-4 rounded border border-white overflow-hidden">
            <h2 className="fw-bold mb-4 text-white">Contact Details</h2>
            <div className="d-flex align-items-center mt-2 mb-3">
              <IoIosMail className="fs-2 me-3 text-warning flex-shrink-0" />
              <div>
                <div className="fw-bold text-white">Email</div>
                <div className="text-white opacity-75">
                  {recruiterData?.company?.contact?.emailId}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mt-2 mb-3">
              <BsTwitterX className="fs-3 me-3 text-warning flex-shrink-0" />
              <div>
                <div className="fw-bold text-white">Twitter</div>
                <div className="text-white opacity-75">
                  {recruiterData?.company?.contact?.twitter}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mt-2 mb-3">
              <FaFacebookF className="fs-2 me-3 text-warning flex-shrink-0" />
              <div>
                <div className="fw-bold text-white">Facebook</div>
                <div className="text-white opacity-75">
                  {recruiterData?.company?.contact?.facebook}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mt-2 mb-3">
              <FaLinkedin className="fs-2 me-3 text-warning flex-shrink-0" />
              <div>
                <div className="fw-bold text-white">LinkedIn</div>
                <div className="text-white opacity-75">
                  {recruiterData?.company?.contact?.linkedin}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mt-2">
              <BsGlobe2 className="fs-2 me-3 text-warning flex-shrink-0" />
              <div>
                <div className="fw-bold text-white">Website</div>
                <div className="text-white opacity-75">
                  {recruiterData?.company?.contact?.website}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="belowAdditionalInfo d-lg-none">
          <h2 className="fw-bold mb-4 text-white">Contact Details</h2>
          <div className="d-flex flex-wrap bottomInfo">
            <div className="d-flex align-items-center">
              <IoIosMail className="fs-1 icon me-3 text-warning" />
              <div>
                <div className="fw-bold top text-white">Email</div>
                <div className="text-white below opacity-75">
                  {recruiterData?.company?.contact?.emailId}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <BsTwitterX className="fs-3 icon me-3 text-warning" />
              <div>
                <div className="fw-bold top text-white">Twitter</div>
                <div className="text-white below opacity-75">
                  {recruiterData?.company?.contact?.twitter}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaFacebookF className="fs-2 icon me-3 text-warning" />
              <div>
                <div className="fw-bold top text-white">Facebook</div>
                <div className="text-white below opacity-75">
                  {recruiterData?.company?.contact?.facebook}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaLinkedin className="fs-2 icon me-3 text-warning" />
              <div>
                <div className="fw-bold top text-white">LinkedIn</div>
                <div className="text-white below opacity-75">
                  {recruiterData?.company?.contact?.linkedin}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <BsGlobe2 className="fs-2 icon me-3 text-warning" />
              <div>
                <div className="fw-bold top text-white">Website</div>
                <div className="text-white below opacity-75">
                  {recruiterData?.company?.contact?.website}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
