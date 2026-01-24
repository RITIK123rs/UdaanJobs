import React, { useEffect, useState } from "react";
import { FaEye, FaSearch, FaUser } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";

function JobsSection({ setActiveContent, setJobPostId, setOpenMenu }) {
  const [jobsData, setJobsData] = useState();

  function checkJobStatus(dueDate) {
    const currentDate = new Date();
    const closingDate = new Date(dueDate);
    return currentDate <= closingDate ? "live" : "closed";
  }

  const [searchData, setSearchData] = useState({
    jobTitle: "",
    recruiter: "",
    status: "",
  });
  const [filterData, setFilterData] = useState([]);

  const changeHandler = (e) => {
    const { name, type, value, checked } = e.target;
    // console.log(searchData);
    setSearchData((prev) => ({
      ...prev,
      [name]: type == "checkbox" ? checked : value,
    }));
    // console.log(searchData);
  };

  useEffect(() => {
    if (
      searchData.jobTitle == "" &&
      searchData.recruiter == "" &&
      searchData.status == ""
    ) {
      setFilterData(jobsData);
      return;
    }

    const timer = setTimeout(() => {
      const data = jobsData.filter((data) => {
        const jobTitleMatch = data?.role
          .toLowerCase()
          .startsWith(searchData.jobTitle.toLowerCase().trim());
        const recruiterMatch = data.recruiter?.userName
          .toLowerCase()
          .startsWith(searchData.recruiter.toLowerCase().trim());
        const statusMatch =
          searchData.status == checkJobStatus(data.closingDate) ||
          searchData.status == "";
        return statusMatch && recruiterMatch && jobTitleMatch;
      });
      // console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, jobsData]);

  useEffect(() => {
    async function getJobsData() {
      fetch(`${API_URL}/admin/jobs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => setJobsData(data))
        .catch((error) => console.log(error));
    }

    getJobsData();
  }, []);

  return (
    <div className="jobsSection">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Jobs</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3" />

      <div className="filterRow d-flex align-items-center gap-sm-2 justify-content-end mb-4">
        <div className="filterField jobTitle d-flex align-items-center">
          <FaSearch className="icon me-2" />
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            onChange={changeHandler}
          />
        </div>

        <div className="filterField recruiterName d-flex align-items-center">
          <FaUser className="icon fs-4 me-2" />
          <input
            type="text"
            placeholder="Recruiter Name"
            name="recruiter"
            onChange={changeHandler}
          />
        </div>

        <div className="filterField status d-flex py-1 align-items-center">
          <MdFilterListAlt className="icon fs-2 me-2" />
          <select defaultValue="" name="status" onChange={changeHandler}>
            <option value="">Status</option>
            <option value="live">Live</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="tableBox">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Job Title</th>
              <th>Recruiter</th>
              <th>Created At</th>
              <th className="text-center">Applications</th>
              <th className="text-center">Status</th>
              <th className="text-center">View</th>
            </tr>
          </thead>

          <tbody>
            {filterData?.map((data, index) => (
              <tr>
                <td>{index + 1}</td>

                <td className="jobTitle">{data?.role}</td>

                <td>{data.recruiter?.userName}</td>
                <td>{dateFormat(data?.createdAt)}</td>
                <td className="text-center">{data?.applications.length}</td>

                <td>
                  <div className="statusBox">
                    <span
                      className={`statusBadge text-uppercase  ${checkJobStatus(
                        data.closingDate
                      )}`}
                    >
                      {checkJobStatus(data.closingDate)}
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    className="viewBtn d-flex align-items-center gap-1"
                    onClick={() => {
                      setJobPostId(data._id);
                      setActiveContent("jobDetail");
                    }}
                  >
                    <FaEye />
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

export default JobsSection;
