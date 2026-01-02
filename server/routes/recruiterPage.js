const express = require("express");
const router = express.Router();
const mongoose= require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const jobSeeker = require("../database/jobseekerModel");
const jobPosted = require("../database/jobPostedModel");
const jobRecruiter = require("../database/recruiterModel");

const userId="6956880475e4b2d1b0a513cf";

router.get("/", async (req, res)=>{
    try{
    const data= await jobRecruiter.findById(userId,{password:0}).populate({path:"jobPosted", select:"role jobType workMode location createdAt closingDate applications" , populate:{ path:"applications.applicant" , select: " _id userName personalInfo.resume " }});
    // console.log(data);
    res.json(data);
    }catch(error){
        console.log("failed to send recruiter Data :- ", error);
        res.status(500).json("failed to send recruiter Data :-", error);
    }
})

router.get("/jobSeeker/:Id",async (req,res)=>{
    try{
    const jobSeekerId=req.params.Id;
    const data=await jobSeeker.findById(jobSeekerId).select(" userName personalInfo ");
    // console.log({jobSeekerId,data});
    res.json(data);
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.post("/postJob",async (req,res)=>{
    try{
    data=req.body;
    data.recruiter=userId;
    const savedPost = await jobPosted.create(data);
    // console.log(savedPost);
    const updateRecruiter= await jobRecruiter.findByIdAndUpdate(userId,{ $push: {jobPosted: savedPost._id}},{new: true});
    // console.log(updateRecruiter);

    res.json("job Posted successfully");
    }
    catch(error){
        console.log(console.error);
        res.status(500).json(error);
    }
})

router.get("/jobPostData/:id",async (req,res)=>{
    try{
    const jobPostId= req.params.id;
    const jobPostedData = await jobPosted.findById(jobPostId,{applications: 0}).populate({
          path: "recruiter",
          select:"company.logo",
        });
        res.json(jobPostedData);
    }
    catch(error){
        console.log(console.error);
        res.status(500).json(error);
    }
})

router.put("/UpdatePostData/:id",async (req,res)=>{
    try{
    const jobPostId= req.params.id;
    const updatedData= await jobPosted.findByIdAndUpdate(jobPostId,{ $set: req.body },{new: true});
    // console.log("updateDate");
    res.json("Successfully updated");
    }
    catch(error){
        console.log(console.error);
        res.status(500).json(error);
    }
})

router.delete("/deletePost/:id",async (req,res)=>{
    try{
    const jobPostId=req.params.id;
    console.log({jobPostId});
    const DeleteJobPost = await jobPosted.findByIdAndDelete(jobPostId).select("recruiter applications");
    console.log("DeleteJobPost :- ",DeleteJobPost.applications);
    DeleteJobPost.applications.forEach(async jobSeekerId => {
        console.log(jobSeekerId.applicant);
        await jobSeeker.findOneAndUpdate({_id: new ObjectId(jobSeekerId.applicant), "application.appliedJobs.jobId" : new ObjectId(jobPostId)  }, { $pull: {"application.appliedJobs": {jobId: new ObjectId(jobPostId) }} });
    });
    console.log(userId,DeleteJobPost.recruiter)
    await jobRecruiter.findOneAndUpdate({_id: new ObjectId(DeleteJobPost.recruiter) , jobPosted: new ObjectId(jobPostId), },{ $pull:{ jobPosted: new ObjectId(jobPostId) }},{new: true});
    res.json("job Deleted successfully");
    }
    catch(error){
        console.error(error);
        res.status(500).json(error);
    }
})

router.put("/updateJobSeekerStatus",async (req,res)=>{
    try{
    const { jobId, jobStatus, jobSeekerId } = req.body;
    const jobSeekerObjId = new ObjectId(jobSeekerId);
    const jobIdObjId = new ObjectId(jobId);
    // console.log({ jobId, jobStatus, jobSeekerId });
    const updateJobSeekerData=await jobSeeker.findOneAndUpdate({_id: jobSeekerObjId ,"application.appliedJobs.jobId": jobIdObjId },{$set: {"application.appliedJobs.$.status": jobStatus }},{new: true});
    // console.log({updateJobSeekerData});
    const updateJobPostedData=await jobPosted.findOneAndUpdate({_id: jobIdObjId, "applications.applicant": jobSeekerObjId },{$set: {"applications.$.status": jobStatus }},{new: true});
    // console.log({updateJobPostedData});
    res.json("Successfully updated");
    }
    catch(error){
        console.error(error);
        res.status(500).json(error);
    }
})


module.exports= router;