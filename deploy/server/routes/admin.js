const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jobPosted = require("../database/jobPostedModel");
const jobseeker = require("../database/jobseekerModel");
const jobRecruiter = require("../database/recruiterModel");
const auth = require("./auth");

router.get("/",auth("admin"),async (req,res)=>{

    try{
    const jobPostedCount= await jobPosted.countDocuments();
    const jobSeekerCount = await jobseeker.countDocuments();
    const recruiterCount= await jobRecruiter.countDocuments();

    const jobSeeker= await jobseeker.find().select("_id userName lastLogin email personalInfo.profilePhoto").sort({lastLogin: -1}).limit(5).lean();
    const SelectedJobSeeker= jobSeeker.map((data)=>({
        ...data,
        userType: "jobSeeker",
        image: data.personalInfo?.profilePhoto,
    }))
    const recruiter= await jobRecruiter.find( ).select("_id userName lastLogin email company.logo").sort({lastLogin: -1}).limit(5).lean();
    const SelectedRecruiter= recruiter.map((data)=>({
        ...data,
        userType: "recruiter",
        image: data.company?.logo,
    }))

    let user= [...SelectedJobSeeker,...SelectedRecruiter];
    user.sort((a,b)=> b.lastLogin - a.lastLogin);
    user=user.slice(0, 5)
    res.json({user,jobPostedCount,recruiterCount,jobSeekerCount })

    }
    catch(error){
        res.status(500).json(error);
    }
    
})

router.get("/jobs",auth("admin"), async (req,res)=>{

    try{
        const jobPostedData = await jobPosted.find().select(" _id role recruiter closingDate createdAt applications._id").populate({
              path: "recruiter",
              select:"userName",
            });

        res.json( jobPostedData);
    }
    catch(error){
        req.status(500).json(error);
    }
})


router.get("/users",auth("admin"),async (req,res)=>{

    try{
    
    const jobSeeker= await jobseeker.find().select("_id userName lastLogin email personalInfo.profilePhoto").lean();
    const SelectedJobSeeker= jobSeeker.map((data)=>({
        ...data,
        userType: "jobSeeker",
        image: data.personalInfo?.profilePhoto,
    }))
    const recruiter= await jobRecruiter.find( ).select("_id userName lastLogin email company.logo").lean();
    const SelectedRecruiter= recruiter.map((data)=>({
        ...data,
        userType: "recruiter",
        image: data.company?.logo,
    }))
    let user= [...SelectedJobSeeker,...SelectedRecruiter];
    user.sort((a, b) => a.userName.localeCompare(b.userName));
    res.json(user);

    }
    catch(error){
        res.status(500).json(error);
    }
    
})

router.get("/jobSeeker",auth("admin"),async (req,res)=>{

    try{
    
    const recruiter= await jobseeker.find().select("_id userName lastLogin email personalInfo.profilePhoto application.total").lean();
    const user= recruiter.map((data)=>({
        ...data,
        image: data.company?.logo,
        AppliedJob: data.application?.total
    }))
    res.json(user);

    }
    catch(error){
        res.status(500).json(error);
    }
    
})

router.get("/recruiter",auth("admin"),async (req,res)=>{

    try{
    const jobSeeker= await jobRecruiter.find( ).select("_id userName lastLogin email company.logo jobPosted").lean();
    const user= jobSeeker.map((data)=>({
        ...data,
        image: data.company?.logo,
        jobPosted: data.jobPosted.length,
    }))
    res.json(user);
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.get("/jobDetails",auth("admin"),async (req,res)=>{
    
    try{
    const jobSeeker= await jobRecruiter.find( ).select("_id userName lastLogin email company.logo jobPosted").lean();
    const user= jobSeeker.map((data)=>({
        ...data,
        image: data.company?.logo,
        jobPosted: data.jobPosted.length,
    }))
    res.json(user);
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports= router;