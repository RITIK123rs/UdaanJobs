const mongoose = require("mongoose");

const jobPostedSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recruiter",
  },
  role: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["remote", "full-time", "part-time", "internship"],
    default: "full-time",
  },
  industryType: {
    type: String
  },
  education: {
    type: String
  },
  experience: {
    type: String,
    enum: ["fresher", "1-3", "3-5", "5+"],
    default: "fresher",
  },
  location: {
    type: String
  },
  workMode: {
    type: String,
    enum: ["Remote", "Onsite", "Hybrid"],
    default: "Onsite",
  },
  closingDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: String
  },
  jobDescription: {
    type: String,
  },
  skillsRequired: [
    {
      type: String
    }
  ],
  roleAndResponsibilities: {
    type: String,
  },
  applications: [
    {
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobSeeker",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
      },
      appliedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
},);

module.exports = mongoose.model("jobPosted", jobPostedSchema);
