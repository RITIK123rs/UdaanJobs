import React, { useState, useEffect } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";

function JobSeekerSection({
  setActiveContent,
  setJobSeekerId,
  setPrevContent,
  setOpenMenu,
}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [jobSeekerData, setJobSeekerData] = useState();

  const [searchData, setSearchData] = useState({
    name: "",
    email: "",
    lastLogin: "",
  });
  const [filterData, setFilterData] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(searchData);
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(searchData);
  };

  useEffect(() => {
    if (
      searchData.name == "" &&
      searchData.email == "" &&
      searchData.lastLogin == ""
    ) {
      setFilterData(jobSeekerData);
      return;
    }

    const timer = setTimeout(() => {
      const data = jobSeekerData.filter((data) => {
        const nameMatch = data.userName
          .toLowerCase()
          .startsWith(searchData.name.toLowerCase().trim());
        const emailMatch = data.email
          .toLowerCase()
          .startsWith(searchData.email.toLowerCase().trim());
        let lastLoginMatch = true;

        if (searchData.lastLogin) {
          const dataDate = new Date(data.lastLogin);
          const filterDate = new Date(searchData.lastLogin);

          const dataDateStr = dataDate.toLocaleDateString("en-CA");
          const filterDateStr = filterDate.toLocaleDateString("en-CA");

          lastLoginMatch = dataDateStr == filterDateStr;
        }
        return nameMatch && emailMatch && lastLoginMatch;
      });
      // console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, jobSeekerData]);

  useEffect(() => {
    async function getDashBoardData() {
      await fetch(`${API_URL}/admin/jobSeeker`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setJobSeekerData(data);
        })
        .catch((error) => console.log(error));
    }

    getDashBoardData();
  }, []);

  return (
    <div className="jobSeekerSection">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Job Seekers</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3" />

      <div className="filterRow d-flex align-items-center gap-sm-2 justify-content-end mb-4">
        <div className="filterField name d-flex align-items-center">
          <FaSearch className="icon me-2" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
          />
        </div>

        <div className="filterField email d-flex align-items-center">
          <MdEmail className="icon me-2" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
          />
        </div>

        <div className="filterField dateBox d-flex align-items-center">
          <MdOutlineDateRange className="icon me-2" />
          <input type="date" name="lastLogin" onChange={changeHandler} />
        </div>
      </div>

      <div className="tableBox">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th className="text-center">Applied Jobs</th>
              <th className="text-center">Profile</th>
            </tr>
          </thead>

          <tbody>
            {filterData?.map((data, index) => (
              <tr>
                <td>{index + 1}</td>

                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div className="imgBox">
                      <img
                        src={
                          data.personalInfo.profilePhoto
                            ? `${API_URL}/upload/${data.personalInfo.profilePhoto}`
                            : `${API_URL}/defaultImage/defaultProfilePic.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="fw-semibold text-capitalize ">
                        {data.userName}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{data.email}</td>
                <td>{dateFormat(data.lastLogin)}</td>
                <td className="text-center">{data.AppliedJob}</td>

                <td>
                  <button
                    className="profileBtn d-flex align-items-center m-auto"
                    onClick={() => {
                      setJobSeekerId(data._id);
                      setActiveContent("jobSeekerProfile"),
                        setPrevContent("jobSeekerSection");
                    }}
                  >
                    <FaUser className="me-2" /> Profile
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

export default JobSeekerSection;
