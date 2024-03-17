const Announcement = require("../models/announcement");

// Create new employee request
const createEmployeeRequest = async (req, res) => {
  try {
    const { department, position, jobDescription, jobRequirements } = req.body;
    const announcement = new Announcement({
      department,
      position,
      jobDescription,
      jobRequirements,
    });
    await announcement.save();
    res.json({ message: "Employee request created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Accept or reject an announcement
const acceptRejectAnnouncement = async (req, res) => {
  const { announcementId, status } = req.body;

  try {
    // Find the announcement by ID
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).send("Announcement not found");
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

// Get accepted announcements
const getAcceptedAnnouncements = async (req, res) => {
  try {
    const acceptedAnnouncements = await Announcement.find({
      status: "accepted",
    });
    res.json(acceptedAnnouncements);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get rejected announcements
const getRejectedAnnouncements = async (req, res) => {
  try {
    const rejectedAnnouncements = await Announcement.find({
      status: "rejected",
    });
    res.json(rejectedAnnouncements);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Find announcement
const findAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/!_____________________________________________________________________________________!/;
// Update an announcement
const updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { department, position, jobDescription, jobRequirements, status } =
      req.body;

    const updateFields = {};
    if (department) updateFields.department = department;
    if (position) updateFields.jobTitle = position;
    if (jobDescription) updateFields.jobDescription = jobDescription;
    if (jobRequirements) updateFields.jobRequirements = jobRequirements;

    let updatedAnnouncement;

    // Update announcement for HR manager
    if (req.user.role === "hr_manager") {
      if (status) updateFields.status = status; // Only HR manager can update status
      updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        { $set: updateFields },
        { new: true }
      );
    } else {
      updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        updateFields,
        { new: true }
      );
    }

    if (!updatedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json({
      message: "Announcement updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/!________________________________________________________________________________________________________!/;

module.exports = {
  createEmployeeRequest,
  getAllAnnouncements,
  getAcceptedAnnouncements,
  getRejectedAnnouncements,
  findAnnouncement,
  updateAnnouncement,
};
