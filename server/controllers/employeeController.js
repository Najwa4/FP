const Employee = require("../models/User");

// Controller to find employees by users with college department HR manager and HR staff roles
const findEmployees = async (req, res) => {
  try {
    const requestingUserRole = req.user.role;
    const requestingDepartment = req.user.department;
    const requestingCollege = req.user.college;

    let employees = [];

    if (
      requestingUserRole === "hr_staff" ||
      requestingUserRole === "hr_manager"
    ) {
      // For HR staff and HR managers, retrieve all users
      employees = await Employee.find({ role: { $ne: "applicant" } }).select(
        "-password"
      );
    } else if (requestingUserRole === "dean") {
      // For deans, retrieve users from the same college
      employees = await Employee.find({ college: requestingCollege }).select(
        "-password"
      );
    } else if (requestingUserRole === "head") {
      // For heads of the department, retrieve users from the same department
      employees = await Employee.find({
        department: requestingDepartment,
      }).select("-password");
    } else {
      // Unauthorized access
      return res.json({ message: "Access denied. You are not authorized" });
    }

    res.json({ success: true, data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update the daysOfAbsence for an employee
const updateDaysOfAbsence = async (req, res) => {
  try {
    const { daysOfAbsence } = req.body;
    const { role, department, college } = req.user;
    const _id = req.params.employeeId;

    // Fetch the employee's information using the provided ID
    const employee = await Employee.findById(_id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Check if the user is a department head
    if (
      role !== "head" ||
      department !== employee.department ||
      college !== employee.college
    ) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Update the daysOfAbsence field
    employee.daysOfAbsence.push(daysOfAbsence);
    await employee.save();

    res.json({
      message: "Days of absence updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  findEmployees,
  updateDaysOfAbsence,
};
