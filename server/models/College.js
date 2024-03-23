const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `col/${Math.floor(1000 + Math.random() * 9000)}`,
  },
  name: {
    type: String,
  },
  collegeDeanID: {
    type: String,
    ref: "User",
  },
  collegeDeanName: {
    type: String,
  },
  departments: [
    {
      _id: {
        type: String,
        ref: "Department",
      },
      name: {
        type: String,
      },
    },
  ],
  numberOfDepartments: {
    type: Number,
    default: 0,
  },
});

collegeSchema.pre("save", async function (next) {
  const college = this;

  // Find the dean user with matching _id
  const dean = await mongoose.model("User").findOne({
    _id: college.collegeDeanID,
  });

  if (dean) {
    college.collegeDeanName = dean.fullName;
  }

  // Retrieve departments with the same name as the college
  const departments = await mongoose
    .model("Department")
    .find({ college: college.name });

  college.departments = departments.map((department) => ({
    _id: department._id,
    name: department.name,
  }));
  college.numberOfDepartments = departments.length;

  console.log(college.numberOfDepartments);

  next();
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
