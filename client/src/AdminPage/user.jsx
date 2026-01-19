import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import "./adminPage.css";
import { dateFormat } from "../utils/dateFormat";
import { MdOutlineMenu } from "react-icons/md";
import Clock from "../component/clock";
import { API_URL } from "../api";


function Users({
  setActiveContent,
  setJobSeekerId,
  setRecruiterId,
  setOpenMenu,
}) {
  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState({
    name: "",
    lastLogin: "",
    role: "",
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
      searchData.name == "" &&
      searchData.lastLogin == "" &&
      searchData.role == ""
    ) {
      setFilterData(users);
      return;
    }

    const timer = setTimeout(() => {
      const data = users.filter((user) => {
        const nameMatch = user.userName
          .toLowerCase()
          .startsWith(searchData.name.toLowerCase().trim());

        console.log(
          user.userName
            .toLowerCase()
            .startsWith(searchData.name.toLowerCase().trim())
        );

        let lastLoginMatch = true;

        if (searchData.lastLogin) {
          const dataDate = new Date(user.lastLogin);
          const filterDate = new Date(searchData.lastLogin);

          const dataDateStr = dataDate.toLocaleDateString("en-CA");
          const filterDateStr = filterDate.toLocaleDateString("en-CA");

          lastLoginMatch = dataDateStr == filterDateStr;
        }
        const roleMatch =
          searchData.role == user.userType || searchData.role == "";
        return nameMatch && lastLoginMatch && roleMatch;
      });
      // console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, users]);

  useEffect(() => {
    async function getDashBoardData() {
      await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUsers(data);
        })
        .catch((error) => console.log(error));
    }

    getDashBoardData();
  }, []);

  const handleProfileClick = (id, userType) => {
    if (userType === "jobSeeker") {
      setJobSeekerId(id);
      setActiveContent("jobSeekerProfile");
    } else {
      setRecruiterId(id);
      setActiveContent("companyProfile");
    }
  };

  return (
    <div className="usersSection">
      <div className="d-flex gap-2 mt-3 align-items-center">
        <MdOutlineMenu
          className="PhoneMenuIcon d-xl-none"
          onClick={() => setOpenMenu(true)}
        />
        <h2 className="pageTitle">Users</h2>
        <div className="ms-auto d-none d-md-block" >
                  < Clock />
                </div>
      </div>
      <hr className="my-3" />

      <div className="filterBox mb-3 d-flex justify-content-end pe-md-3">
        <div className="field textBox">
          <FaSearch className="icon me-2 fs-5" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
          />
        </div>
        <div className="field dateBox ms-md-2">
          <MdOutlineDateRange className="icon me-2 fs-3" />
          <input
            type="date"
            placeholder="Last Login"
            name="lastLogin"
            onChange={changeHandler}
          />
        </div>
        <div className="field role ms-2">
          <MdFilterListAlt className="icon fs-3" />
          <select
            className="fs-5"
            defaultValue=""
            name="role"
            onChange={changeHandler}
          >
            <option value="">Role</option>
            <option value="jobSeeker">JobSeeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
      </div>

      <div className="tableBox">
        <table className="table position-relative">
          <thead>
            <tr className="position-sticky top-0 headerRow">
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th className="text-center">Role</th>
              <th className="text-center">Profile</th>
            </tr>
          </thead>

          <tbody>
            {filterData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className=" d-flex align-items-center gap-3 ">
                    <div className="imgBox">
                      <img
                        src={
                          user.userType === "jobSeeker"
                            ? user.image
                              ? `${API_URL}/upload/${user.image}`
                              : `${API_URL}/defaultImage/defaultProfilePic.jpg`
                            : user.image
                            ? `${API_URL}/upload/${user.image}`
                            : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                        }
                        alt="user"
                      />
                    </div>
                    <span className="text-capitalize">{user.userName}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{dateFormat(user.lastLogin)}</td>
                <td>
                  <div className={`roleBadge text-center ${user.userType}`}>
                    {user.userType}
                  </div>
                </td>
                <td>
                  <button
                    className="profileBtn d-flex m-auto"
                    onClick={() => handleProfileClick(user._id, user.userType)}
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

export default Users;
