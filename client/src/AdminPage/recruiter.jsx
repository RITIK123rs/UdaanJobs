import React, { useEffect, useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";

function RecruiterSection({
  setRecruiterId,
  setPrevContent,
  setActiveContent,
}) {

  const API_URL= import.meta.env.VITE_API_URL;
  const [recruiterData, setRecruiterData] = useState();

  const [searchData, setSearchData] = useState({
    name: "",
    email: "",
    lastLogin: "",
  });
  const [filterData, setFilterData] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(searchData);
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(searchData);
  };

  useEffect(() => {
    if (
      searchData.name == "" &&
      searchData.email == "" &&
      searchData.lastLogin == ""
    ) {
      setFilterData(recruiterData);
      return;
    }

    const timer = setTimeout(() => {
      const data = recruiterData.filter((data) => {
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
      console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchData, recruiterData]);

  useEffect(() => {
    async function getDashBoardData() {
      await fetch(`${API_URL}/admin/recruiter`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRecruiterData(data);
        })
        .catch((error) => console.log(error));
    }

    getDashBoardData();
  }, []);

  return (
    <div className="recruiterSection">
      <h2 className="pageTitle">Recruiters</h2>
      <hr className="my-3" />

      <div className="filterRow d-flex align-items-center gap-3 justify-content-end mb-4">
        <div className="filterField d-flex align-items-center">
          <FaSearch className="icon me-2" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
          />
        </div>

        <div className="filterField d-flex align-items-center">
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
              <th className="text-center">Jobs Posted</th>
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
                          data.image
                            ? `${API_URL}/upload/${data.image}`
                            : `${API_URL}/defaultImage/defaultCompanyImg.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="fw-semibold">{data.userName}</div>
                    </div>
                  </div>
                </td>

                <td>{data.email}</td>
                <td>{dateFormat(data.lastLogin)}</td>
                <td className="text-center">{data.jobPosted}</td>
                <td>
                  <button
                    className="profileBtn d-flex align-items-center m-auto"
                    onClick={() => {
                      setPrevContent("recruiterSection");
                      setRecruiterId(data._id);
                      setActiveContent("companyProfile");
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

export default RecruiterSection;
