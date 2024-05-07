const User = require("../models/User");
const { pickBy } = require("lodash");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

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

    // Use the sendEmail function to send the email
    if (savedUser.emailAddress) {
      await sendEmail({
        email: savedUser.emailAddress,
        subject: "New Account Details",
        text: `Hello ${savedUser.username}!\n\nYour new account has been successfully created.\n\nUsername: ${savedUser.username}\nPassword: ${password}\n\nPlease change the password as soon as possible for security reasons.`,
      });

      console.log("Email sent successfully.");
    } else {
      console.log("Email address is empty. Email not sent.");
    }

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
      const emp = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Check if the updateFields contain the password field and encrypt the new password
      if (updateFields.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updateFields.password, salt);

        updateFields.password = hashedPassword;
      }

      await User.findByIdAndUpdate(userId, updateFields);
      res.json({
        success: true,
        message: "User updated successfully",
        data: emp,
      });
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
    const { role, department } = req.user;
    const user = await User.findById(userId).select("-password");

    // Check if the user has the hr_staff, hr_manager, or department_head role with the same department name
    if (
      role === "hr_staff" ||
      role === "hr_manager" ||
      (role === "head" && department === user.department)
    ) {
      if (!user) {
        return res.json({ error: "User not found" });
      }
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.json({
        error: "Access denied. You are not authorized to find this user.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for an user to view their own profile
const viewProfile = async (req, res) => {
  try {
    // console.log("User ID:", req.user._id); // Print the user ID to the console

    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user profile
    res.json({ success: true, data: user });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Report profile mistake via email
const reportProfileMistake = async (req, res) => {
  try {
    const { _id } = req.user;
    const { mistake } = req.body;

    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email notification
    const emailContent = {
      email: user.emailAddress,
      subject: "Profile Mistake Report",
      text: `User ID: ${_id}\nFull Name: ${user.fullName}\nMistake: ${mistake}`,
    };

    console.log(mistake);

    sendEmail(emailContent, (error) => {
      if (error) {
        // If an error occurs while sending the email, return a 500 Internal Server Error response
        return res.status(500).json({
          success: false,
          message: "Error reporting profile mistake:",
          error: error.message,
        });
      }
      // Send a successful response with the success message
      res.json({
        success: true,
        message: "Profile mistake reported successfully",
      });
    });
    res.json({
      success: true,
      data: mistake,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  addUser,
  updateUser,
  findUser,
  viewProfile,
  reportProfileMistake,
};
