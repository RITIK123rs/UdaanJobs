const dotenv= require("dotenv");
const connectDB = require("./database/db");
const express= require("express");
const app= express();
const cors= require("cors");
const jobseekerRouter= require("./routes/jobseekerPage");
const multerRouter= require("./routes/multer");
const recruiterRoter= require("./routes/recruiterPage");
const loginRouter=require("./routes/loginPage");
const homeRouter= require("./routes/homePage");
const adminRouter= require("./routes/admin");
const fs= require("fs");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/upload", express.static('upload'));
app.use("/defaultImage", express.static('defaultImage'));

app.use("/jobseeker",jobseekerRouter);
app.use("/fileHandle",multerRouter);
app.use("/recruiter",recruiterRoter);
app.use("/login",loginRouter);
app.use("/home",homeRouter);
app.use("/admin",adminRouter);













































const nodemailer = require("nodemailer");

async function sendMail() {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
    auth: {
    user: process.env.Smtp_user,
    pass: process.env.Smtp_pass,
  },
    });

    mailData = {
        from: `UdaanJobs <udaanjobs.rs@gmail.com>`,
        to: "dk7025146@gmail.com",
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
                1234
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
`,}
    const firstName = "John";
    let info = await transporter.sendMail(mailData );

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendMail();




























app.listen(process.env.port_no,"0.0.0.0");

