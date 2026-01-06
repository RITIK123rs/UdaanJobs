const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jobSeeker = require("../database/jobseekerModel");
const jobRecruiter = require("../database/recruiterModel");
const jwt = require("jsonwebtoken");

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   server: "gmail",
//   auth: {
//     user: "",
//     pass: "",
//   },
// });

const otpStore = {};

router.post("/generateOTP", async (req, res) => {
  try {
    console.log("generateOTP");
    console.log(req.body);
    const { email, isSignUp } = req.body;
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    console.log(OTP);
    otpStore[email] = OTP;
    console.log(otpStore[email]);
    setTimeout(() => {
      delete otpStore[email];
    }, 5 * 60 * 1000);

//     if (isSignUp) {
//       const mailData = {
//         from: "UdaanJobs <your-email@gmail.com>",
//         to: email,
//         subject: "UdaanJobs | Email Verification OTP",
//         text: `Dear User,

//       Thank you for signing up with UdaanJobs.

//       To complete your registration, please use the One-Time Password (OTP) below:

//       OTP: ${OTP}

//       This OTP is valid for 5 minutes only. Please do not share this OTP with anyone for security reasons.

//       If you did not initiate this request, please ignore this email.`,
//       };
//     } else {
//       const mailData = {
//   from: "UdaanJobs <your-email@gmail.com>",
//   to: email,
//   subject: "UdaanJobs | Password Reset OTP",
//   text: `Dear User,

// We received a request to reset your UdaanJobs account password.

// Please use the following One-Time Password (OTP) to reset your password:

// OTP: ${OTP}

// This OTP is valid for 5 minutes only. If you did not request a password reset, please ignore this email.

// For your security, do not share this OTP with anyone.`,
// };
//     }

//     transporter.sendMail(mailData, (error, info) => {
//       if (error) {
//         console.log("error in sending mail");
//         return res.json(`error in sending mail`);
//       }

//       console.log("email send :- ", info.response);
//     });

    return res.json(`OTP generated successfully :- ${OTP} `);
  } catch (error) {
    console.log("otp error :- ", error);
    res.status(500).json(`otp error :- ${error} `);
  }
});

router.post("/forgotPasswordOtp", async (req, res) => {
  console.log(req.body);
  const { email, OTP } = req.body;

  if (!otpStore[email]) {
    console.log("OTP expired");
    return res.json({ otpCorrect: false, isExpired: true });
  }
  if (otpStore[email] != OTP) {
    console.log("wrong OTP");
    return res.json({ otpCorrect: false, isExpired: false });
  }

  return res.json({ otpCorrect: true });
});

router.post("/changePassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log({ email, password });
    let user = await jobSeeker.findOneAndUpdate(
      { email },
      { $set: { password } },
      { new: true }
    );

    if (!user) {
      let user = await jobRecruiter.findOneAndUpdate(
        { email },
        { $set: { password } },
        { new: true }
      );
    }

    console.log(user);

    return res.json("password change successfully");
  } catch (error) {
    res.status(500).json("failed to change password");
  }
});

router.post("/userCheck", async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser =
      (await jobSeeker.findOne({ email })) ||
      (await jobRecruiter.findOne({ email }));

    console.log("userCheck :-", checkUser);

    if (checkUser) {
      return res.json({ message: "email already exist", emailExist: true });
    }

    return res.json({ message: "new email", emailExist: false });
  } catch (error) {
    console.log("userCheck error :- ".error);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, userType, otp } = req.body;

    console.log(otpStore);

    console.log(!otpStore[email]);
    if (!otpStore[email]) {
      console.log("OTP expired");
      return res.json({ newUserCreated: false, isExpired: true });
    }
    console.log(otpStore[email] != otp);
    if (otpStore[email] != otp) {
      console.log("wrong OTP");
      return res.json({ newUserCreated: false, isExpired: false });
    }

    console.log("userType");

    let user = null;

    if (userType == "jobSeeker") {
      user = await jobSeeker.create({ userName: name, email, password });
    } else {
      user = await jobRecruiter.create({ userName: name, email, password });
    }

    console.log(user);
    console.log("SignUp successfully");

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.json({ newUserCreated: true, token, userType });
  } catch (error) {
    console.log("signUp error :- ".error);
    return res.status(400).json(`signUp error :- ${error} `);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, rememberMe } = req.body;

    // let user = (await jobSeeker.findOne({ email: email })) || (await jobRecruiter.findOne({ email: email }));
    let userType = "jobSeeker";
    let user = await jobSeeker.findOne({ email });
    if (user)
      await jobSeeker.findByIdAndUpdate(user._id, {
        $set: { lastLogin: new Date() },
      });
    if (!user) {
      user = await jobRecruiter.findOne({ email });
      await jobRecruiter.findByIdAndUpdate(user._id, {
        $set: { lastLogin: new Date() },
      });
      userType = "recruiter";

      if (!user) return res.json({ login: false, emailMatch: false });
    }

    console.log(user.password);
     if (user.password !== password) {
      return res.json({ login: false, emailMatch: true });
    }

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.SECRET_KEY,
      rememberMe ? { expiresIn: "30d" } : {}
    );

    return res.json({ login: true, token, userType });

  } catch (error) {
    return res.status(500).json("failed to login");
  }
});

module.exports = router;
