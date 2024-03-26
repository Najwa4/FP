const EmployeeQuitRequest = require("../models/QuitJob");

// Controller for employee quit request operations
const QuitJobController = {
  // Create a new employee quit request
  createRequest: async (req, res) => {
    const { employeeId, reason } = req.body;

    try {
      const employeeQuitRequest = new EmployeeQuitRequest({
        employee: employeeId,
        reason,
        status: "pending",
      });

      await employeeQuitRequest.save();

      res.send("Employee quit request created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Accept an employee quit request by HR staff
  acceptRequest: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeQuitRequest = await EmployeeQuitRequest.findById(requestId);

      if (!employeeQuitRequest) {
        return res.status(404).send("Employee quit request not found");
      }

      employeeQuitRequest.status = "accepted";
      await employeeQuitRequest.save();

      res.send("Employee quit request accepted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Reject an employee quit request by HR staff
  rejectRequest: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeQuitRequest = await EmployeeQuitRequest.findById(requestId);

      if (!employeeQuitRequest) {
        return res.status(404).send("Employee quit request not found");
      }

      employeeQuitRequest.status = "rejected";
      await employeeQuitRequest.save();

      res.send("Employee quit request rejected successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = QuitJobController;
