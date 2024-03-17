const User = require("../models/User");
const { pickBy } = require("lodash");

// Add user
async function addUser(req, res) {
  try {
    const user = await User.findById(req.user._id);

    // Check if the user has the hr_staff role
    if (user.role !== "hr_staff") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only users with the hr_staff role can add users.",
      });
    }

    const {
      fullName,
      username,
      gender,
      dateOfBirth,
      location,
      phoneNumber,
      emailAddress,
      contactPersonname,
      contactPersonphoneNumber,
      department,
      college,
      position,
      highestLevel,
      university,
      fieldOfStudy,
      graduationDate,
      previousOrganization,
      prevStartDate,
      prevEndDate,
      referencesName,
      referencesPosition,
      referencesOrganization,
      referencesEmail,
      referencesPhone,
      hireDate,
      salary,
      daysOfAbsence,
      skills,
      password,
      role: newRole,
      account_status,
    } = req.body;

    // Check if the provided username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    const newUser = new User({
      fullName,
      username,
      gender,
      dateOfBirth,
      location,
      phoneNumber,
      emailAddress,
      contactPersonname,
      contactPersonphoneNumber,
      department,
      college,
      position,
      highestLevel,
      university,
      fieldOfStudy,
      graduationDate,
      previousOrganization,
      prevStartDate,
      prevEndDate,
      referencesName,
      referencesPosition,
      referencesOrganization,
      referencesEmail,
      referencesPhone,
      hireDate,
      salary,
      daysOfAbsence,
      skills,
      password,
      role: newRole,
      account_status,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
}

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateFields = pickBy(req.body);

    // Assuming the user role is stored in the req.user object
    const { role, college } = req.user;

    // Check if the user has the hr_staff role or belongs to the specific college
    if (
      role === "hr_staff" ||
      (role === "employee" && req.user.college === college)
    ) {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      await User.findByIdAndUpdate(userId, updateFields);
      res.json({ message: "User updated successfully" });
    } else {
      res.status(403).json({
        error: "Access denied. You are not authorized to update this user.",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred. Please try again later." });
  }
};

const findUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.user;

    // Check if the user has the hr_staff or hr_manager role
    if (role === "hr_staff" || role === "hr_manager") {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } else {
      res.status(403).json({
        error: "Access denied. You are not authorized to view this user.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addUser,
  updateUser,
  findUser,
};
