const express = require("express");
const router = express.Router();
const mongoose= require("mongoose");
const jobseeker = require("../database/jobseekerModel");
const jobPosted = require("../database/jobPostedModel");
const jobRecruiter = require("../database/recruiterModel");

const UserId="694ff2356935a1966a095606";

router.get("/", async (req, res) => {
  try {
    const jobseekerData = await jobseeker
      .findById(UserId)
      .populate({
        path: "application.appliedJobs.jobId",
        populate: {
          path: "recruiter",
        },
      });
    if (!jobseekerData) {
      console.log("Data not found");
      return res.status(404).json("Data not found");
    }
    // console.log("data send :- ", jobseekerData);
    res.json(jobseekerData);
  } catch (error) {
    console.error("failed to send jobseeker Data : ", error);
    res.status(500).json("failed to fetch jobseeker Data");
  }
});

router.get("/findJob", async (req, res) => {
  try {
    const jobPostedData = await jobPosted.find().populate({
      path: "recruiter",
    });
    // console.log("data send :- ", jobPostedData);
    res.json(jobPostedData);
  } catch (error) {
    console.error("failed to send jobseeker/findJob Data : ", error);
    res.status(500).json("failed to fetch jobseeker/findJob Data");
  }
});

router.put("/apply", async (req, res) => {
  try {
   data=req.body;
   console.log(data);
   isPresent= await jobseeker.findOne({_id: UserId, "application.appliedJobs.jobId": data.id})
   console.log(isPresent);
    if(!isPresent){
      await jobseeker.findByIdAndUpdate(UserId,{$addToSet: {"application.appliedJobs":{jobId: data.id, status: "pending", appliedAt: new Date()}},$inc: { "application.total": 1, "application.pending": 1 }})
      await jobPosted.findByIdAndUpdate(data.id,{$addToSet: {"applications":{applicant: UserId, status: "pending", appliedAt: new Date()}}})
      res.status(200).json({message: "Job applied successfully", isPresent: false});
    }
    else{
      res.status(200).json({message: "Job is alredy applied", isPresent: true});
    }

  } catch (error) {
    console.error("failed to update jobseeker/findJob Data : ", error);
    res.status(500).json("failed to update jobseeker/findJob Data");
  }
});

router.put("/editProfile", async (req, res) => {
  try {
    const updatedJobseeker = await jobseeker.findByIdAndUpdate(
      UserId,
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
    res.status(200).json(updatedJobseeker);
  } catch (error) {
    console.error("failed to update jobseeker/editProfile Data:", error);
    res.status(400).json("failed to update jobseeker/editProfile Data");
  }
});

router.put("/jobApply", async (req, res) => {
  try {
    const data= req.body;
    // console.log("Delete request data:", data);
    jobData=await jobPosted.findById(data.jobId);
    const updatedApplicants = jobData.applications.filter((info) => info.applicant != UserId);
    console.log("updated data :-",updatedApplicants);
    await jobPosted.findByIdAndUpdate(data.jobId,{$set:{"applications": updatedApplicants}},{ new: true });
    updatedData=await jobseeker.findByIdAndUpdate(UserId,{ $set: { "application.appliedJobs": data.jobApplyedData }, $inc:{"application.total": -1, [`application.${data.status}`]: -1}},{new: true});
    // console.log(updatedData);
    res.status(200).json("data deleted succcessfully");
  } catch (error) {
    console.error("failed to delete jobseeker/jobApply Data:", error);
    res.status(400).json("failed to delete jobseeker/jobApply Data");
  }
})

module.exports = router;
