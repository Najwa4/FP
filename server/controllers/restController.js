const EmployeeRestRequest = require("../models/Rest");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Controller for employee rest request operations
const EmployeeRestRequestController = {
  // Create a new employee rest request
  createRequest: async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    const employeeId = req.params.employeeId;
    try {
      const employee = await User.findById(employeeId);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      const employeeRestRequest = new EmployeeRestRequest({
        employeeId: employee._id,
        employee: [
          {
            fullName: employee.fullName,
            department: employee.department,
            college: employee.college,
            emailAddress: employee.emailAddress,
          },
        ],
        startDate,
        endDate,
        reason,
        status: "pending",
      });

      await employeeRestRequest.save();

      res.send("Employee rest request created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Accept or reject an employee rest request by the college
  acceptOrRejectByCollege: async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    const authenticatedUserRole = req.user.role;
    const authenticatedUserCollege = req.user.college;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send("Employee rest request not found");
      }

      // Check if the authenticated user has the dean role and the same department as the rest request
      if (
        authenticatedUserRole !== "dean" ||
        employeeRestRequest.employee[0].college !== authenticatedUserCollege
      ) {
        return res
          .status(403)
          .send("You are not authorized to accept or reject this rest request");
      }

      // Send an email notification to the applicant
      const emailContent = {
        email: employeeRestRequest.employee[0].emailAddress,
        subject: "",
        text: "",
      };

      if (status === "accept") {
        employeeRestRequest.status = "accepted_college";
        await employeeRestRequest.save();

        res.send("Employee rest request accepted by the college successfully");
        emailContent.subject =
          "Rest request accepted for " +
          employeeRestRequest.employee[0].fullName +
          " by " +
          employeeRestRequest.employee[0].college;
        emailContent.text =
          "Dear " +
          employeeRestRequest.employee[0].fullName +
          ",\n\nWe are pleased to inform you that your rest request has been accepted by " +
          employeeRestRequest.employee[0].college +
          " college. It will now be forwarded to the HR office for further processing. If you have any questions or need assistance, please contact the HR office.\n\nBest regards,\nThe " +
          employeeRestRequest.employee[0].college +
          " college Team";
      } else if (status === "reject") {
        employeeRestRequest.status = "rejected_college";
        await employeeRestRequest.save();

        res.send("Employee rest request rejected by the college successfully");
        emailContent.subject =
          "Update on your rest request from " +
          employeeRestRequest.employee[0].college;
        emailContent.text =
          "Dear " +
          employeeRestRequest.employee[0].fullName +
          ",\n\nWe regret to inform you that your rest request from " +
          employeeRestRequest.employee[0].college +
          " college has been rejected. If you have any concerns or require additional information, please reach out to the HR office for further assistance.\n\nSincerely,\nThe " +
          employeeRestRequest.employee[0].college +
          " college Team";
      } else {
        res.status(400).send("Invalid action");
      }

      sendEmail(emailContent, (error) => {
        if (error) {
          // If an error occurs while sending the email, return a 500 Internal Server Error response
          return res.status(500).json({
            success: false,
            message: "An error occurred while sending the email",
            error: error.message,
          });
        }
        // Send a successful response with the updated applicant data and success message
        res.status(200).json({
          success: true,
          message: "Applicant status updated successfully. Email sent.",
          data: updatedApplicant,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // // Pass an accepted employee rest request from the college to HR staff
  // passToHR: async (req, res) => {
  //   const { requestId } = req.params;

  //   try {
  //     const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

  //     if (!employeeRestRequest) {
  //       return res.status(404).send("Employee rest request not found");
  //     }

  //     if (employeeRestRequest.status !== "accepted_college") {
  //       return res
  //         .status(400)
  //         .send(
  //           "Employee rest request must be accepted by the college before passing to HR"
  //         );
  //     }

  //     employeeRestRequest.status = "hr_review";
  //     await employeeRestRequest.save();

  //     res.send("Employee rest request passed to HR staff successfully");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Internal server error");
  //   }
  // },

  // Retrieve all accepted_college requests for HR staff
  getAcceptedCollegeRequests: async (req, res) => {
    try {
      const authenticatedUserRole = req.user.role;
      // Check if the authenticated user has the HR staff role
      if (authenticatedUserRole !== "hr_staff") {
        return res.status(403).send("You are not authorized");
      }

      const acceptedCollegeRequests = await EmployeeRestRequest.find({
        status: "accepted_college",
      });

      res.json(acceptedCollegeRequests);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to retrieve accepted_college requests");
    }
  },

  // Accept or reject an employee rest request by HR staff
  acceptOrRejectByHr: async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    const authenticatedUserRole = req.user.role;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send("Employee rest request not found");
      }

      // Check if the authenticated user has the HR staff role
      if (authenticatedUserRole !== "hr_staff") {
        return res
          .status(403)
          .send("You are not authorized to process employee rest requests");
      }

      // Send an email notification to the applicant
      const emailContent = {
        email: employeeRestRequest.employee[0].emailAddress,
        subject: "",
        text: "",
      };

      if (status === "accept") {
        employeeRestRequest.status = "approved";
        await employeeRestRequest.save();

        res.send("Employee rest request accepted by HR staff successfully");
        emailContent.subject =
          "Rest request accepted for " +
          employeeRestRequest.employee[0].fullName +
          " by HR";
        emailContent.text =
          "Dear " +
          employeeRestRequest.employee[0].fullName +
          ",\n\nWe are pleased to inform you that your rest request has been accepted by the HR department. It has been approved for further processing. If you have any questions or need assistance, please contact the HR office.\n\nBest regards,\nThe HR Department";
      } else if (status === "reject") {
        employeeRestRequest.status = "rejected_hr";
        await employeeRestRequest.save();

        res.send("Employee rest request rejected by HR staff successfully");
        emailContent.subject = "Update on your rest request from HR";
        emailContent.text =
          "Dear " +
          employeeRestRequest.employee[0].fullName +
          ",\n\nWe regret to inform you that your rest request has been rejected by the HR department. If you have any concerns or require additional information, please reach out to the HR office for further assistance.\n\nSincerely,\nThe HR Department";
      } else {
        res.status(400).send("Invalid action");
      }

      sendEmail(emailContent, (error) => {
        if (error) {
          // If an error occurs while sending the email, return a 500 Internal Server Error response
          return res.status(500).json({
            success: false,
            message: "An error occurred while sending the email",
            error: error.message,
          });
        }
        // Send a successful response with the success message
        res.status(200).json({
          success: true,
          message:
            "Employee rest request status updated successfully. Email sent.",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = EmployeeRestRequestController;
