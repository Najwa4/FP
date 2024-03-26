const Applicant = require("../models/User");
const Announcement = require("../models/announcement");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// Controller function to add a new application
const addApplicant = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;

    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    const {
      fullName,
      gender,
      dateOfBirth,
      citizenship,
      address,
      emailAddress,
      phoneNumber,
      contactPerson,
      education,
      employmentHistory,
      skills,
      references,
    } = req.body;

    const newApplicant = new Applicant({
      fullName,
      gender,
      dateOfBirth,
      citizenship,
      address,
      emailAddress,
      phoneNumber,
      contactPerson,
      education,
      employmentHistory,
      skills,
      references,
      announcementId,
      role: "applicant",
    });

    const savedApplicant = await newApplicant.save();

    res.status(201).json({
      success: true,
      message: "Applicant added successfully",
      data: savedApplicant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the applicant",
      error: error.message,
    });
  }
};

// Find applicants by full name, email, or phone number
const findApplicants = async (req, res) => {
  try {
    const { fullName, emailAddress, phoneNumber } = req.body;

    // Check if the user making the request is an HR staff or HR manager
    if (req.user.role !== "hr_staff" && req.user.role !== "hr_manager") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only HR staff and HR managers can find applicants.",
      });
    }

    // Create the query object
    const query = {
      role: "applicant",
      $or: [],
    };

    // Push matching fields to the query object
    if (fullName) query.$or.push({ fullName: fullName });
    if (emailAddress) query.$or.push({ emailAddress: emailAddress });
    if (phoneNumber) query.$or.push({ phoneNumber: phoneNumber });

    // Find applicants with the role of "applicant" and matching fullName, emailAddress, or phoneNumber
    const applicants = await Applicant.find(query);

    if (applicants.length === 0) {
      return res.status(404).json({ error: "No applicants found" });
    }

    // Return the matching applicants
    return res.status(200).json({ applicants });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

// update applicant status only by HR staff
const updateApplicantStatus = async (req, res) => {
  try {
    const { id, Applicant_status } = req.body; // Get the applicant ID and updated status from the request body

    // Check if the user making the request is an HR staff
    if (req.user.role !== "hr_staff") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only HR staff can update the applicant status.",
      });
    }

    // Find the announcement in the database using the provided announcement ID
    const announcementId = req.params.announcementId;

    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    // Find the applicant within the announcement using the provided applicant ID
    const applicantId = req.params.id;

    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    // Update the applicant's status with the provided value and save it
    applicant.Applicant_status = Applicant_status;
    const updatedApplicant = await applicant.save();

    // Send an email notification to the applicant
    const emailContent = {
      email: applicant.emailAddress,
      subject: "",
      text: "",
    };

    if (Applicant_status === "accepted") {
      emailContent.subject =
        "Congratulations! You have been accepted for the job!";
      emailContent.text = `This is to inform you that your application has been accepted. Your test is scheduled for ${announcement.testDay}. Please come in person and contact us for further details.`;
    } else if (Applicant_status === "rejected") {
      emailContent.subject = "Update on your job application";
      emailContent.text =
        "We regret to inform you that your application has been rejected. Thank you for your interest.";
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the applicant status",
      error: error.message,
    });
  }
};

module.exports = {
  addApplicant,
  findApplicants,
  updateApplicantStatus,
};
