const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const jobseeker = require("../database/jobseekerModel");
const jobRecruiter = require("../database/recruiterModel");
const auth = require("./auth");

console.log("Configuring Cloudinary...");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Setting up multer memory storage...");
const storage = multer.memoryStorage();
const upload = multer({ storage });


const uploadToCloudinary = (buffer, folder, fieldname, mimetype) =>
  new Promise((resolve, reject) => {
    const isPDF = mimetype === "application/pdf";

    console.log(`Uploading ${fieldname} (${isPDF ? "PDF" : "MEDIA"})...`);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isPDF ? "raw" : "image",
        public_id: `${fieldname}-${Date.now()}`,
      },
      (err, result) => {
        if (err) {
          console.error(`Error uploading ${fieldname}:`, err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });



const deleteFromCloudinary = async (publicId, type = "image") => {
  if (!publicId) {
    // console.log("No publicId provided, skipping deletion.");
    return;
  }
  try {
    // console.log("Deleting from Cloudinary:", publicId, "as type:", type);
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: type });
    // console.log("Delete result:", result);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};


router.put(
  "/jobSeeker",
  auth("jobSeeker"),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // console.log("Incoming JobSeeker request");
      // console.log("req.user:", req.user);
      // console.log("req.files:", req.files);
      // console.log("req.body:", req.body);

      const typeMap = {
  resume: "raw",
  profilePhoto: "image",
  banner: "image",
};

      const userId = req.user.userId;
      const prevData = await jobseeker.findById(userId);
      console.log("Previous data fetched:", prevData);

      const updateObj = {};

      for (const field of ["resume", "profilePhoto", "banner"]) {
        if (req.files[field]?.[0]) {
          const file = req.files[field][0];
          // console.log(`Processing field: ${field}, filename: ${file.originalname}`);
          const result = await uploadToCloudinary(file.buffer, `udaanjobs_uploads/${field}`, field);
          // console.log(`Deleting old ${field} from Cloudinary if exists...`);
          await deleteFromCloudinary(prevData?.personalInfo?.[`${field}PublicId`],typeMap[field]);
          updateObj[`personalInfo.${field}`] = result.secure_url;
          updateObj[`personalInfo.${field}PublicId`] = result.public_id;
        } else {
          console.log(`No file uploaded for field: ${field}`);
        }
      }

      // console.log("Update object to save:", updateObj);
      const updatedData = await jobseeker.findByIdAndUpdate(userId, { $set: updateObj }, { new: true });
      // console.log("Updated JobSeeker data:", updatedData);

      res.json("Job seeker files updated successfully");
    } catch (err) {
      console.error("Error in /jobSeeker route:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

router.put(
  "/recruiter",
  auth("recruiter"),
  upload.single("logo"),
  async (req, res) => {
    try {
      // console.log("Incoming Recruiter request");
      // console.log("req.user:", req.user);
      // console.log("req.files:", req.file);
      // console.log("req.body:", req.body);

      const userId = req.user.userId;
      const prevData = await jobRecruiter.findById(userId);
      // console.log("Previous recruiter data fetched:", prevData);

      const data = req.body;
      if (data.contact && typeof data.contact === "string") data.contact = JSON.parse(data.contact);

      if (req.file) {
        // console.log("Uploading recruiter logo...");
        const result = await uploadToCloudinary(req.file.buffer, "udaanjobs_uploads/logo", "logo");
        // console.log("Deleting old logo if exists...");
        await deleteFromCloudinary(prevData?.company?.logoPublicId);

        data.logo = result.secure_url;
        data.logoPublicId = result.public_id;
      } else {
        console.log("No recruiter logo uploaded.");
      }

      const updatedData = await jobRecruiter.findByIdAndUpdate(userId, { $set: { company: data } }, { new: true });
      // console.log("Updated recruiter data:", updatedData);

      res.json("Recruiter company updated successfully");
    } catch (err) {
      console.error("Error in /recruiter route:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
