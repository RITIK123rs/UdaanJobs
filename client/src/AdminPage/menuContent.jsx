import logo from "../assets/Logo.png";
import { RiHome2Line } from "react-icons/ri";
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

export default function MenuContent({setOpenMenu, phoneMenu=false, setActiveContent, setPrevContent}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column mt-3">
        <div className="d-flex justify-content-end mb-2">
          <ImCancelCircle
            className={` xBtn fs-3 me-3 ${
              phoneMenu ? "d-flex" : "d-none"
            } `}
            onClick={() => setOpenMenu(false)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <NavLink
            to="/"
            className="logoName text-decoration-none fw-bold fs-3 text-white"
          >
            <img src={logo} alt="Logo" width="40" className="me-3 mt-1" />
            Udaan<span className="yellowText">Jobs</span>
          </NavLink>
        </div>
      </div>
      <div className="menuList mt-5">
        <ul type="none" className="text-white p-0">
          <li
            className="menuItem"
            onClick={() => {setActiveContent("dashboard"),setOpenMenu(false)}}
          >
            <RiHome2Line className="menuIcon me-3" />
            Dashboard
          </li>

          <li
            className="menuItem"
            onClick={() => {
              setPrevContent("users"), setActiveContent("users"), setOpenMenu(false);
            }}
          >
            <HiOutlineUsers className="menuIcon me-3" />
            Users
          </li>

          <li className="menuItem" onClick={() => {setActiveContent("jobs"),setOpenMenu(false)}}>
            <HiOutlineBriefcase className="menuIcon me-3" />
            Jobs
          </li>

          <li
            className="menuItem"
            onClick={() => {setActiveContent("jobSeekerSection"),setOpenMenu(false)}}
          >
            <HiOutlineUserGroup className="menuIcon me-3" />
            Job Seekers
          </li>

          <li
            className="menuItem"
            onClick={() => {setActiveContent("recruiterSection"), setOpenMenu(false)}}
          >
            <HiOutlineBuildingOffice2 className="menuIcon me-3" />
            Recruiters
          </li>
        </ul>
      </div>

      <button
        className="mt-auto d-flex justify-content-center align-items-center loginButton"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <ImExit className="icon" /> Logout
      </button>
    </>
  );
}
