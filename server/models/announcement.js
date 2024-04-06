const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  position: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  jobRequirements: {
    type: String,
  },
  status: {
    type: String,
    enum: ["stateless", "accepted", "rejected"],
    default: "stateless",
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  appliedJob: {
    type: String,
    unique: true,
  },
  testDay: {
    type: Date,
  },
});

const Announcement = mongoose.model("announcement", announcementSchema);

module.exports = Announcement;
