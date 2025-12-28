const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jobseeker = require("../database/jobseekerModel");

const UserId="694ff2356935a1966a095606";

const uploadFolder = path.join(__dirname, "../upload");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.put(
  "/jobseeker",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // console.log("Files:", req.files);

      const resumeURL = req.files?.resume?.[0]?.filename || null ;
      const profilePhotoURL = req.files?.profilePhoto?.[0]?.filename || null;
      const bannerURL = req.files?.banner?.[0]?.filename || null;

      // console.log({ resumeURL, profilePhotoURL, bannerURL });

      const prevData = await jobseeker.findById(UserId);

      const updateObj = {};

      if (resumeURL) {
        const prevResume = prevData?.personalInfo?.resume;
        console.log({prevResume});
        if (prevResume) {
          const oldFilePath = path.join(uploadFolder, prevResume);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
        updateObj["personalInfo.resume"] = resumeURL;
      }

      if (profilePhotoURL) {
        const prevProfilePhoto = prevData?.personalInfo?.profilePhoto;
        console.log({prevProfilePhoto});
        if (prevProfilePhoto) {
          const oldFilePath = path.join(uploadFolder, prevProfilePhoto);
          console.log("Old file path:", oldFilePath);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
          console.log("Exists?", fs.existsSync(oldFilePath));
          
        }
        updateObj["personalInfo.profilePhoto"] = profilePhotoURL;
      }

      if (bannerURL) {
        const prevBanner = prevData?.personalInfo?.banner;
        console.log({prevBanner});
        if (prevBanner) {
          const oldFilePath = path.join(uploadFolder, prevBanner);
          console.log("Old file path:", oldFilePath);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
           console.log("Exists?", fs.existsSync(oldFilePath));
        }
        updateObj["personalInfo.banner"] = bannerURL;
      }

      const updateData = await jobseeker.findByIdAndUpdate(
        UserId,
        { $set: updateObj },
        { new: true }
      );

      res.json("Files are successfully uploaded");
      // console.log("Updated Data:", updateData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
