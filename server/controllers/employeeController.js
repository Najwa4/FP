const Employee = require("../models/User");
const Department = require("../models/Department");

// Controller to add an employee by HR staff
const addEmployee = async (req, res) => {
  try {
    // Create a new employee using the request body
    const employee = new Employee(req.body);

    // Save the employee to the database
    await employee.save();

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the employee" });
  }
};

// Controller to update an employee by HR staff
const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find the employee by their ID and update the fields with the request body
    await Employee.findByIdAndUpdate(employeeId, req.body);

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the employee" });
  }
};

// Controller to find employees by users with college department HR manager and HR staff roles
const findEmployees = async (req, res) => {
  try {
    const hrStaffId = req.params.hrStaffId;
    const employees = await Employee.find({ hrStaffId: hrStaffId });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for an employee to view their own profile
const viewProfile = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find the employee by their ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving the employee profile",
    });
  }
};

// Update the daysOfAbsence for an employee
const updateDaysOfAbsence = async (req, res) => {
  try {
    const { departmentId, employeeId, daysOfAbsence } = req.body;

    // Check if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).send("Department not found");
    }

    // Check if the employee exists in the department
    const employee = await Employee.findOne({
      _id: employeeId,
      department: departmentId,
    });
    if (!employee) {
      return res.status(404).send("Employee not found in the department");
    }

    // Update the daysOfAbsence for the employee
    employee.daysOfAbsence = daysOfAbsence;
    await employee.save();

    res.send("Days of absence updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  addEmployee,
  updateEmployee,
  findEmployees,
  viewProfile,
  updateDaysOfAbsence,
};
