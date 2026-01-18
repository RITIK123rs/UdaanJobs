import React, { useState, useEffect } from "react";
import companyImg1 from "../assets/homepage/Netflix.png";
import { FaSearch } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";

export default function JobApply({
  JobApplyData,
  setActiveContent,
  setSelectData,
  fetchData,
  addMessageBox,
  setRecruiterId,
  setOpenMenu,
}) {
  const API_URL=import.meta.env.VITE_API_URL;
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState({
    jobTitle: "",
    status: "",
  });

  // console.log(JobApplyData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (searchData.jobTitle === "" && searchData.status === "") {
      setFilterData(JobApplyData);
      return;
    }

    const timer = setTimeout(() => {
      // console.log(JobApplyData);
      const data = JobApplyData.filter((value) => {
        // console.log(value);
        const jobTitleMatch = value.jobId.role
          .toLowerCase()
          .startsWith(searchData.jobTitle.toLowerCase().trim());
        const statusMatch =
          searchData.status === "" || searchData.status === value.status;
        return jobTitleMatch && statusMatch;
      });
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, JobApplyData]);

  const deleteApplication = async (object) => {
    try {
      const res = await fetch(`${API_URL}/jobseeker/jobApply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(object),
      });
      const data = await res.json();
      // console.log(data);
      addMessageBox("check", "Application deleted successfully");
      fetchData();
    } catch (error) {
      console.log("Delete error :-", error);
    }
  };

  return (
    <div className="jobApply">
      <div className="d-flex gap-3 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">My Applications</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3" />

      <div className="filterBox mb-3 d-flex justify-content-end pe-3">
        <div className="field jobTitleBox">
          <FaSearch className="icon me-2 fs-5" />
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            onChange={changeHandler}
          />
        </div>
        <div className="field filter ms-2">
          <MdFilterListAlt className="icon fs-3" />
          <select
            className="fs-5"
            defaultValue=""
            name="status"
            onChange={changeHandler}
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="tableContainer position-relative">
        <table className="position-relative">
          <thead className="position-sticky top-0">
            <tr className="tableHead">
              <th className="col-sn">S.No</th>
              <th className="col-company">Company Name</th>
              <th className="col-role">Role</th>
              <th className="col-date">Date Applied</th>
              <th className="col-status">Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterData?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div
                    className="company-cell d-flex align-items-center justify-content-center"
                    onClick={() => {
                      setRecruiterId(data.jobId?.recruiter._id);
                      setActiveContent("companyProfile");
                    }}
                  >
                    <div className="company-logo imgBox me-1 d-flex">
                      <img
                        className="w-100 h-100 companyLogo"
                        src={
                          data?.jobId?.recruiter?.company?.logo || null
                            ? `${API_URL}/upload/${data?.jobId?.recruiter?.company?.logo}`
                            : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <span className="companyName ms-2">
                      {data.jobId?.recruiter.company?.name}
                    </span>
                  </div>
                </td>
                <td>{data.jobId?.role}</td>
                <td>{dateFormat(data.appliedAt)}</td>
                <td className={`status text-uppercase`}>
                  <span className={data.status}>{data.status}</span>
                </td>
                <td className="actionBox">
                  <button
                    className="btn btn-view"
                    onClick={() => {
                      setSelectData(data.jobId);
                      setActiveContent("jobDetail");
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-delete ms-2"
                    onClick={() => {
                      deleteApplication({
                        jobId: data.jobId._id,
                        status: data.status,
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
