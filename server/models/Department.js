const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `dep/${Math.floor(1000 + Math.random() * 9000)}`,
  },
  name: {
    type: String,
  },
  departmentHeadID: {
    type: String,
    ref: "User",
  },
  departmentHeadName: {
    type: String,
  },
  employees: [
    {
      _id: {
        type: String,
        ref: "User",
      },
      fullName: {
        type: String,
        ref: "User",
      },
    },
  ],
  numberOfEmployees: {
    type: Number,
    default: 0,
  },
  college: {
    type: String,
    ref: "College",
  },
});

departmentSchema.pre("save", async function (next) {
  const department = this;
  const User = mongoose.model("User");
  try {
    // Find the department head by matching role, department, and college fields
    const departmentHead = await User.findOne({
      role: "head",
      department: department.name,
      college: department.college,
    }).select("_id fullName");

    if (!departmentHead) {
      console.log(
        "No department head found. Saving the department without a head."
      );
    } else {
      department.departmentHeadID = departmentHead._id;
      department.departmentHeadName = departmentHead.fullName;
    }

    // Find employees by matching department fields
    const employees = await User.find({ department: this.name }).select(
      "_id fullName"
    );
    this.employees = employees.map((employee) => ({
      _id: employee._id,
      fullName: employee.fullName,
    }));

    // Find number Of Employees in department
    this.numberOfEmployees = this.employees.length;

    next();
  } catch (error) {
    next(error);
  }
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
