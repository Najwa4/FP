const mongoose = require("mongoose");

const quitJobSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    ref: "User",
  },
  employee: [
    {
      fullName: {
        type: String,
      },
      college: {
        type: String,
      },
      department: {
        type: String,
      },
    },
  ],

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

quitJobSchema.pre("save", async function () {
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
    }));
  } catch (error) {
    console.error(error);
  }
});

const QuitJob = mongoose.model("QuitJob", quitJobSchema);

module.exports = QuitJob;
