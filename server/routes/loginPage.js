const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const mongoose = require("mongoose");
const jobSeeker = require("../database/jobseekerModel");
const jobRecruiter = require("../database/recruiterModel");
const Admin = require("../database/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "gmail",
  // auth: {
  //   user: process.env.Email_Id,
  //   pass: process.env.Email_PasswordCode,
  // },

  // host: "smtp-relay.brevo.com",
  // port: 587,
  // secure: false,
  // auth: {
  //   user: process.env.Smtp_user,
  //   pass: process.env.Smtp_pass,
  // },

  host: "smtp-relay.brevo.com",
  port: 465, // SSL port
  secure: true, // must be true for 465
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  
});

transporter.verify((err) => {
  if (err) console.error("SMTP error:", err);
  else console.log("Brevo SMTP ready");
});

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
    // console.log(OTP);
    otpStore[email] = OTP;
    // console.log(otpStore[email]);
    setTimeout(
      () => {
        delete otpStore[email];
      },
      5 * 60 * 1000,
    );

    let mailData;

    // console.log("User:", process.env.Email_Id);
    // console.log("Pass:", process.env.Email_PasswordCode);

    if (isSignUp) {
      mailData = {
        from: `UdaanJobs <${process.env.Email_Id}>`,
        to: email,
        subject: "Email Verification OTP",
        html: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>

<body>
    <h1 style="padding: 20px; text-align: center; background:#0a66c2; color:#ffffff;">UdaanJobs</h1>
    <div style="padding: 20px 10px;">

        <p style="font-size:16px;">Dear User,</p>

        <p style="font-size:15px;">
            Thank you for signing up with <strong>UdaanJobs</strong>.
            To complete your registration, please use the One-Time Password (OTP) below:
        </p>

        <div style="margin: 35px 0; text-align:center;">
            <span style="color: #0a66c2; font-weight: bold; background-color: #0a66c251; padding: 10px 20px; border-radius: 5px; font-size: 25px; letter-spacing: 7px;" >
                ${OTP}
            </span>
        </div>

        <p style="font-size:14px; color: #484545;">
            This OTP is valid for <strong>5 minutes</strong> only.
            Please do not share this OTP with anyone for security reasons.<br><br><br>
            If you did not initiate this request, please ignore this email.
        </p>

    </div>
</body>

</html>
`,
      };
    } else {
      mailData = {
        from: `Udaan Jobs <${process.env.Email_Id}>`,
        to: email,
        subject: "Password Reset OTP",
        html: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>

<body>
    <h1 style="padding: 20px; text-align: center; background:#0a66c2; color:#ffffff;">UdaanJobs</h1>
    <div style="padding: 20px 10px;">

        <p style="font-size:16px;">Dear User,</p>

        <p style="font-size:15px;">
            We received a request to reset your UdaanJobs account password.
          Please use the following One-Time Password (OTP) to reset your password:
        </p>

        <div style="margin: 35px 0; text-align:center;">
            <span style="color: #0a66c2; font-weight: bold; background-color: #0a66c251; padding: 10px 20px; border-radius: 5px; font-size: 25px; letter-spacing: 7px;" >
                ${OTP}
            </span>
        </div>

        <p style="font-size:14px; color: #484545;">
            This OTP is valid for <strong>5 minutes</strong> only.
            If you did not request a password reset, please ignore this email.<br><br><br>
            For your security, do not share this OTP with anyone.
        </p>

    </div>
</body>

</html>
`,
      };
    }
    // console.log(mailData);

    try {
      await transporter.sendMail(mailData);
      return res.json("Email sent successfully");
    } catch (error) {
      console.error("Mail error:", error);
      return res.status(500).json("Error sending email");
    }
  } catch (error) {
    // console.log("otp error :- ", error);
    res.status(500).json(`otp error :- ${error} `);
  }
});

router.post("/forgotPasswordOtp", async (req, res) => {
  // console.log(req.body);
  const { email, OTP } = req.body;

  if (!otpStore[email]) {
    // console.log("OTP expired");
    return res.json({ otpCorrect: false, isExpired: true });
  }
  if (otpStore[email] != OTP) {
    // console.log("wrong OTP");
    return res.json({ otpCorrect: false, isExpired: false });
  }

  return res.json({ otpCorrect: true });
});

router.post("/changePassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    // console.log({ email, password });
    let user = await jobSeeker.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true },
    );

    if (!user) {
      user = await jobRecruiter.findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } },
        { new: true },
      );
    }

    if (!user) {
      user = await Admin.findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } },
        { new: true },
      );
    }

    // console.log(user);

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
      (await jobRecruiter.findOne({ email })) ||
      (await Admin.findOne({ email }));

    // console.log("userCheck :-", checkUser);

    if (checkUser) {
      return res.json({ message: "email already exist", emailExist: true });
    }

    return res.json({ message: "new email", emailExist: false });
  } catch (error) {
    console.log("userCheck error :- ", error);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, userType, otp } = req.body;

    // console.log(otpStore);

    // console.log(!otpStore[email]);
    if (!otpStore[email]) {
      // console.log("OTP expired");
      return res.json({ newUserCreated: false, isExpired: true });
    }
    // console.log(otpStore[email] != otp);
    if (otpStore[email] != otp) {
      // console.log("wrong OTP");
      return res.json({ newUserCreated: false, isExpired: false });
    }

    // console.log("userType");

    let user = null;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    if (userType == "jobSeeker") {
      user = await jobSeeker.create({
        userName: name,
        email,
        password: hashedPassword,
      });
    } else {
      user = await jobRecruiter.create({
        userName: name,
        email,
        password: hashedPassword,
      });
    }

    // console.log(user);
    // console.log("SignUp successfully");

    const token = jwt.sign(
      { userId: user._id, userType },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );
    return res.json({ newUserCreated: true, token, userType });
  } catch (error) {
    // console.log("signUp error :- ".error);
    return res.status(400).json(`signUp error :- ${error} `);
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, rememberMe } = req.body;

    let userType = "jobSeeker";
    let user = await jobSeeker.findOne({ email });
    if (user)
      await jobSeeker.findByIdAndUpdate(user._id, {
        $set: { lastLogin: new Date() },
      });

    if (!user) {
      // console.log("recruiter");
      user = await jobRecruiter.findOne({ email });
      if (user) {
        await jobRecruiter.findByIdAndUpdate(user._id, {
          $set: { lastLogin: new Date() },
        });
        userType = "recruiter";
      }
    }

    if (!user) {
      // console.log("admin");
      user = await Admin.findOne({ email });
      if (user) {
        await Admin.findByIdAndUpdate(user._id, {
          $set: { lastLogin: new Date() },
        });
        userType = "admin";
      }
    }

    if (!user) return res.json({ login: false, emailMatch: false });

    // console.log(user.password);
    const match = await bcrypt.compare(password, user.password);
    // console.log(match);
    if (!match) {
      return res.json({ login: false, emailMatch: true });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName, userType },
      process.env.SECRET_KEY,
      rememberMe ? { expiresIn: "30d" } : {},
    );

    return res.json({ login: true, token, userType });
  } catch (error) {
    return res.status(500).json({ login: false, message: "Failed to login" });
  }
});

module.exports = router;
