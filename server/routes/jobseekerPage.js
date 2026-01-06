const express = require("express");
const router = express.Router();
const mongoose= require("mongoose");
const jobseeker = require("../database/jobseekerModel");
const jobPosted = require("../database/jobPostedModel");
const jobRecruiter = require("../database/recruiterModel");
const auth = require("./auth");


router.get("/findJob" , async (req, res) => {
  try {
    const jobPostedData = await jobPosted.find().populate({
      path: "recruiter",
      select:" company.name company.logo ",
    });
    // console.log("data send :- ", jobPostedData);
    res.json(jobPostedData);
  } catch (error) {
    console.error("failed to send jobseeker/findJob Data : ", error);
    res.status(500).json("failed to fetch jobseeker/findJob Data");
  }
});

router.put("/jobApply", auth("jobSeeker") ,async (req, res) => {
  try {
    const userId=req.user.userId
    const data= req.body;
    // console.log("Delete request data:", data);
    jobData=await jobPosted.findById(data.jobId);
    const updatedApplicants = jobData.applications.filter((info) => info.applicant != userId);
    console.log("updated data :-",updatedApplicants);
    await jobPosted.findByIdAndUpdate(data.jobId,{$set:{"applications": updatedApplicants}},{ new: true });
    updatedData=await jobseeker.findByIdAndUpdate(userId,{ $set: { "application.appliedJobs": data.jobApplyedData }, $inc:{"application.total": -1, [`application.${data.status}`]: -1}},{new: true});
    // console.log(updatedData);
    res.status(200).json("data deleted succcessfully");
  } catch (error) {
    console.error("failed to delete jobseeker/jobApply Data:", error);
    res.status(400).json("failed to delete jobseeker/jobApply Data");
  }
})


router.put("/apply", auth("jobSeeker") ,  async (req, res) => {
  try {
    const userId=req.user.userId;
   data=req.body;
  //  console.log(data);
   let isPresent= await jobseeker.findOne({_id: userId, "application.appliedJobs.jobId": data.id})
  //  console.log(isPresent);
    if(!isPresent){
      await jobseeker.findByIdAndUpdate(userId,{$addToSet: {"application.appliedJobs":{jobId: data.id, status: "pending", appliedAt: new Date()}},$inc: { "application.total": 1, "application.pending": 1 }})
      await jobPosted.findByIdAndUpdate(data.id,{$addToSet: {"applications":{applicant: userId, status: "pending", appliedAt: new Date()}}})
      return res.json({message: "Job applied successfully", isPresent: false});
    }
    else{
      return res.json({message: "Job is alredy applied", isPresent: true});
    }

  } catch (error) {
    console.error("failed to update jobseeker/findJob Data : ", error);
    res.status(500).json("failed to update jobseeker/findJob Data");
  }
});

router.put("/editProfile", auth("jobSeeker"), async (req, res) => {
  try {
    const userId=req.user.userId;
    const updatedJobseeker = await jobseeker.findByIdAndUpdate(
      userId,
      { $set: {
        "personalInfo.name": req.body.name,
        "personalInfo.jobTitle": req.body.jobTitle,
        "personalInfo.city": req.body.city,
        "personalInfo.email": req.body.email,
        "personalInfo.phone": req.body.phone,
        "personalInfo.languages": req.body.languages,
        "personalInfo.instagram": req.body.instagram,
        "personalInfo.twitter": req.body.twitter,
        "personalInfo.website": req.body.website,
        "personalInfo.aboutMe": req.body.aboutMe,
        "personalInfo.skills": req.body.skills,
        "personalInfo.experience": req.body.experience,
        "personalInfo.education": req.body.education,
      } },
      { new: true }
    );

    // console.log(updatedJobseeker);
    return res.json(updatedJobseeker);
  } catch (error) {
    console.error("failed to update jobseeker/editProfile Data:", error);
    return res.status(400).json("failed to update jobseeker/editProfile Data");
  }
});

router.get("/recruiter/:id", auth("jobSeeker"),async (req,res)=>{
    const recruiterId=req.params.id;
    const data=await jobRecruiter.findById(recruiterId).select("company");
    // console.log({recruiterId,data});
    res.json(data);
})

router.get("/", auth("jobSeeker") , async (req, res) => {
  try {
    const userId=req.user.userId;
    const jobseekerData = await jobseeker
      .findById(userId,{password: 0})
      .populate({
        path: "application.appliedJobs.jobId",
        populate:{ path:"recruiter", select:" company.name company.logo "}, 
      });
    if (!jobseekerData) {
      // console.log("Data not found");
      return res.status(404).json("Data not found");
    }
    console.log("data send :- ", jobseekerData);
    res.json(jobseekerData);
  } catch (error) {
    console.error("failed to send jobseeker Data : ", error);
    res.status(500).json("failed to fetch jobseeker Data");
  }
});



module.exports = router;
