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
        employee: [
          {
            fullName: employee.fullName,
            department: employee.department,
            college: employee.college,
          },
        ],
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

  // Accept an employee quit request by HR staff
  updateStatus: async (req, res) => {
    const { status } = req.body;
    const { requestId } = req.params;

    try {
      const employeeQuitRequest = await EmployeeQuitRequest.findById(requestId);

      if (!employeeQuitRequest) {
        return res.status(404).send("Employee quit request not found");
      }

      if (req.user.role !== "hr_manager") {
        return res
          .status(403)
          .send("You are not authorized to update the status");
      }

      employeeQuitRequest.status = status;

      const updatedQuitJob = await employeeQuitRequest.save();

      if (status === "accept") {
        // Find the user with the same college name and dean role
        const deanUser = await User.findOne({
          role: "dean",
          college: employeeQuitRequest.employee[0].college,
        });

        if (deanUser) {
          // Send an email to the dean
          const emailContent = {
            email: deanUser.emailAddress,
            subject: "Employee Quit Request Accepted",
            text: `Dear ${deanUser.fullName},\n\nThe employee quit request for ${employeeQuitRequest.employee[0].fullName} in the ${employeeQuitRequest.employee[0].department} department has been accepted. Please take appropriate action.\n\nRegards,\nThe HR Team`,
          };

          sendEmail(emailContent, (error) => {
            if (error) {
              // If an error occurs while sending the email, return a 500 Internal Server Error response
              return res.status(500).json({
                success: false,
                message: "An error occurred while sending the email",
                error: error.message,
              });
            }

            // Send a successful response with the updated quit job data and success message
            res.status(200).json({
              success: true,
              message:
                "Quit job status updated successfully. Email sent to dean.",
              data: updatedQuitJob,
            });
          });
        } else {
          return res.status(404).send("Dean user not found");
        }
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
