const College = require("../models/College");
const User = require("../models/User");

// Add College
async function addCollege(req, res) {
  try {
    const { name, collegeDeanID } = req.body;

    // Check if the user is HR staff
    if (req.user.role !== "hr_staff") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Check if a college with the same name already exists
    const existingCollege = await College.findOne({ name });
    if (existingCollege) {
      return res
        .status(400)
        .json({ error: "A college with the same name already exists" });
    }

    // Check if the collegeDeanID refers to a user with the dean role
    const dean = await User.findOne({ _id: collegeDeanID, role: "dean" });
    if (!dean) {
      return res.status(400).json({
        error:
          "The provided college Dean ID is not valid or does not refer to a user with the dean role",
      });
    }

    // Check if the dean is already assigned as a dean for another college
    const existingDeanCollege = await College.findOne({ collegeDeanID });
    if (existingDeanCollege) {
      return res.status(400).json({
        error:
          "The provided dean is already assigned as a dean for another college",
      });
    }

    const college = new College({
      name,
      collegeDeanID,
    });

    await college.save();

    res.status(200).json({ message: "College added successfully" });
  } catch (error) {
    console.error("Error adding college:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the college" });
  }
}

module.exports = { addCollege };
