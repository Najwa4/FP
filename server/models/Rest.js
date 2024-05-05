const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
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
  emailAddress: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  durationInDay: {
    type: Number,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected_hr",
      "accepted_college",
      "rejected_college",
    ],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

restSchema.pre("save", async function () {
  const User = require("../models/User");

  try {
    const employees = await User.find({ _id: this.employeeId }).select(
      "_id fullName department college"
    );
    this.employees = employees.map((employee) => ({
      _id: employee._id,
      fullName: employee.fullName,
      department: employee.department,
      college: employee.college,
      emailAddress: employee.emailAddress,
    }));
  } catch (error) {
    console.error(error);
  }
});

// Function to calculate duration in days between two dates
restSchema.methods.setDuration = function () {
  const durationMs = this.endDate - this.startDate;
  this.durationInDay = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
};

const Rest = mongoose.model("Rest", restSchema);

module.exports = Rest;
