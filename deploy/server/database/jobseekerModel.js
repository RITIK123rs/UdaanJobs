const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  lastLogin: {
    type: Date,
    require: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  application: {
    total: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 },
    rejected: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    appliedJobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "jobPosted",
        },
        appliedAt: { type: Date },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  personalInfo: {
    jobTitle: { type: String },
    city: { type: String },
    phone: { type: String },
    email: { type: String },
    languages: { type: String },
    resume: { type: String },
    resumePublicId:{type: String },
    profilePhoto: { type: String },
    profilePhotoPublicId: { type: String },
    banner: {type: String},
    bannerPublicId: {type: String},
    aboutMe: { type: String },
    skills: [{ type: String }],
    instagram: { type: String },
    twitter: { type: String },
    website: { type: String },
    experience: [
      {
        jobTitle: { type: String },
        companyName: { type: String },
        city: { type: String },
        jobType: {
          type: String,
          enum: ["remote", "full-time", "part-time", "internship"],
        },
        jobPeriod: { type: String },
        details: { type: String },
      },
    ],
    education: [
      {
        institute: { type: String },
        year: { type: String },
        degree: { type: String },
        city: { type: String },
        details: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("jobSeeker", jobSeekerSchema);
