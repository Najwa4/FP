const { body, validationResult } = require("express-validator");
const validatePhoneNumber = require("validate-phone-number-node-js");

const registrationValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 25 })
    .withMessage("Full Name must be between 4 and 25 characters"),
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .custom((value) => {
      const isValidPhoneNumber = validatePhoneNumber.validate(value);
      if (!isValidPhoneNumber) {
        throw new Error("Please enter a valid phone number");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters long"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email address"),
];

const resetPasswordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters long"),
];


const applicantValidation = [
  body("fullName")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full Name must only contain letters and spaces"),
  body("gender")
    .trim()
    .isLength({ max: 6 })
    .withMessage("Gender must not exceed 6 characters"),
  body("dateOfBirth.day")
    .trim()
    .isInt({ min: 1, max: 31 })
    .withMessage("Invalid day of birth"),
  body("dateOfBirth.month")
    .trim()
    .isInt({ min: 1, max: 12 })
    .withMessage("Invalid month of birth"),
  body("dateOfBirth.year")
    .trim()
    .isInt({ max: new Date().getFullYear() })
    .withMessage("Invalid year of birth"),
  body()
    .custom((value, { req }) => {
      const { day, month, year } = req.body.dateOfBirth;
      const currentDate = new Date();
      const inputDate = new Date(year, month - 1, day);
      if (inputDate > currentDate) {
        throw new Error("Date of birth cannot be in the future");
      }
      return true;
    }),
  body("citizenship")
    .trim()
    .notEmpty()
    .withMessage("Citizenship is required"),
  body("address")
    .isObject()
    .withMessage("Invalid address format"),
  body("address.region")
    .trim()
    .notEmpty()
    .withMessage("Region is required"),
  body("address.woreda")
    .trim()
    .notEmpty()
    .withMessage("Woreda is required"),
  body("address.zone")
    .trim()
    .notEmpty()
    .withMessage("Zone is required"),
  body("address.kebele")
    .trim()
    .notEmpty()
    .withMessage("Kebele is required"),
  body("contactDetails.phoneNumber")
    .trim()
    .matches(/^\+251\d{9}$/)
    .withMessage("Phone number should start with +251 and have 9 digits"),
  body("contactDetails.emailAddress")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("contactPerson.name")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Contact person name must only contain letters and spaces"),
  body("contactPerson.phoneNumber")
    .trim()
    .matches(/^\+251\d{9}$/)
    .withMessage("Contact person phone number should start with +251 and have 9 digits"),
  body("education")
    .isArray({ min: 1 })
    .withMessage("Education history is required"),
  body("education.*.highestLevel")
    .trim()
    .notEmpty()
    .withMessage("Highest level of education is required"),
  body("education.*.university")
    .trim()
    .notEmpty()
    .withMessage("University is required"),
  body("education.*.degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required"),
  body("education.*.fieldOfStudy")
    .trim()
    .notEmpty()
    .withMessage("Field of study is required"),
  body("education.*.graduationDate")
    .trim()
    .notEmpty()
    .withMessage("Graduation date is required"),
  body("employmentHistory")
    .isArray({ min: 1 })
    .withMessage("Employment history is required"),
  body("employmentHistory.*.organization")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required"),
  body("employmentHistory.*.employmentDates.startDate")
    .trim()
    .notEmpty()
    .withMessage("Start date of employment is required"),
  body("employmentHistory.*.employmentDates.endDate")
    .trim()
    .notEmpty()
    .withMessage("End date of employment is required"),
  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills are required"),
  body("references")
    .isArray({ min: 1 })
    .withMessage("References are required"),
  body("references.*.name")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Reference name must only contain letters and spaces"),
  body("references.*.position")
    .trim()
    .notEmpty()
    .withMessage("Reference position is required"),
  body("references.*.organization")
    .trim()
    .notEmpty()
    .withMessage("Reference organization is required"),
  body("references.*.emailAddress")
   .trim()
    .isEmail()
    .withMessage("Please provide a valid email address for the reference"),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  //registrationValidation,
  resetPasswordValidation,
  applicantValidation,
  validate,
};