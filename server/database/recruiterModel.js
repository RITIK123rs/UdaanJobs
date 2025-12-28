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
  company: {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    contact: {
      number: {
        type: String,
      },
      emailId: {
        type: String,
      },
    },
  },
  jobposted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobPosted",
    },
  ],
});

module.exports = mongoose.model("recruiter", recruiterSchema);
