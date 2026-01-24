import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";


function JobsPosted({
  recruiterData,
  setActiveContent,
  setEditPostId,
  getRecruiterData,
  setViewPostId,
  addMessageBox,
  setOpenMenu,
}) {

  const [deleteBtnActive, setDeleteBtnActive]=useState(false);
  const [searchData, setSearchData] = useState({
    jobTitle: "",
    status: "",
  });
  const [filterData, setFilterData] = useState([]);

  const changeHandler = (e) => {
    // console.log(`${e.target.name} = ${e.target.value}`);
    setSearchData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function checkJobStatus(dueDate) {
    const currentDate = new Date();
    const closingDate = new Date(dueDate);
    return currentDate <= closingDate ? "live" : "closed";
  }

  useEffect(() => {
    if (searchData.jobTitle == "" && searchData.status == "") {
      setFilterData(recruiterData.jobPosted);
      return;
    }

    const timer = setTimeout(() => {
      const data = recruiterData.jobPosted?.filter((value) => {
        const jobTitleMatch = value.role
          .toLowerCase()
          .startsWith(searchData.jobTitle.toLowerCase().trim());
        const statusMatch =
          searchData.status == checkJobStatus(value.closingDate) ||
          searchData.status == "";
        return jobTitleMatch && statusMatch;
      });
      // console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, recruiterData]);

  async function deleteJobPost(jobPostId) {
    setDeleteBtnActive(true);
    // console.log(jobPostId);
    await fetch(`${API_URL}/recruiter/deletePost/${jobPostId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    getRecruiterData();
    addMessageBox("check", "Job post deleted successfully");
    setDeleteBtnActive(false);
    // console.log("message box");
  }

  return (
    <div className="jobPosted my-4">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Jobs Posted</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3" />
      <div className="filterBox mb-3 d-flex justify-content-end gap-1">
        <div className="field jobTitleBox d-flex align-items-center">
          <FaSearch className="icon ms-1 me-3 fs-4" />
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            className="me-2"
            onChange={changeHandler}
          />
        </div>

        <div className="field filter d-flex align-items-center ms-2">
          <MdFilterListAlt className="icon me-1 fs-1" />
          <select onChange={changeHandler} name="status" className="me-2">
            <option value="">Status</option>
            <option value="live">Live</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="tableBox mb-0">
        <table className="table position-relative">
          <thead>
            <tr className="position-sticky top-0 ">
              <th>S.No</th>
              <th>Role</th>
              <th>Job Type</th>
              <th>Status</th>
              <th>Applicants</th>
              <th>Posted On</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData?.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.role}</td>
                <td>{data.jobType}</td>
                <td>
                  <span
                    className={`badge status ${checkJobStatus(
                      data.closingDate
                    )}`}
                  >
                    {checkJobStatus(data.closingDate)}
                  </span>
                </td>
                <td>{data.applications.length}</td>
                <td>{dateFormat(data.createdAt)}</td>
                <td>{dateFormat(data.closingDate)}</td>
                <td>
                  <div className="btnBox">
                    <button
                      className="editBtn"
                      onClick={() => {
                        setActiveContent("editPost");
                        setEditPostId(data._id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="DetailBtn"
                      onClick={() => {
                        setViewPostId(data._id);
                        setActiveContent("jobDetail");
                      }}
                    >
                      Details
                    </button>
                    <button
                      disabled={deleteBtnActive}
                      className="DeleteBtn "
                      onClick={() => deleteJobPost(data._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobsPosted;
