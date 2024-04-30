const Announcement = require("../models/announcement");

// Create new employee request
const createEmployeeRequest = async (req, res) => {
  try {
    const { position, jobDescription, jobRequirements } = req.body;
    const { role, department } = req.user;

    // Check if the user is a head or if the department matches the requester's department
    if (role !== "head" && department !== department) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const announcement = new Announcement({
      department,
      position,
      jobDescription,
      jobRequirements,
      testDay: null,
    });
    await announcement.save();
    res.json({ message: "Employee request created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Accept or reject an announcement
const acceptRejectAnnouncement = async (req, res) => {
  const { status } = req.body;
  const announcementId = req.params.announcementId;

  try {
    // Check if user role is "dean"
    if (req.user.role !== "hr_manager") {
      return res.json({
        error:
          "Access denied. Only users with the 'hr manager' role can perform this action.",
      });
    }

    // Find the announcement by ID
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.send("Announcement not found");
    }

    // Update the announcement status based on the provided status (accept or reject)
    announcement.status = status;
    await announcement.save();

    res.send("Announcement status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Get stateless announcements
const getStatelessAnnouncements = async (req, res) => {
  try {
    const { role } = req.user;

    // Check if the user is HR staff or HR manager
    if (role !== "hr_manager") {
      return res.json({ error: "Unauthorized access" });
    }

    const statelessAnnouncements = await Announcement.find({
      status: "stateless",
    });
    res.json({ success: true, data: statelessAnnouncements });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get accepted announcements
const getAcceptedAnnouncements = async (req, res) => {
  try {
    const acceptedAnnouncements = await Announcement.find({
      status: "accepted",
    });
    res.json({ success: true, data: acceptedAnnouncements });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get rejected announcements
const getRejectedAnnouncements = async (req, res) => {
  try {
    const { role } = req.user;

    // Check if the user is HR staff or HR manager
    if (role !== "hr_staff" && role !== "hr_manager") {
      return res.json({ error: "Unauthorized access" });
    }

    const rejectedAnnouncements = await Announcement.find({
      status: "rejected",
    });
    res.json({ success: true, data: rejectedAnnouncements });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Find announcement
const findAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;

    // Check if announcementId is provided
    if (!announcementId) {
      return res.status(400).json({ error: "No announcement ID provided" });
    }

    // Find the announcement by ID
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an announcement
const updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { position, jobDescription, jobRequirements, status } = req.body;

    const updateFields = {};
    if (position) updateFields.position = position;
    if (jobDescription) updateFields.jobDescription = jobDescription;
    if (jobRequirements) updateFields.jobRequirements = jobRequirements;

    let updatedAnnouncement;

    // Check if user role is HR manager, HR staff, or head
    if (
      req.user.role === "hr_manager" ||
      req.user.role === "hr_staff" ||
      req.user.role === "head"
    ) {
      // Only HR manager, HR staff, or head can update status
      if (
        (req.user.role === "hr_manager" || req.user.role === "head") &&
        status
      ) {
        updateFields.status = status;
      } else if (req.user.role === "hr_staff" && status) {
        return res.status(403).json({
          error:
            "Access denied. Only HR manager or head can update the status.",
        });
      }

      // Check if the announcement exists
      updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        { $set: updateFields },
        { new: true }
      );

      if (!updatedAnnouncement) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      res.json({
        message: "Announcement updated successfully",
        announcement: updatedAnnouncement,
      });
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTestDay = async (req, res) => {
  try {
    const { testDay } = req.body;
    const _id = req.params.announcementId;

    // Check if the user making the request is an HR staff
    if (req.user.role !== "hr_staff") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only HR staff can update the test day.",
      });
    }

    // Find the announcement by ID
    const announcement = await Announcement.findById(_id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    // Update the testDay field of the announcement
    announcement.testDay = testDay;
    await announcement.save();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Test day updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the test day",
      error: error.message,
    });
  }
};

module.exports = {
  createEmployeeRequest,
  getAllAnnouncements,
  acceptRejectAnnouncement,
  getStatelessAnnouncements,
  getAcceptedAnnouncements,
  getRejectedAnnouncements,
  findAnnouncement,
  updateAnnouncement,
  updateTestDay,
};
