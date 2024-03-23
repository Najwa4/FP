const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `nsr/${Math.floor(1000 + Math.random() * 9000)}`,
    },
    fullName: {
      type: String,
    },
    username: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    contactPersonname: {
      type: String,
    },
    contactPersonphoneNumber: {
      type: String,
    },
    position: {
      type: String,
    },
    highestLevel: {
      type: String,
    },
    university: {
      type: String,
    },
    fieldOfStudy: {
      type: String,
    },
    graduationDate: {
      type: Date,
    },
    previousOrganization: {
      type: String,
    },
    prevStartDate: {
      type: Date,
    },
    prevEndDate: {
      type: Date,
    },
    referencesName: {
      type: String,
    },
    referencesPosition: {
      type: String,
    },
    referencesOrganization: {
      type: String,
    },
    referencesEmail: {
      type: String,
    },
    referencesPhone: {
      type: String,
    },
    hireDate: {
      type: Date,
    },
    salary: {
      type: Number,
    },
    daysOfAbsence: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["employee", "hr_manager", "hr_staff", "head", "dean"],
      default: "employee",
    },
    applicantState: {
      type: String,
      enum: ["reject", "accept", "unfiltered"],
    },
    account_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    department: {
      type: String,
    },
    college: {
      type: String,
    },
    // numberOfDepartmentsInCol: {
    //   type: Number,
    //   default: function () {
    //     return this.departments.length;
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

// Method to set fullName from first name, middle name, and last name
userSchema.methods.setFullName = function (firstName, middleName, lastName) {
  this.fullName = `${firstName} ${
    middleName ? middleName + " " : ""
  }${lastName}`;
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
