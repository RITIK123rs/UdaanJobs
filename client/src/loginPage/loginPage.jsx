import React, { useEffect, useState } from "react";
import "./loginPage.css";
import img1 from "../assets/homepage/Boy.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentLoginBox, setCurrentLoginBox] = useState(true);
 

  return (
    <div className="w-100 overflow-hidden position-relative">
      <button className="position-absolute homeBtn fs-5 p-1 px-2 rounded-3 d-flex align-items-center fw-bold" style={{border: currentLoginBox ? '2px solid var(--yellowTextColor)' : '2px solid black' , color: currentLoginBox ? 'var(--yellowTextColor)' : 'black' ,
        transition: 'all 0.9s ease'
        }}><FaArrowLeft className="me-2" />Home</button>
      <div className={`loginPage d-flex ${currentLoginBox ? 'onLogin' : 'onSignUp'}`} >
        <div className="loginBox d-flex justify-content-center align-items-center">
          <form className="loginForm text-white">
            <h1 className="heading fw-bold mt-1">Login</h1>
            <p className="subHeading mt-3">
              Welcome back! Let’s get started by logging into your account
            </p>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Email</label>
              <div className="d-flex align-items-center justify-content-center">
                <input type="email" className="p-1 ps-1 text-white" required />
                <MdOutlineMailOutline className="icon" />
              </div>
            </div>
            <div className="d-flex flex-column inputBox">
              <label>Password</label>
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-1 ps-1 text-white"
                  // disabledShowPassword={true}
                  required
                />
                {showPassword ? (
                  <FaEye
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="checkBox mt-3 d-flex align-items-center">
              <input type="checkBox" className="form-check-input" />
              <label className="ms-2">Remember me</label>
              <p className="m-0 mt-1 ms-auto yellowText text-end">
                Forgot Passoword?
              </p>
            </div>
            <button className="w-100 mt-3 rounded-3 p-1 fw-bold text-white">
              Login
            </button>
            <p className="m-0 mt-3 lastLine">
              Don't have an account? <span className="yellowText" onClick={()=>setCurrentLoginBox(false)}>Sign Up</span>
            </p>
          </form>
        </div>
        <div className="imgBox d-none d-lg-flex justify-content-center align-items-center" style={{borderRadius: currentLoginBox ? '20% 0 0 20%' : '0 20% 20% 0', transition: 'border-radius 1.5s ease' }}>
          <img src={img1} alt="" className=" boyImg " style={{transform: currentLoginBox ? 'rotateY(0deg)' : 'rotateY(180deg)', transition: 'transform 0.7s ease'}} />
        </div>
        <div className="signUpBox d-flex justify-content-center align-items-center">
          <form className="signUpForm text-white pt-3">
            <h1 className="heading fw-bold ">Sign Up</h1>
            <p className="subHeading mt-3">
              Sign up to connect with great companies and exciting career
              opportunities
            </p>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="w-100 p-1 ps-2 text-white nameInput"
                required
              />
            </div>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Email</label>
              <div className="d-flex align-items-center justify-content-center">
                <input type="email" className="p-1 ps-1 text-white" required />
                <MdOutlineMailOutline className="icon" />
              </div>
            </div>
            <div className="d-flex flex-column inputBox">
              <label>Password</label>
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-1 ps-1 text-white"
                  // disabledShowPassword={true}
                  required
                />
                {showPassword ? (
                  <FaEye
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="registerAsBox mt-2 d-flex flex-column pb-3">
              <label className="fw-semibold">Who are you?</label>
              <div className="d-flex align-items-center mt-2">
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="registerAs"
                    defaultChecked
                  />
                  <label className="ms-2">Job Seeker</label>
                </div>
                <div className="ms-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="registerAs"
                  />
                  <label className="ms-2">Employer</label>
                </div>
              </div>
            </div>
            <div className="checkBox d-flex align-items-center">
              <input className="form-check-input" type="checkBox" required />
              <label className="ms-2">
                i agree with the 
                <span className="yellowText"> Terms of services</span> and
                <span className="yellowText"> Privacy Policy</span>
              </label>
            </div>
            <button className="w-100 mt-3 rounded-3 p-1 fw-bold text-white">
              Sign Up
            </button>
            <p className="m-0 mt-3 lastLine">
              Already have an account? <span className="yellowText"  onClick={()=>setCurrentLoginBox(true)} >Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
