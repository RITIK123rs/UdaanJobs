const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  jobPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobPosted",
      }
    ],
  company: {
    name: {
      type: String,
    },
    logo:{
      type: String,
    },
    logoPublicId:{
      type: String,
    },
    about: {
      type: String,
    },
    founded:{
      type: Date,
    },
    employees:{
      type: String,
    },
    location:{
      type: String,
    },
    industry:{
      type: String,
    },
    contact: {
      emailId: {
        type: String,
      },
      twitter:{
        type: String,
      },
      facebook:{
        type: String,
      },
      linkedin:{
        type: String,
      },
      website:{
        type: String,
      },
    },
  },

});

module.exports = mongoose.model("recruiter", recruiterSchema);
