const Applicant = require('../models/User');
const generateToken = require("../utils/generateToken");
const sendEmail = require('../utils/sendEmail');

// Controller function to add a new application
const addApplicant = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dateOfBirth,
      citizenship,
      address,
      contactDetails,
      contactPerson,
      education,
      employmentHistory,
      skills,
      references
    } = req.body;

    const newApplicant = new Applicant({
      fullName,
      gender,
      dateOfBirth,
      citizenship,
      address,
      contactDetails,
      contactPerson,
      education,
      employmentHistory,
      skills,
      references
    });

    const savedApplicant = await newApplicant.save();
    generateToken(res, role, id);

    sendEmail({
      email: contactDetails.emailAddress,
      subject: "You have been accepted for the job!",
      text: "This is in order to inform you that your appplication is accepted, and you come in person and contact as..."
    })

    res.status(201).json({
      success: true,
      message: 'Applicant added successfully',
      data: savedApplicant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the applicant',
      error: error.message
    });
  }
};

// Find applicants by full name, email, or phone number
const findApplicants = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    // Build the query based on the provided search term
    const query = {
      $or: [
        { "fullName.firstName": { $regex: searchTerm, $options: 'i' } },
        { "fullName.middleName": { $regex: searchTerm, $options: 'i' } },
        { "fullName.lastName": { $regex: searchTerm, $options: 'i' } },
        { "contactDetails.emailAddress": { $regex: searchTerm, $options: 'i' } },
        { "contactDetails.phoneNumber": { $regex: searchTerm, $options: 'i' } }
      ]
    };

    // Fetch the matching applicants from the database or any other data source based on the query
    const applicants = await Applicant.find(query);

    if (applicants.length === 0) {
      return res.status(404).json({ error: "No applicants found" });
    }

    // Return the applicant(s) information
    return res.status(200).json({ applicants });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addApplicant,
  findApplicants
};