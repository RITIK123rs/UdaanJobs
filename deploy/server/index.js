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

app.get('/', (req, res) => {
  res.json("Server is running");
});

app.use("/jobseeker",jobseekerRouter);
app.use("/fileHandle",multerRouter);
app.use("/recruiter",recruiterRoter);
app.use("/login",loginRouter);
app.use("/home",homeRouter);
app.use("/admin",adminRouter);


app.listen(process.env.port_no,"0.0.0.0");

