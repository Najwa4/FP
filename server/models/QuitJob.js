const mongoose = require("mongoose");

const quitJobSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    ref: "User",
  },

  fullName: {
    type: String,
  },
  college: {
    type: String,
  },
  department: {
    type: String,
  },

  resignationDate: {
    type: Date,
  },
  reason: {
    type: String,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["accept", "reject", "pending"],
    default: "pending",
  },
});

const QuitJob = mongoose.model("QuitJob", quitJobSchema);

module.exports = QuitJob;
