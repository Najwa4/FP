const Department = require("../models/Department");

// Add Department
async function addDepartment(req, res) {
  try {
    const { name, departmentHeadID, college, employeesID } = req.body;

    // Check if the user is HR staff
    if (req.user.role !== "hr_staff") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Check if a department with the same name already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res
        .status(409)
        .json({ error: "A department with the same name already exists" });
    }

    const department = new Department({
      name,
      departmentHeadID,
      college,
      employeesID,
    });

    await department.save();

    res.status(200).json({ message: "Department added successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while adding the department: ${error.message}`,
    });
  }
}

module.exports = { addDepartment };
