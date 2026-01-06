const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jobSeeker = require("../database/jobseekerModel");
const jobRecruiter = require("../database/recruiterModel");
const jwt = require("jsonwebtoken");


router.get("/",(req,res)=>{
    try{
            console.log(req.body);
            const token = req.headers.authorization.split(" ")[1];
            if(!token) return res.status(401).json({isLogin: false});
            const decode= jwt.verify(token, process.env.SECRET_KEY);
            if(!decode) return res.status(401).json({isLogin: false});
            console.log(decode);
            return res.json({isLogin: true, userType: decode.userType })
        }
        catch(error){
            return res.status(500).json("homePage error :-",error);
        }
})


module.exports = router;