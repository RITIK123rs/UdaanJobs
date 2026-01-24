import React, { useEffect, useRef, useState } from "react";
import "./loginPage.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";
import BoyImg from "../assets/Boy.png"
import { API_URL } from "../api";

function LoginPage({ addMessageBox }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [currentLoginBox, setCurrentLoginBox] = useState(true);
  const navigate = useNavigate();
  const otpRef = useRef([]);
  const otpRef2 = useRef([]);
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState("close");
  const [blurBackground, setBlurBackground] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOTPclose, setisOTPclose] = useState(true);
  const defaultForgotPasswordData = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [changeBorder, setChangeBorder] = useState({
    email: false,
    password: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "jobSeeker",
  });

  const [forgotPasswordData, setForgotPasswordData] = useState(
    defaultForgotPasswordData
  );

  const signUpChangeHandler = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const LoginChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log({ name, value, checked });
    setLoginData((prev) => ({
      ...prev,
      [name]: type == "checkbox" ? checked : value,
    }));
  };

  const forgotPasswordChangeHandler = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setForgotPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(forgotPasswordData);
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("loginButton");
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.login) {
          // console.log("Login Successfully");
          // console.log(data);
          localStorage.setItem("token", data.token);
          navigate(`/${data.userType}`);
          addMessageBox("check", "Welcome back! Login successful.");
        } else {
          if (data.emailMatch) {
            addMessageBox("xMark", "Wrong password!");
            setChangeBorder({
              email: false,
              password: true,
            });
          } else {
            addMessageBox("Warning", "Email not found!");
            setChangeBorder({
              email: true,
              password: true,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        addMessageBox("Warning", "Something went wrong. Try again!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function generateOTP(email, isSignUp) {
    await fetch(`${API_URL}/login/generateOTP`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, isSignUp }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  async function signUpFunction(otp) {
    console.log(otp);
    await fetch(`${API_URL}/login/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...signUpData, otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.newUserCreated) {
          console.log("SignUp Successfully");
          console.log(data);
          localStorage.setItem("token", data.token);
          navigate(`/${data.userType}`);
          setisOTPclose(true);
          otpRef.current.map((e) => (e.value = ""));
          addMessageBox("check", "Account created successfully!");
          setLoading(false);
        } else {
          if (data.isExpired) {
            addMessageBox("warning", "OTP expired");
            setLoading(false);

          } else {
            addMessageBox("xMark", "Wrong OTP enter. try Again");
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        // console.log(error),
         setLoading(false);});
  }

  const signUpFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(signUpData);

    const res = await fetch(`${API_URL}/login/userCheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signUpData.email }),
    });

    let userCheck = await res.json();

    if (!res.ok) {
      console.log(userCheck);
      return;
    }

    if (userCheck.emailExist) {
      // console.log(userCheck.message);
      addMessageBox("warning", "email already exist");
      setLoading(false);
      return;
    }

    await generateOTP(signUpData.email, true);

    setisOTPclose(false);
    setLoading(false);
  };

  const otpHandleChange = (e) => {
    if (e.target.value && /^\d$/.test(e.target.value))
      e.target.nextSibling?.focus();
    else e.target.value = "";
  };

  const otpHandleKeyDown = (e) => {
    if (e.key === "Backspace" && !e.target.value) {
      e.target.previousSibling?.focus();
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    let OTP = otpRef.current.map((e) => e.value).join("");
    // console.log(OTP);

    if (OTP.length < 6) {
      // console.log("please enter the otp");
      addMessageBox("Warning", "Please enter the OTP");
      setLoading(false);
      return;
    }

    signUpFunction(OTP);
  };

  const forgotEmailCheck = async (e) => {
    e.preventDefault();
    // console.log("email check of forgotPassword :-", forgotPasswordData.email);

    await fetch(`${API_URL}/login/userCheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotPasswordData.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data });
        if (!data.emailExist) {
          // console.log(data.message);
          addMessageBox("warning", "email do not exist");
          setLoading(false);
          return;
        } else {
          // console.log(data.message);
          generateOTP(forgotPasswordData.email, false);
          setForgotPasswordStatus("optCheck");
          setLoading(false);
          return;
        }
      })
      .catch((error) => console.log(error));
  };

  const forgotPasswordOtpSubmit = async (e) => {
    e.preventDefault();
    let OTP = otpRef2.current.map((e) => e.value).join("");
    // console.log(OTP);

    if (OTP.length < 6) {
      // console.log("please enter the otp");
      addMessageBox("Warning", "Please enter the OTP");
      return;
    }

    const res = await fetch(`${API_URL}/login/forgotPasswordOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotPasswordData.email, OTP }),
    });

    const data = await res.json();
    if (!res.ok) {
      // console.log("error :-", data);
      return;
    }
    // console.log(data);

    if (!data.otpCorrect) {
      if (data.isExpired) addMessageBox("warning", "OTP expired");
      else addMessageBox("xMark", "Wrong OTP enter. try Again");
      return;
    }

    otpRef2.current.map((e) => (e.value = ""));
    setForgotPasswordStatus("takePassword");
  };

  const changeForgotPassword = async (e) => {
    e.preventDefault();
    // console.log({ forgotPasswordData });
    // console.log(forgotPasswordData.password != forgotPasswordData.confirmPassword);
    if (forgotPasswordData.password != forgotPasswordData.confirmPassword) {
      addMessageBox("xMark", "Passwords do not match!");
      return;
    }

    await fetch(`${API_URL}/login/changePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: forgotPasswordData.email,
        password: forgotPasswordData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => addMessageBox("check", "Password Change Successfully"))
      .catch((error) => console.log(error));

    setBlurBackground(false);
    setForgotPasswordStatus("close");
  };

  function forgotPasswordContent(currentContent) {
    // console.log(currentContent);
    if (currentContent === "emailTake") {
      return (
        <form
          className="emailTake w-100 h-100"
          method="POST"
          onSubmit={forgotEmailCheck}
        >
          <h1>Forgot Password</h1>
          <div className="d-flex flex-column inputBox pb-3">
            <label>Email</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="email"
                name="email"
                className="p-1 ps-1 text-white"
                onChange={forgotPasswordChangeHandler}
                required
              />
              <MdOutlineMailOutline className="icon" />
            </div>
          </div>
          <button type="submit">Forgot Password</button>
        </form>
      );
    } else if (currentContent === "optCheck") {
      return (
        <form
          className="w-100 h-100 position-relative optCheck"
          method="POST"
          onSubmit={forgotPasswordOtpSubmit}
        >
          <div className="iconBox mt-3">
            <MdMail className="icon" />
          </div>
          <h2 className="text-white fw-bolder text-center head">
            Verify Your Email
          </h2>
          <p className="text-white  text-center text ">
            Please Enter The Verification Code We Send <br /> To{" "}
            <span className="emailText">{forgotPasswordData.email}</span>
          </p>
          <div className="otpInputsBox">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                maxLength="1"
                type="text"
                inputMode="numeric"
                ref={(element) => (otpRef2.current[index] = element)}
                onChange={otpHandleChange}
                onKeyDown={otpHandleKeyDown}
              />
            ))}
          </div>
          <button type="submit" className="verifyBtn mt-2">
            Verify
          </button>
          <p className="resendText">
            Didn’t get the code?{" "}
            <span onClick={() => generateOTP(forgotPasswordData.email, false)}>
              Resend
            </span>
          </p>
        </form>
      );
    } else if (currentContent === "takePassword") {
      return (
        <form
          className="w-100 h-100 takePassword"
          method="POST"
          onSubmit={changeForgotPassword}
        >
          <h1>Reset Password</h1>
          <div className="d-flex flex-column showPassword2 mt-4 inputBox pb-3">
            <label>Password</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                name="password"
                type={showPassword2 ? "text" : "password"}
                className="p-1 ps-1 text-white"
                // disabledShowPassword={true}
                onChange={forgotPasswordChangeHandler}
                required
              />
              {showPassword2 ? (
                <FaEye
                  className="icon eyeIcon"
                  onClick={() => setShowPassword2(false)}
                />
              ) : (
                <FaEyeSlash
                  className="icon eyeIcon"
                  onClick={() => setShowPassword2(true)}
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-column showPassword3 inputBox pb-3">
            <label>Confirm Password</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                name="confirmPassword"
                type={showPassword3 ? "text" : "password"}
                className="p-1 ps-1 text-white"
                // disabledShowPassword={true}
                onChange={forgotPasswordChangeHandler}
                required
              />
              {showPassword3 ? (
                <FaEye
                  className="icon eyeIcon"
                  onClick={() => setShowPassword3(false)}
                />
              ) : (
                <FaEyeSlash
                  className="icon eyeIcon"
                  onClick={() => setShowPassword3(true)}
                />
              )}
            </div>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="w-100 overflow-hidden position-relative">
      <div
        className={`otpBackground position-absolute ${
          !isOTPclose || blurBackground ? "active" : ""
        } `}
      >
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <div
            className={`passwordChangeBox position-relative ${forgotPasswordStatus}`}
          >
            <FaRegCircleXmark
              className="position-absolute closeIcon"
              onClick={() => {
                setLoading(false);
                setBlurBackground(false);
                setForgotPasswordStatus("close");
                setForgotPasswordData(defaultForgotPasswordData);
                otpRef2.current.map((e) => (e.value = ""));
              }}
            />

            {forgotPasswordContent(forgotPasswordStatus)}
          </div>
          <div
            className="otpBox"
            style={{ display: isOTPclose ? "none" : undefined }}
          >
            <form
              className="w-100 h-100 position-relative"
              method="POST"
              onSubmit={otpSubmit}
            >
              <div className="position-absolute closeBox">
                <FaRegCircleXmark
                  onClick={() => {
                    setLoading(false);
                    setisOTPclose(true),
                      otpRef.current.map((e) => (e.value = ""));
                  }}
                />
              </div>
              <div className="iconBox mt-3">
                <MdMail className="icon" />
              </div>
              <h2 className="text-white fw-bolder text-center head">
                Verify Your Email
              </h2>
              <p className="text-white  text-center text ">
                Please Enter The Verification Code We Send <br /> To{" "}
                <span className="emailText">{signUpData.email}</span>
              </p>
              <div className="otpInputsBox">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    maxLength="1"
                    type="text"
                    inputMode="numeric"
                    onChange={otpHandleChange}
                    onKeyDown={otpHandleKeyDown}
                    ref={(element) => (otpRef.current[index] = element)}
                  />
                ))}
              </div>
              <button className="verifyBtn mt-2  ">Verify</button>
              <p className="resendText">
                {" "}
                Didn’t get the code?{" "}
                <span onClick={() => generateOTP(signUpData.email, true)}>
                  Resend
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      <NavLink to="/">
        {" "}
        <button
          className="position-absolute homeBtn fs-5 p-1 px-2 rounded-3 d-flex align-items-center fw-bold"
          style={{
            border: currentLoginBox
              ? "2px solid var(--yellowTextColor)"
              : "2px solid black",
            color: currentLoginBox ? "var(--yellowTextColor)" : "black",
            transition: "all 0.9s ease",
          }}
        >
          <FaArrowLeft className="me-2" />
          Home
        </button>{" "}
      </NavLink>
      <div
        className={`loginPage d-flex ${
          currentLoginBox ? "onLogin" : "onSignUp"
        }`}
      >
        <div className="loginBox d-flex justify-content-center align-items-center">
          <form
            className="loginForm text-white"
            method="post"
            onSubmit={loginFormSubmit}
          >
            <h1 className="heading fw-bold mt-1">Login</h1>
            <p className="subHeading mt-3">
              Welcome back! Let’s get started by logging into your account
            </p>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Email</label>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ borderColor: changeBorder.email ? "red" : undefined }}
              >
                <input
                  type="email"
                  name="email"
                  onChange={LoginChangeHandler}
                  className="p-1 ps-1 text-white"
                  required
                />
                <MdOutlineMailOutline className="icon" />
              </div>
            </div>
            <div className="d-flex flex-column inputBox passwordBox">
              <label>Password</label>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  borderColor: changeBorder.password ? "red" : undefined,
                }}
              >
                <input
                  name="password"
                  onChange={LoginChangeHandler}
                  type={showPassword ? "text" : "password"}
                  className="p-1 ps-1 text-white"
                  // disabledShowPassword={true}
                  required
                />
                {showPassword ? (
                  <FaEye
                    className="icon eyeIcon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon eyeIcon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="checkBox mt-3 d-flex align-items-center">
              <input
                type="checkbox"
                name="rememberMe"
                onChange={LoginChangeHandler}
                className="form-check-input"
              />
              <label className="ms-2">Remember me</label>
              <p
                className="forgetPasswordText m-0 mt-1 ms-auto yellowText text-end"
                onClick={() => {
                  setBlurBackground(true);
                  setForgotPasswordStatus("emailTake");
                }}
              >
                Forgot Passoword?
              </p>
            </div>
            <button
              type="submit"
              className="w-100 mt-3 rounded-pill p-1 fw-bold text-white loginBtn d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="loader" style={{ width: "22px", height:"22px" }} ></span>
              ) : (
                "Login"
              )}
            </button>
            <p className="m-0 mt-3 lastLine">
              Don't have an account?{" "}
              <span
                className="yellowText"
                onClick={() => { if(!loading) setCurrentLoginBox(false) } }
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
        <div
          className="imgBox d-none d-lg-flex justify-content-center align-items-center"
          style={{
            borderRadius: currentLoginBox ? "20% 0 0 20%" : "0 20% 20% 0",
            transition: "border-radius 1.5s ease",
          }}
        >
          <img
            src={BoyImg}
            alt=""
            className=" boyImg "
            style={{
              transform: currentLoginBox ? "rotateY(0deg)" : "rotateY(180deg)",
              transition: "transform 0.7s ease",
            }}
          />
        </div>
        <div className="signUpBox d-flex justify-content-center align-items-center">
          <form
            className="signUpForm text-white pt-3"
            onSubmit={signUpFormSubmit}
          >
            <h1 className="heading fw-bold ">Sign Up</h1>
            <p className="subHeading mt-3">
              Sign up to connect with great companies and exciting career
              opportunities
            </p>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Full Name</label>
              <input
                onChange={signUpChangeHandler}
                type="text"
                name="name"
                className="w-100 p-1 ps-2 text-white nameInput"
                required
              />
            </div>
            <div className="d-flex flex-column inputBox pb-3">
              <label>Email</label>
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="email"
                  onChange={signUpChangeHandler}
                  name="email"
                  className="p-1 ps-1 text-white"
                  required
                />
                <MdOutlineMailOutline className="icon" />
              </div>
            </div>
            <div className="d-flex flex-column inputBox">
              <label>Password</label>
              <div className="d-flex align-items-center justify-content-center">
                <input
                  onChange={signUpChangeHandler}
                  name="password"
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
                    onChange={signUpChangeHandler}
                    className="form-check-input"
                    value="jobSeeker"
                    type="radio"
                    name="userType"
                    defaultChecked
                  />
                  <label className="ms-2">JobSeeker</label>
                </div>
                <div className="ms-4">
                  <input
                    onChange={signUpChangeHandler}
                    className="form-check-input"
                    type="radio"
                    name="userType"
                    value="recruiter"
                  />
                  <label className="ms-2">Recruiter</label>
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
            <button
              type="submit"
              className="w-100 mt-3 rounded-pill fw-bold text-white signUpBtn d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
               <span className="loader" style={{ width: "22px", height:"22px" }} ></span>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="m-0 mt-3 lastLine">
              Already have an account?{" "}
              <span
                className="yellowText"
                onClick={() => { if(!loading) setCurrentLoginBox(true) } }
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
