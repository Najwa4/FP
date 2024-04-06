const EmployeeQuitRequest = require("../models/QuitJob");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Controller for employee quit request operations
const QuitJobController = {
  // Create a new employee quit request
  createRequest: async (req, res) => {
    const { reason } = req.body;
    const { employeeId } = req.params;

    try {
      const employee = await User.findById(employeeId);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      const employeeQuitRequest = new EmployeeQuitRequest({
        employeeId: employee._id,

        fullName: employee.fullName,
        department: employee.department,
        college: employee.college,

        resignationDate: new Date(),
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

  // Find all quit job requests
  findAllRequests: async (req, res) => {
    try {
      // Find all quit job requests
      const quitJobRequests = await EmployeeQuitRequest.find();

      // Send response with the quit job requests
      res.status(200).json({
        success: true,
        data: quitJobRequests,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Accept or reject an employee quit request by HR manager
  updateStatus: async (req, res) => {
    const { status } = req.body;
    const { requestId } = req.params;

    try {
      const employeeQuitRequest = await EmployeeQuitRequest.findById(requestId);

      if (!employeeQuitRequest) {
        return res.status(404).send("Employee quit request not found");
      }

      if (req.user.role !== "hr_manager") {
        return res.send("You are not authorized to update the status");
      }

      // Check if the status is already "accept" or "reject"
      if (employeeQuitRequest.status !== "pending") {
        return res.send("Quit job request status cannot be updated further");
      }

      employeeQuitRequest.status = status;

      const updatedQuitJob = await employeeQuitRequest.save();

      // Find the user who submitted the quit request
      const employeeUser = await User.findById(employeeQuitRequest.employeeId);

      if (status === "accept") {
        // Find the user with the same college name and dean role
        const deanUser = await User.findOne({
          role: "dean",
          college: employeeQuitRequest.college,
        });

        console.log(employeeUser);
        if (deanUser) {
          // Send an email to the dean
          const deanEmailContent = {
            email: deanUser.emailAddress,
            subject: "Employee Quit Request Accepted",
            text: `Dear ${deanUser.fullName},\n\nThe employee quit request for ${employeeQuitRequest.fullName} in the ${employeeQuitRequest.department} department has been accepted. Please take appropriate action.\n\nRegards,\nThe HR Team`,
          };

          sendEmail(deanEmailContent, (error) => {
            if (error) {
              // If an error occurs while sending the email, return a 500 Internal Server Error response
              return res.status(500).json({
                success: false,
                message: "An error occurred while sending the email",
                error: error.message,
              });
            }
          });
        } else {
          return res.send("Dean user not found");
        }

        if (employeeUser) {
          // Send an email to the employee
          const employeeEmailContent = {
            email: employeeUser.emailAddress,
            subject: "Quit Request Accepted",
            text: `Dear ${employeeUser.fullName},\n\nYour quit request in the ${employeeQuitRequest.department} department has been accepted. Please contact the HR department for further information.\n\nRegards,\nThe HR Team`,
          };

          sendEmail(employeeEmailContent, (error) => {
            if (error) {
              // If an error occurs while sending the email, return a 500 Internal Server Error response
              return res.status(500).json({
                success: false,
                message: "An error occurred while sending the email",
                error: error.message,
              });
            }
          });
        } else {
          return res.send("Employee user not found");
        }

        // Send a successful response with the updated quit job data and success message
        res.status(200).json({
          success: true,
          message:
            "Quit job status updated successfully. Emails sent to dean and employee.",
          data: updatedQuitJob,
        });
      } else if (status === "reject") {
        if (employeeUser) {
          // Send an email to the employee
          const employeeEmailContent = {
            email: employeeUser.emailAddress,
            subject: "Quit Request Rejected",
            text: `Dear ${employeeUser.fullName},\n\nYour quit request in the ${employeeQuitRequest.department} department has been rejected. Please contact the HR department for further information.\n\nRegards,\nThe HR Team`,
          };

          sendEmail(employeeEmailContent, (error) => {
            if (error) {
              // If an error occurs while sending the email, return a 500 Internal Server Error response
              return res.status(500).json({
                success: false,
                message: "An error occurred while sending the email",
                error: error.message,
              });
            }
          });
        } else {
          return res.send("Employee user not found");
        }

        // Send a successful response with the updated quit job data and success message
        res.status(200).json({
          success: true,
          message:
            "Quit job status updated successfully. Email sent to employee.",
          data: updatedQuitJob,
        });
      } else {
        // Send a response with the updated quit job data
        res.json(updatedQuitJob);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = QuitJobController;
